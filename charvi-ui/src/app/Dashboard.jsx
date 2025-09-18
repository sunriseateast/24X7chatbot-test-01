import { 
    ReactFlow, 
    Background,  
    useNodesState,
    applyNodeChanges,
    useEdgesState,
    addEdge,
    MarkerType, 
    ReactFlowProvider 
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Newnode from './Newnode';
import { useCallback,useMemo, useState} from 'react';
import Message from './svg/Message';
import Attachment from './svg/Attachment';
import List from './svg/List';
import Action from './svg/Action';
import Url from './svg/Url';
import Live from './api/Live';
import useStore from './hook/useStore.js';
import './css/style.css'
import Deleteall from './utils/Deleteall';
import { Toaster } from 'react-hot-toast';
import Toast from './utils/Toast';
import { v4 as uuid } from 'uuid';
import Profile from './components/sidepanel/Profile';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar, SidebarContent,SidebarFooter,SidebarHeader} from "@/components/ui/sidebar"
import Logoutaccount from './components/sidepanel/Logoutaccount';
import Content from './components/sidepanel/Content';


export default function Dashboard() {
    let isSelected=false
    let selectedNodeId=''
    const live=useStore((state)=>state.live)
    const nodeTypes = useMemo(() => ({ newnode: Newnode }), []);
    const getNodeObj=useStore((state)=>state.getNodeObj)
    console.log(getNodeObj())
    
    // Array of initial Nodes
    const initialNodes = useMemo(()=>[
        {
            id: uuid(),
            type: 'newnode',
            position: { x: 250, y: 50 },
            data: {
                addbutton:''
            }
        }
    ])
    
    // By default states by reactflow
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Function to change nodes
    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

   // Function to  create edges
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(
            { 
                ...params,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#21c063',
                    width:25,
                    height:25
                },
                animated: true, 
                style: { 
                    stroke: '#21c063' 
                } 
            }, eds)
        );
    }, []);

    // Function to rmove button (send empty into addbutton for Newnode.jsx)
    const rmMediaorButons = () => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            addbutton: ''
                        }
                    }
                    : node
            )
        );
    }

    // Function to add buttons or media (send value inot addbuton to Newnode.jsx)
    const addMediaorbuttons = (value) => {
        if (!isSelected) {
           Toast("Almost There","Please select a message first.","Mess")
            return;
        }
        else{
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id !== selectedNodeId) return node;

                    const updatedData = { ...node.data, rmMediaorButons };

                    if (value.tittle === 'action') {
                        const id = uuid()
                        updatedData.addbutton = { id, tittle: 'action' };
                    } else if (value.tittle === 'url') {
                        const id = uuid()
                        updatedData.addbutton = { id, tittle: 'url' };
                    } else if (value.tittle === 'list') {
                        const id = uuid()
                        updatedData.addbutton = { id, tittle: 'list' };
                    } else if (value.tittle === 'media') {
                        const id = uuid()
                        updatedData.addbutton = { id, tittle: 'media' };
                    }

                    return { ...node, data: updatedData };
                })
            )
        }
    }

    // Function to add new Node on flow chart
    const addNode = useCallback(() => {
        const newNode = {
            id: uuid(),
            type: 'newnode',
            position: { x: 250 + nodes.length * 50, y: 50 + nodes.length * 50 },
            data: {
                addbutton:'',
                rmMediaorButons,
            }
        };
        setNodes((nds) => [...nds, newNode]);
    })

    return (
        <SidebarProvider>
            <Sidebar className={`transform-gpu`} collapsible='icon'>
                <SidebarHeader className={``}>
                    <div className='cursor-pointer flex items-start hover:bg-[rgb(255,255,255,0.1)] rounded-lg h-full w-full p-[5px]'>
                        <Profile/>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <div className=''>
                        <Content isOpen={''}/>
                    </div>
                </SidebarContent>
                <SidebarFooter>
                    <div className='flex items-center justify-center'>
                        <Logoutaccount/>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <ReactFlowProvider>
                <div className="h-screen w-screen bg-[#212121] bg-[url('/images/dashboard-bg.png')]">
                    <SidebarTrigger className={`transition-all duration-300 transform-gpu absolute z-50 text-slate-50 m-[10px]`}/>
                    <div className='bg-white rounded-[12px] p-[5px] cursor-pointer flex flex-row items-center gap-x-[10px] absolute right-5 top-5 z-50'>
                            <div className=''>
                                <Live/>
                            </div>
                            <div className=''>
                                <Deleteall/>
                            </div>
                    </div>
                    <ReactFlow
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onSelectionChange={({ nodes: selectedNodes }) => {
                            if (selectedNodes.length === 0) {
                                isSelected=false
                                selectedNodeId='';
                            } else {
                                isSelected=true;
                                selectedNodeId=selectedNodes[0].id
                            }
                        }}
                        nodes={nodes}
                        nodeTypes={nodeTypes}
                        nodesDraggable={!live}
                        nodesConnectable={!live}
                        elementsSelectable={!live}
                        minZoom={0.7}
                        connectionMode="loose"
                    >
                        <Background color='#212121' />
                        

                        <div className='flex absolute bottom-0 w-full justify-center'>
                            <div className={`${live==false && 'z-50' } py-[25px]`}>
                                <div className={`${live==false && 'z-50'}`}>
                                    <div className='p-[3px] border border-[#3C3D37] gap-x-[10px] grid grid-cols-5 bg-[#303030] general-multiple-buttons rounded-4xl'>
                                        {live &&
                                        <div className='flex items-center justify-center z-55 absolute h-[35px] w-[270px] live-multiple-buttons rounded-4xl'>
                                        
                                        </div>}
                                        <button onClick={addNode} className={`${live && 'blur-[1px]'} p-[4px] flex items-center justify-center general-single-button rounded-l-4xl active:bg-[#242424]`}>
                                            <div className='px-[5px]'>
                                                <div className='m-[2px]'>
                                                    <div className='text-white'><Message /></div>
                                                </div>
                                            </div>
                                        </button>
                                        <button onClick={() => addMediaorbuttons({ tittle: 'media' })} className={`${live && 'blur-[1px]'} flex items-center justify-center general-single-button rounded`}>
                                            <div className='px-[5px]'>
                                                <div className='m-[2px]'>
                                                    <div className='text-white'><Attachment /></div>
                                                </div>
                                            </div>
                                        </button>
                                        <button onClick={() => addMediaorbuttons({ tittle: 'action' })} className={`${live && 'blur-[1px]'} flex items-center justify-center general-single-button rounded`}>
                                            <div className='px-[5px]'>
                                                <div className='m-[2px]'>
                                                    <div className='text-white'><Action /></div>
                                                </div>
                                            </div>
                                        </button>
                                        <button onClick={() => addMediaorbuttons({ tittle: 'list' })} className={`${live && 'blur-[1px]'} flex items-center justify-center general-single-button rounded`}>
                                            <div className='px-[5px]'>
                                                <div className='m-[2px]'>
                                                    <div className='text-white'><List /></div>
                                                </div>
                                            </div>
                                        </button>
                                        <button onClick={() => addMediaorbuttons({ tittle: 'url' })} className={`${live && 'blur-[1px]'} flex items-center justify-center general-single-button rounded-r-4xl`}>
                                            <div className='px-[5px]'>
                                                <div className='m-[2px]'>
                                                    <div className='text-white'><Url /></div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReactFlow>
                    <div>
                        {/* This create portal */}
                        <Toaster 
                            position="bottom-right"
                            toastOptions={{
                                style:{
                                    // width:"300px"
                                }
                            }}/>
                    </div>
                </div>
            </ReactFlowProvider>
        </SidebarProvider>
    );
}
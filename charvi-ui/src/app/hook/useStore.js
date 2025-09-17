import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';


const useStore = create(subscribeWithSelector(immer((set,get)=>({
    // Status of live
    live:false,

    // To set live status
    setlive:(status)=>{
        set((state)=>{
            state.live=status
        })
    },
    nodes:{},
    validationError:[],

    // To remove all nodes from store
    rmallNodes:()=>{
        set((state)=>{
            state.nodes={}
        })
    },

    // To add node oj into Node:{}
    addNodeObj:(nodeID)=>{
        set((state)=>{
            if(!state.nodes[nodeID]){
                state.nodes[nodeID]={
                    maintext:"",
                    media:{
                        mediaId:"",
                        file:""
                    },
                    action:[],
                    url:{
                        urlId:'',
                        tittle:"",
                        link:""
                    },
                    list:{
                        menuId:'',
                        tittle:"",
                        rows:[]
                    }
                }
            }
        })
    },

    // To get all Nodes Obj
    getNodeObj:()=>(
        get().nodes
    ),

    // To remove entire Node obj
    removeNodeObj:(nodeID)=>{
        set((state)=>{
            delete state.nodes[nodeID]
        })
    },

    // To add action button into Node obj
    addActionObj:(nodeID,tittle,buttonId)=>{
        set((state)=>{
            const rows=state.nodes[nodeID].action
            const index=rows.findIndex(obj=>obj.buttonId===buttonId)
            if (index===-1) {
                rows.push({buttonId,tittle})
            }
            else{
                rows[index]={buttonId,tittle}
            }
        })
    },

    // To remove ation button from Node obj
    removeActionObj: (nodeID, buttonId) => {
        set((state) => {
            const actions = state.nodes[nodeID]?.action;
            if (actions) {
                state.nodes[nodeID].action = actions.filter(obj => obj.buttonId !== buttonId);
            }
        });
    },

    // To add menu into Node obj
    addOrmMenuObj:(nodeID,tittle,menuId)=>{
        set((state)=>{
            state.nodes[nodeID].list.menuId=menuId
            state.nodes[nodeID].list.tittle=tittle
        })
    },

    // To add row into Node obj
    addrowMenuObj:(nodeID,row,rowId)=>{
        set((state)=>{
            const rows=state.nodes[nodeID].list.rows
            const index=rows.findIndex(obj=>obj.id===rowId)
            if(index===-1){
                rows.push(row)  //Add if not found
            }
            else{
                rows[index]=row //Update if found
            }
        })
    },

    // To remove all row
    removeEntirerow:(nodeID)=>{
        set((state)=>{
            state.nodes[nodeID].list.rows=[]
        })
    },

    // To remove single row
    removerowMenuObj:(nodeID,indexToDelete)=>{
        set((state)=>{
            const list = state.nodes[nodeID]?.list.rows;
            if(list){
                state.nodes[nodeID].list.rows=list.filter((_, index) => index !== indexToDelete)
            }
        })
    },

    // To add or remove Url obj
    addOrmurlObj:(nodeID,urlId,tittle,link)=>{
        set((state)=>{
            state.nodes[nodeID].url.urlId=urlId
            state.nodes[nodeID].url.tittle=tittle
            state.nodes[nodeID].url.link=link
        })
    },

    // To add or remove media obj
    addOrmediaObj:(nodeId,mediaId,file)=>{
        set((state)=>{
            state.nodes[nodeId].media.mediaId=mediaId
            state.nodes[nodeId].media.file=file
        })
    },

    // Gives validation nodes
    errorArray:(error)=>{
        set((state)=>{
            state.validationError=error
        })
    }
}))))

export default useStore
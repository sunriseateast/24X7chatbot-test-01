import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import "@uppy/core/css/style.css";
import "@uppy/dashboard/css/style.css";
import "../css/Uppy.css";
import { useEffect, useState } from "react";
import useStore from "../hook/useStore.js";
import React from "react";

const Fileupload = React.memo(function Fileupload({ nodeId, mediaId }) {
  const addOrmediaObj = useStore((state) => state.addOrmediaObj);

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 3,
        allowedFileTypes: ["image/*", "video/*"],
      },
      autoProceed: false,
    }).use(XHRUpload, {
      endpoint: "https://yourdomain.com/upload", // ✅ replace with your server API endpoint
      fieldName: "file", // field name in form-data
      formData: true, // sends as multipart/form-data
      headers: {
        // Optional: add auth headers
        // Authorization: `Bearer YOUR_TOKEN`
      },
    }),
  );

  useEffect(() => {
    uppy.on("upload-success", (file, response) => {
      addOrmediaObj(nodeId, mediaId, file);
    });

    uppy.on("upload-error", (file, error, response) => {
      addOrmediaObj(nodeId, mediaId, "");
    });

    uppy.on("error", (error) => {
      addOrmediaObj(nodeId, mediaId, "");
    });
  }, [uppy]);

  useEffect(() => {
    addOrmediaObj(nodeId, mediaId, "");
  }, [nodeId]);

  return (
    <div className="bg-[#303030] rounded-xl">
      <Dashboard
        uppy={uppy}
        proudlyDisplayPoweredByUppy={false}
        width={290}
        height={340}
        showProgressDetails={true}
        theme="dark"
        hideUploadButton={false}
      />
    </div>
  );
});

export default Fileupload;

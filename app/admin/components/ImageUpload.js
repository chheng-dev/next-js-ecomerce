// components/ImageUpload.js

import { UploadButton } from "@/utils/uploadthing"; // Adjust path as necessary
import { useState } from "react";

const ImageUpload = ({ onImagesUploaded }) => {
  const [uploading, setUploading] = useState(false);

  const handleUploadComplete = (files) => {
    console.log("Uploaded files: ", files);
    // Assuming files return an array of uploaded file data
    onImagesUploaded(files);
    setUploading(false);
  };

  const handleUploadError = (error) => {
    console.error("Upload error: ", error);
    setUploading(false);
  };

  return (
    <div>
      <UploadButton
        endpoint="imageUploader" // The endpoint configured in your UploadThing setup
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        className="bg-default-50"
        loading={uploading}
        onClientUploadStart={() => setUploading(true)} // Show loading state
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;

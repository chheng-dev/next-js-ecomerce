import { createUploadthing } from "uploadthing/next";

// export async function uploadImage(file) {
//   try {
//     const ut = new createUploadthing({
//       apiKey: process.env.UPLOADTHING_API_KEY,
//     });

//     const response = await ut.upload(file);

//     if (!response.success) {
//       throw new Error('File upload failed');
//     }

//     return response;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// }


export async function uploadImage(file) {
  try {
    const ut = new createUploadthing({
      apiKey: process.env.UPLOADTHING_API_KEY,
    });

    const response = await ut.upload(file);

    if (!response.success) {
      throw new Error('File upload failed');
    }

    return response;

  } catch (error) {
    console.error(`Error uploading image:`, error);
    throw error;
  }
}

export async function deleteFile(fileIds) {
  try {
    const ut = new createUploadthing({
      apiKey: process.env.UPLOADTHING_API_KEY
    });

    const deleteRespone = await ut.deleteFile(fileIds);

    if (!deleteRespone.success) {
      throw new Error('Filer deletion failed');
    }

    return deleteRespone;

  } catch (error) {
    console.error('Error deleting files:', error);
    throw error;
  }
}

export async function extractFileIdFromUrl(url) {
  console.log("url", url);

  try {
    const urlParts = url.split("/");
    const fieldId = urlParts(urlParts.length - 1);

    return fieldId;
  } catch (error) {
    console.error('Error excuting id from url', error);
    throw error;
  }

}
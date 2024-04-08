import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) {
            return null;
        }
    
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
    
        console.log("file upload successfully");
    
        fs.unlinkSynk(localFilePath);
    
        return response;
    } catch (error) {
        console.log("error occured in uploading file on cloudinary",error);
    }
}

export {uploadOnCloudinary}
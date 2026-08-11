import { v2 as cloudinary} from "cloudinary"
import upload from "../middleware/upload.js";

const connectCloudinary = async() => {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    console.log("Cloudinary connected");
    
}

export const uploadToCloudinary = async(fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce-products"
            },
            (error, result)=> {
                if(error){
                    reject(error)
                } else{
                    resolve(result)
                }
            }
        )
        uploadStream.end(fileBuffer)
    })
}

export default connectCloudinary
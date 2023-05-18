import axios from "axios";
import { addArrayofImages } from "../reducers/ImagesReducer";


export const fetchImages = ()=>{
    return async dispatch => {
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const allImages = await axios.get("/api/images", config)
            
            if(!allImages){
                console.log("No images in database")
                return;
            }
            console.log(allImages.data.allimages)
            dispatch(addArrayofImages(allImages.data.allimages));
    
        }catch(error){
            console.log("error occurred while fetching images")
        }
    }
}
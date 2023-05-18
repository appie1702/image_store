import axios from 'axios'
import React, { useState } from 'react'
import {FaSpinner} from 'react-icons/fa'
import { toast } from 'tailwind-toast'
import { useDispatch } from 'react-redux'
import { addImage } from '../reducers/ImagesReducer'

const Form = () => {

    const [title, settitle] = useState("")
    const [url, seturl] = useState("")
    const [loading, setloading] = useState(false)
    const [submitload, setsubmitload] = useState(false)
    const dispatch = useDispatch();

    const postpic = (pics) =>{
        setloading(true);
        if (pics === undefined){
            toast().danger("", "Please select an image").for(2000).show()
        setloading(false);
        return;
        }

        console.log(pics)

        if(pics.type==="image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "image_uploader_2");
            data.append("cloud_name", "appie1702");
            fetch("https://api.cloudinary.com/v1_1/appie1702/image/upload",{
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((res) => {
                seturl(res.url.toString());
                console.log(res.url.toString());
                setloading(false);
            });
        } else {
            toast().danger("", "Please select an image").for(2000).show()
            setloading(false);
            return;
        }
    }


    const submitHandler= async () => {

        setsubmitload(true);

        if (!title || !url) {
            toast().danger("", "Please upload an image and give a title!").for(2000).show()
            setsubmitload(false);
        return;
        }

        console.log(title,url);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            
            const imagedata= await axios.post(
                "/api/images",
                {title,url},
                config
                );

                
            dispatch(addImage(imagedata.data.image));

            settitle("")
            seturl("")
            setsubmitload(false);

        } catch(error) {
            toast().danger("", "Error in submitting the form").for(2000).show()
            setsubmitload(false);
        }
    };



  return (
    <form className="w-full max-w-8xl flex flex-row items-start justify-evenly mx-auto mt-5 gap-2">
        <div className="flex flex-col items-center mb-6">
            <div>
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="title">
                    Title
                </label>
            </div>
            <div>
                <input onChange={(e)=>settitle(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-600" id="title" name="title" type="text" value={title}/>
            </div>
        </div>
        <div className="flex flex-col items-center mb-6">
            <div>
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="title">
                    Upload Image
                </label>
            </div>
            <div className='flex flex-row relative'>
                <input onChange={(e)=>postpic(e.target.files[0])} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-600" id="pic" name="pic" type="file" accept="image/*" />
                {loading && <FaSpinner className='absolute right-3 top-2 loading-icon'/>}
            </div>
        </div>
        <div className="flex items-center justify-center">
            <button className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded mt-4 mr-2" type="button" onClick={submitHandler}>
                Upload
            </button>
            {submitload && <FaSpinner className='loading-icon-submit'/>}
        </div>
    </form>
  )
}

export default Form
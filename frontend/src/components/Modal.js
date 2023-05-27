import axios from 'axios'
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import {IoMdClose} from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { addImage } from '../reducers/ImagesReducer'
import { FaSpinner } from 'react-icons/fa'
import {useToast} from './Toast/ToastService'

const Modal = ({isOpen, onClose}) => {

    const [showModal, setshowModal] = useState(isOpen)

    const [title, settitle] = useState("")
    const [url, seturl] = useState("")
    const [loading, setloading] = useState(false)
    const [submitload, setsubmitload] = useState(false)
    const dispatch = useDispatch();
    const [disabled, setdisabled] = useState(false)
    const toast = useToast();
    
    useEffect(()=>{
        setshowModal(isOpen)
    },[isOpen])


    const handleClose = useCallback(()=>{
        if (disabled) {
            return;
        }

        setshowModal(false);

        //to show our animation of 300ms before modal closes off
        setTimeout(()=>{
            onClose();
        },300);

    },[onClose,disabled])


    if(!isOpen){
        return null;
    }


    const postpic = (pics) =>{
        setloading(true);
        setdisabled(true);

        if (pics === undefined){
            toast.open("Error", "Please select an image")
            setloading(false);
            setdisabled(false);
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
                setdisabled(false);
                return;
                });
        } else {
            toast.open("Error", "Image not uploaded, please try again")
            setloading(false);
            setdisabled(false);
            return;
        }
    }


    const submitHandler= async () => {

        setsubmitload(true);
        setdisabled(true);

        if (!title || !url) {
            toast.open("Error", "Please select an image and enter the title")
            setsubmitload(false);
            setdisabled(false);

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
            toast.open("Success", "Image added to the collection")
            
            onClose();

            settitle("")
            seturl("")
            setsubmitload(false);
            setdisabled(false);

        } catch(error) {
            toast.open("Error", "Something went wrong while uploading the image")
            setsubmitload(false);
            setdisabled(false);

        }
    };



  return (
    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
        inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 select-none'>
            <div
                className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'
            >
                {/* content */}
                <div
                    className={`translate duration-300 h-full 
                    ${showModal ? "translate-y-0": "translate-y-full"}
                    ${showModal ? "opacity-100": "opacity-0"}
                    `}
                >
                    <div
                        className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg 
                        relative flex flex-col w-full bg-white outline-none focus:outline-none'
                    >

                        {/* Header */}
                        <div
                            className='flex items-center p-6 rounted-t justify-center relative border-b-[1px]'
                        >
                            <button
                                onClick={handleClose}
                                className='p-1 border-0 hover:opacity-70 transition absolute left-8'
                            >
                                <IoMdClose size={18}/>
                            </button>
                            <div className='text-lg font-semibold'>
                                Upload New Image
                            </div>
                        </div>


                        {/* Body */}
                        <div className='p-8'>

                            <div className="flex flex-col items-start mb-6 w-full">
                                <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-2 lg:mb-3 xl:mb-3 " htmlFor="title">
                                    Title
                                </label>
                                <input onChange={(e)=>settitle(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-600" id="title" name="title" type="text" value={title}/>
                            </div>

                            <div className="flex flex-col items-start mb-6 w-full">
                                <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-2 lg:mb-3 xl:mb-3" htmlFor="title">
                                    Upload Image
                                </label>
                                <div className='flex flex-row relative w-full'>
                                    <input onChange={(e)=>postpic(e.target.files[0])} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-600" id="pic" name="pic" type="file" accept="image/*" disabled={disabled} />
                                    <FaSpinner className={`absolute right-3 top-2 loading-icon ${loading ? "visible" : "invisible"}`}/>
                                </div>
                            </div>

                            {url ? (
                                <div className=' bg-gray-300 w-full rounded relative'>
                                    <img src={url} alt='uploaded_image' className=' object-fill rounded w-full h-64'/>
                                </div>
                            ) : (
                                <div className=' bg-gray-300 w-full h-64 rounded relative'>
                                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>No image uploaded yet</div>
                                </div>
                            )}
                            

                            <div className="flex items-center justify-end">
                                <FaSpinner className={`loading-icon-submit mr-2 ${submitload ? "visible" : "invisible"}`}/>
                                <button disabled={disabled} className="shadow bg-red-600 hover:text-white focus:shadow-outline focus:outline-none text-slate-800 font-bold py-2 px-6 rounded mt-4 mr-2" type="button" onClick={submitHandler}>
                                    Upload
                                </button>
                            </div>

                            
                        </div>


                    </div>
                </div>
            </div>
        </div>
  )
}

export default Modal
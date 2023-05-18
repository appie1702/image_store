import React, { useEffect, useMemo, useState } from 'react'
import ImageCard from './ImageCard'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
import {useSelector} from 'react-redux'
import { selectImages } from '../reducers/ImagesReducer'


const Images = () => {

    const [images, setimages] = useState([])
    const imagesReduced = useSelector(selectImages)
    
    
    useMemo(()=>{
        setimages(imagesReduced)
    },[imagesReduced])


  return (
    <div className='m-2'>
        
            <>
                {images.length == 0 ? (
                    <div className='flex flex-col items-center mt-10'>
                        <p className=" text-xl">No images found yet</p> 
                        <p className='text-xl'>Please wait or add a new image</p>
                    </div>
                ) : (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <h2 className=' font-bold text-2xl font-sans pb-4'>Your Images</h2>
                            <div className="flex flex-wrap -m-4">
                                {images.map((image,index)=>(
                                    <ImageCard image={image} key={index}/>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </>
        
    </div>
  )
}

export default Images
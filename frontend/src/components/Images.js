import React, { useEffect, useMemo, useState } from 'react'
import ImageCard from './ImageCard'
import {useSelector} from 'react-redux'
import { selectImages } from '../reducers/ImagesReducer'


const Images = () => {

    const [images, setimages] = useState([])
    const imagesReduced = useSelector(selectImages)
    
    
    useMemo(()=>{
        setimages(imagesReduced)
    },[imagesReduced])


  return (
    <>
        {images.length == 0 ? (
            <div className='flex flex-col items-center justify-center mt-10 h-full'>
                <p className=" text-xl">No images found yet</p> 
                <p className='text-xl'>Please wait or add a new image</p>
            </div>
            ) : (
            <div className="flex flex-wrap m-4">
                {images.map((image,index)=>(
                    <ImageCard image={image} key={index}/>
                ))}
            </div>
        )}
    </>
  )
}

export default Images
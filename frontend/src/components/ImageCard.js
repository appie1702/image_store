import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'tailwind-toast'
import { useHistory, } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { increCount } from '../reducers/ImagesReducer'

const ImageCard = ({image}) => {

  return (
    <div className="p-4 md:w-1/4">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center cursor-pointer" src={image.pic} alt="image"/>
          <div className='flex flex-row items-center justify-between'>
            <div className="p-6">
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{image.title}</h1>
            </div>
          </div>
        </div>
      </div>
  )
}
export default ImageCard
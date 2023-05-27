import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useToast } from './Toast/ToastService'

const Alert = ({id, type, mess}) => {
  const toast = useToast();

  return (
    <div class={` border  px-3 py-2 shadow-lg shadow-gray-400 rounded relative z-50 w-full ${type == "Error" ? "border-red-400 text-red-700 bg-red-100" : "border-green-400 text-green-700 bg-green-100"}`}>
        <strong class="font-bold mr-3">{type}!</strong>
        <span class="block sm:inline">{mess}</span>
        <button onClick={()=> toast.close(id)} className="absolute right-1 top-1 p-1 rounded-lg bg-gray-200/20 text-gray-800/60 ">
          <IoMdClose size={25}/>
        </button>
    </div>
  )
}

export default Alert
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addArrayofImages } from '../reducers/ImagesReducer'
import store from '../store'
import axios from 'axios'
import { toast } from 'tailwind-toast'
import { FaSpinner } from 'react-icons/fa'
import {BsSearch} from 'react-icons/bs'


const Search = () => {

    const [search, setsearch] = useState("")
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)

    const searchHandler = async ()=>{
        setloading(true)
        try{

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            console.log(search)

            const resu = await axios.post(
                "/api/images/search",
                {search},
                config
            );
            
            if(!resu.data.result){
                toast().default("","No images found").found(2000).show()
                return;
            }

            setloading(false);

            console.log(resu.data.result)

            dispatch(addArrayofImages(resu.data.result));

        }catch(error){
            setloading(false)
            toast().danger("","some error occurred").for(2000).show();
        }
    }



  return (
    <div className="flex mx-auto space-x-4 items-center justify-center w-96">
        <input type="text" onChange={(e)=>setsearch(e.target.value)} value={search} placeholder="Title" className=" focus:border-red-600 flex-1 px-6 py-1.5 placeholder-slate-300 text-slate-600 bg-white text-base border shadow-lg outline-none focus:outline-none w-full rounded-full"/>
        <div className=" flex flex-row space-x-2 h-full font-normal text-center text-slate-300 bg-transparent rounded text-lg items-center justify-center pr-2 py-2">
            <button onClick={searchHandler} className=' shadow-lg border border=[1px] hover:border-red-600 px-2 py-2 font-semibold rounded-full text-slate-900'><BsSearch size={20}/></button>
            <FaSpinner className={`loading-icon ${loading ? "visible" : "invisible"}`}/>
        </div>
    </div>
    
  )
}

export default Search
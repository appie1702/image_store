import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addArrayofImages } from '../reducers/ImagesReducer'
import store from '../store'
import axios from 'axios'
import { toast } from 'tailwind-toast'
import { FaSpinner } from 'react-icons/fa'

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
    <div className="flex max-w-7xl mx-auto m-5 space-x-4 items-center justify-center">
            <input type="text" onChange={(e)=>setsearch(e.target.value)} value={search} placeholder="Placeholder" className="flex-1 px-3 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
            <div className=" flex flex-row space-x-2 h-full font-normal text-center text-slate-300 bg-transparent rounded text-lg items-center justify-center pr-2 py-2">
                <button onClick={searchHandler} className='border border=[1px] hover:border-red-600 px-3 py-1 font-semibold rounded-lg text-slate-900'>Search</button>
                {loading && <FaSpinner className='loading-icon'/>}
            </div>
    </div>
    
  )
}

export default Search
import React, { useEffect, useMemo, useState } from 'react'
import { useContext } from 'react'
import {UserContext} from '../App'
import { useHistory } from 'react-router-dom'
import { toast } from 'tailwind-toast'
import Form from '../components/Form'
import Images from '../components/Images'
import Search from '../components/Search'

const ImagesPage = () => {
  const [loading, setloading] = useState(false)
  const userContext = useContext(UserContext)
  const history = useHistory();

  const handleLogout = async(e)=>{
    e.preventDefault();
    setloading(true)
    try{
      const logout = await fetch("/api/user/logout");

      if(!logout.ok){
        setloading(false)
        toast().danger("Oops!", "Not logged out due to some reason").for(2000).show()
        return;
      }
      toast().success("Success!", "Logged out successfully").for(2000).show()
      history.push("/")
      history.go(0);
      return;
    }catch(error){
      toast().danger("Oops!", "Not logged out due to some reason").for(2000).show()
      setloading(false)
      return;
    }
  }


  return (
      <>
        {userContext.email ? (
          <div className=''>
            
            <div className=' flex items-end justify-between mb-2'>
              <div className=' bg-red-600 px-3 py-2 mx-2 text-xl font-bold rounded-lg'>ImageUploader</div>
              <p className=' text-xl font-bold pb-2'>HELLO! {userContext.name.toUpperCase()}</p>
              <button className='font-semibold text-xl px-3 py-2 rounded-lg bg-slate-200 mx-2 mt-2 cursor-pointer' onClick={handleLogout}>Logout</button>
            </div>
            <hr/>
            <Form/>
            <hr/>
            <Search/>
            <hr/>
            <Images/>
          </div>
        ) : (
          <div className='min-h-screen flex flex-col items-center justify-center'>
          <p className='text-xl'>Hello!, Now please <button className='cursor-pointer font-semibold text-xl px-3 py-2 rounded-lg bg-slate-200 mx-1' onClick={()=>history.push("/")}>Sign in</button> to the website.</p>
        </div>
        )}
      </>
  )
}
export default ImagesPage
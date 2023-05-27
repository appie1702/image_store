import React, { useEffect, useMemo, useState } from 'react'
import { useContext } from 'react'
import {UserContext} from '../App'
import { useHistory } from 'react-router-dom'
import Images from '../components/Images'
import Search from '../components/Search'
import Modal from '../components/Modal'
import {AiOutlinePlus} from 'react-icons/ai'
import { useToast } from '../components/Toast/ToastService'
import { FaSpinner } from 'react-icons/fa'

const ImagesPage = () => {
  const [usernotloggedin, setusernotloggedin] = useState(false)
  const [loading, setloading] = useState(false)
  const userContext = useContext(UserContext)
  const [modalOpen, setmodalOpen] = useState(false)
  const history = useHistory();
  const toast = useToast();


  useEffect(()=>{
    setTimeout(() => {
      setusernotloggedin(!usernotloggedin);
    }, 4000);
  },[userContext])


  const handleLogout = async(e)=>{
    e.preventDefault();
    setloading(true)
    try{
      const logout = await fetch("/api/user/logout");

      if(!logout.ok){
        setloading(false)
        toast.open("Error", "Something went wrong while logging out, try again later")
        return;
      }
      history.push("/")
      history.go(0);
    
    }catch(error){
      toast.open("Error", "Something went wrong while logging out")
      setloading(false)
      return;
    }
  }


  return (
      <>
        {userContext.email ? (
          <>
            <Modal isOpen={modalOpen} onClose={()=>setmodalOpen(false)}/>
            <div>
              <div className=' flex items-center justify-between mx-6 my-5 select-none'>
                <div className=' bg-red-600 px-3 py-2 mx-2 text-xl font-bold rounded-lg'>ImageUploader</div>
                <Search/>
                <button className='font-semibold text-xl px-2 py-1 rounded-lg bg-slate-200 mx-2 cursor-pointer hover:bg-red-600' onClick={handleLogout}>Logout</button>
              </div>

              <hr/>

              <section className="text-gray-600 body-font max-w-7xl mx-auto">
                <div className="container pt-6 mx-auto">
                    <div className='flex flex-row items-center justify-between mb-5 select-none mx-8'>
                      <h2 className=' font-bold text-4xl font-sans'>Your Images</h2>
                      <button className=" flex shadow bg-red-600 hover:text-white focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded mt-4" type="button" onClick={()=>setmodalOpen(true)}>
                        <AiOutlinePlus className='mr-2' size={23}/> Add
                      </button>
                    </div>
                    <Images/>
                </div>
              </section>
            </div>
          </>
        ) : (
          <>
            {
              usernotloggedin ? (
                <div className='min-h-screen flex flex-col items-center justify-center'>
                  <p className='text-xl'>Hello!, Please <button className='cursor-pointer font-semibold text-xl px-3 py-2 rounded-lg bg-slate-200 mx-1' onClick={()=>history.push("/")}>Sign in</button> to the website</p>
                </div>
              ) : (
                <div>
                  <FaSpinner className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 loading-icon`} size={60}/>    
                </div>
              )
            }
            
            
          </>
        )}
      </>
  )
}
export default ImagesPage
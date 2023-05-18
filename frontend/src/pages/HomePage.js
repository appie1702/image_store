import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import Registration from '../components/Registration'
import { UserContext } from '../App'
import { useContext } from 'react'
import { useHistory, Redirect } from 'react-router-dom'

const HomePage = () => {

    const userContext = useContext(UserContext)
    const [tab, settab] = useState(2)
    const history = useHistory();


    useEffect(()=>{
      if(userContext.email){
        history.push("/imgs");
        return;
      }
    },[userContext])
    

  return (
    <div className=' min-h-screen'>
      <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-0.5 flex justify-center space-x-6">
              <button onClick={()=>settab(1)} type="button" className={`${tab==1 ? "font-semibold border-blue-600 text-blue-600":""} py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active`}>
              Sign Up
              </button>
              <button onClick={()=>settab(2)} type="button" className={`${tab==2 ? "font-semibold border-blue-600 text-blue-600":""} py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600`}>
              Login
              </button>
          </nav>
      </div>
      {tab == 1 && <Registration/>}
      {tab == 2 && <Login/>}
    </div>
  )
}

export default HomePage
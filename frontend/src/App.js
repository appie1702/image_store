import './App.css';
import HomePage from './pages/HomePage';
import ImagesPage from './pages/ImagesPage';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'tailwind-toast';
import axios from 'axios';
import { Route } from 'react-router-dom';
export const UserContext = createContext({});

function App() {

  const [loading, setloading] = useState(true)
  const [userSession, setuserSession] = useState({})


  useEffect(()=>{
    const fetchUserAuth = async ()=>{
      try{
        setloading(true)

        const res = await fetch('/api/user/isauth')

        if(!res.ok){
          setloading(false)
        }

        const userdata = await res.json();

        console.log(userdata)
        setuserSession(userdata)
        setloading(false)

      }catch(error){
        setloading(false)
        toast().danger(`${error}`, "Error authorizing your credentials").for(2000).show()
        return
      }
    }

    fetchUserAuth();
  },[])
  

  return (
    <div>
      <UserContext.Provider value={userSession}>
        <Route path="/" component={HomePage} exact/>
        <Route path="/imgs" component={ImagesPage} exact/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
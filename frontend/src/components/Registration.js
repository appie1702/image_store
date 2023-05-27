import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { useToast } from './Toast/ToastService';


const Registration = () => {

    const [email,setemail] = useState("");
    const [name,setname] = useState("");
    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [show,setshow] = useState(false);
    const [loading,setloading] = useState(false);
    const history = useHistory();
    const toast = useToast();
    const handleClick = () => setshow(!show);


    const submitHandler = async (e)=>{
        e.preventDefault();
        console.log("submithandler clicked")
        setloading(true);

        if (!name || !email || !password || !confirmpassword) {
            console.log("1st if")
            setloading(false);
            toast.open("Error", "There are empty fields")
            return;
        }

        

        if (password !== confirmpassword) {
            console.log("2st if")
            setloading(false);
            toast.open("Error", "Passwords are not matching")
            return;
        }

        if(password.length < 6){
            setloading(false)
            toast.open("Error", "Password length should be more than 6 characters")
            return
        }

        console.log(email,name,password,confirmpassword)

        try {
            console.log("try")
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            console.log("sub sahi")
            const userdata = await axios.post(
                "/api/user",
                {name,email,password},
                config
            );

            console.log(userdata);
            
            setloading(false);

            setemail("")
            setname("")
            setpassword("")
            setconfirmpassword("")
            toast.open("Success", "You have been registered, Now please login to continue")
            history.push("/")

        } catch(error) {
            console.log("catch")
            toast.open("Error", "Something went wrong, Please try again later")
            setloading(false);
        }
    }

    console.log(email,name,password,confirmpassword)
    

  return (
    <div className="bg-gray-50 dark:bg-gray-900">

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create account
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e)=> setname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e)=> setemail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type={show ? "text":"password"} name="password" id="password" placeholder="••••••••" value={password} onChange={(e)=> setpassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            <div className=' px-2 py-1 absolute right-1 top-8 bg-slate-100 rounded-md cursor-pointer'  color="black" h="1.75rem" size={"sm"} onClick={()=>setshow(!show)}>
                                {show ? "Hide":"Show"}
                            </div>
                        </div>
                        <div className='relative'>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type={show ? "text":"password"} name="confirm-password" id="confirm-password" placeholder="••••••••" value={confirmpassword} onChange={(e)=> setconfirmpassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            <div className=' px-2 py-1 absolute right-1 top-8 bg-slate-100 rounded-md cursor-pointer'  color="black" h="1.75rem" size={"sm"} onClick={()=>setshow(!show)}>
                                {show ? "Hide":"Show"}
                            </div>
                        </div>
                        <button type='submit' onClick={submitHandler} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registration
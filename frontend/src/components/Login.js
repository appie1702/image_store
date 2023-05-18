import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {toast} from 'tailwind-toast'
import axios from 'axios';

const Login = () => {

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [show,setshow] = useState(false);
    const [loading,setloading] = useState(false);
    const history = useHistory();


    const submitHandler = async (e) => {
        e.preventDefault();
        setloading(true);
        if (!email || !password) {
            toast().danger('Warning', 'there are empty fields!').for(2000).show()
        setloading(false);
        return;
        }

        console.log(email)

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            
            const userdata = await axios.post(
                "/api/user/login",
                {email, password},
                config
            );

            console.log(userdata)

            setloading(false);
            toast().success('', 'Successfully logged in!').for(2000).show()
            history.push("/imgs");
            history.go(0);
            


        } catch(error) {
            toast().danger('', 'Invalid email id or password!').for(2000).show()
            setloading(false);
        }
    };




    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
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
                            <button type="submit" onClick={submitHandler} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      )
    }

export default Login
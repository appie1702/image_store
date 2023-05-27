import { useState } from "react";
import ToastContext from "./ToastService";
import {IoMdClose} from 'react-icons/io'
import Alert from "../Alert";

export default function ToastProvider({children}) {
    const [toasts, settoasts] = useState([]);

    const open = (type, mess, timeout = 5000) =>{
        const id = Date.now();
        settoasts(toasts => [{id,type, mess},...toasts])
    
        setTimeout(()=> close(id), timeout);
    }

    const close = (id) =>{
        settoasts((toasts)=>toasts.filter((toast) => toast.id !== id));
    }


    return(
        <ToastContext.Provider value={{open,close}}>
            {children}
            <div className="space-y-2 absolute top-10 left-1/2 transform -translate-x-1/2 w-1/2">
                {toasts.map(({id,type,mess})=>(
                    <>
                    <div key={id} className="relative w-full">
                        <Alert id={id} type={type} mess={mess}/>
                    </div>
                    </>
                ))}
            </div>
        </ToastContext.Provider>
    )

}
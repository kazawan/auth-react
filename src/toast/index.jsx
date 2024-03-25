import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * 
 * @description 通知组件
 * @param {string} tag - 信息类型
 * @param {string} text - 信息内容
 */
function ToastBox({tag,text}) {
    const fadin = `animate-translateY-10`
    const leave = 'animate-fade-out'
    const [animate, setAnimate] = useState(fadin)


    useEffect(() => {
      const timer =  setTimeout(() => {
            setAnimate(leave)
        }, 1500)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    function tagStyle(){
        switch(tag){
            case 'info':
                return 'bg-blue-300/30'
            case 'error':
                return 'bg-red-300/30'
            case 'success':
                return 'bg-green-300/30'
            case 'warning':
                return 'bg-yellow-300/30'
            default:
                return 'bg-blue-300/30'
        }
    }
    

    const toastClass = {
        className: `${tagStyle()} min-w-[300px] rounded-md w-fit my-2 px-2 backdrop-blur-sm  ${animate}   `
    }

    return (
        <>
            <div  
            // className=" bg-blue-300/30 min-w-[300px] rounded-md w-fit my-2 px-2 backdrop-blur-sm animate-fade-in  "
            {...toastClass}
            
            >
               <div 
                    className="text-white text-sm "
               >
                    {tag}
               </div>

               <div className=" text-center">
                     {text}
               </div>
            </div>
        </>

    )
}

/**
 * 
 * @returns {object} msg - 信息提示
 */
function Toast() {

    const root = document.createElement('div')
    root.style.position = 'fixed'
    root.style.top = '0%'
    root.style.right = '2%'
    root.style.zIndex = '9999'
    root.style.height = 'fit-content'
    root.style.width = 'fit-content'
    root.style.maxHeight = '500px'
    document.body.append(root)

    /**
     * 
     * @param {类型} tag 
     * @param {信息} text 
     */
    function pop(tag, text) {
        let div = document.createElement('div')
        root.prepend(div)
        createRoot(div).render(<ToastBox tag={tag}   text={text} />)
        setTimeout(() => {
            root.removeChild(div)
        }, 2000)

    }
    /**
     * 
     * @param {信息} text 
     * @param {类型} tag 
     * @returns 
     */
    function msg(text, tag = 'info') {
        // pop(tag, text)
        function info(text) {
            pop('info', text)
        }
        function error(text) {
            pop('error', text)
        }
        function success(text) {
            pop('success', text)
        }
        function warning(text) {
            pop('warning', text)
        }
        return {
            info,
            error,
            success,
            warning
        }
    }
    

    return {
        msg
      
    }
}

export default Toast;


/**
 * 上下文通信
 */
import { createContext,useContext } from 'react';

const ToastContext = createContext()

function useToast(){
    return useContext(ToastContext)
}

export {ToastContext,useToast}

export function ToastProvider({children}) {
    const {msg} = Toast()
    return (
        <ToastContext.Provider value={{msg}}>
            {children}
        </ToastContext.Provider>
    )
}   






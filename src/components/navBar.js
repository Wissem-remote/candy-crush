import React, {  useState } from 'react'
import { AiFillSound,AiOutlineSound } from 'react-icons/ai';



export default function NavBar() {
  const [sound,setSound]=useState(false)
  const handleChange = ()=>{
    setSound(!sound)
  }
  
    return <>
      <div className="flex justify-between h-10  bg-[#1E293B] opacity-50">
        <div><h2 className="text-xl p-2 font-blod text-gray-200"> Candy Crush</h2></div>
        <div><button onClick={handleChange} className=" p-2 text-2xl mr-2">{sound?<AiFillSound/>:<AiOutlineSound/> }</button></div>
      </div>
    </>
}

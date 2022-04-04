import React, {   useEffect, useMemo, useState } from 'react'
import { AiFillSound,AiOutlineSound } from 'react-icons/ai';
import {Howl} from 'howler';


export default function NavBar() {
  const [sound,setSound]=useState(false)
  const handleChange = ()=>{
    setSound(!sound)
    
  }
    
      let play=useMemo(()=>{
        return new Howl({
              src: ["https://media.graphassets.com/V0sQZx8sSSesSEnkvJYP"],
             html5: true })
      },[])
   
      
      useEffect(()=>{
        sound?play.play():play.stop()
      },[sound,play])
    
    return <>
      <div className="flex justify-between   bg-[#1E293B] opacity-50 ">
        <div><h2 className="text-xl p-2 font-blod text-gray-200"> Candy Crush</h2></div>
        <div><button onClick={handleChange} className="shadow rounded boder-solid border-2 shadow-lg hover:shadow-gray-500/50 border-gray-300 p-1 m-2 text-2xl mr-2">{sound?<AiFillSound/>:<AiOutlineSound/> }</button></div>
      </div>
    </>
}

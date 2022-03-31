import React from 'react'

export default function Checks({wait,valid,score}) {
    return (<>
        <div className="absolute z-10 ">
            <button 
            onClick={()=>{ valid(true)
            score(0) 
            }} 
            className={wait?" pointer-events-none fade rounded  py-4 px-4 text-2xl bg-blue-500 shadow-lg shadow-blue-500/50  "
                :" fade rounded  py-4 px-4 text-2xl bg-blue-500 shadow-lg shadow-blue-500/50  "}
           
            >{wait?"Wait":"Play"}</button>
        </div>
        </>
    )
}

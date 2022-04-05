import React from 'react'

export default function Score({score,valid}) {
    return (
        <>
        <div className="score  flex items-center justify-center ">
            <div className=" scores text-2xl p-1 font-semibold text-gray-300  flex items-center justify-center text-xl md:w-4/12 shadow rounded boder-solid border-2 shadow-lg shadow-indigo-500/50 border-violet-300">
                Score : <p className="p-1">{valid? score: "wait"}</p>
            </div>
        </div>
        </>
    )
}

import React from 'react'

export default function Content({children}) {
    return <>
      <div className="h-screen flex items-center justify-center">
          
            {children}
      </div>
    </>
}

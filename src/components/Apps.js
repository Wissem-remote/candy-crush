import { useCallback, useEffect, useState } from "react";
import Content from "./components/content";
import NavBar from "./components/navBar";
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

const width= 8

const color=[
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

function Appss() {
  const[array,setArray]=useState([])
  const[change,setChange]=useState(null)
  const[changeEnd,setChangeEnd]=useState(null)
 
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  
  const Create=()=>{
    const newArray=[]
    for (let i=0; i < width * width; i++){
      const newCorlor= color[Math.floor(Math.random()*color.length)]
      newArray.push(newCorlor)
          }
          setArray(newArray)
  }  

  const searchCol=useCallback((value=2,start=47)=>{
    for(let i = 0; i< start;i++){
                      //initial, +8, +16
      const colThree = start === 2 ?[i,i+width,i + width * value]:[i,i+width,i + width * 2,i + width * value]
      const checkColor= array[i]
      
      
        if(colThree.every(v=> array[v] === checkColor)){
          colThree.forEach((b) => array[b]='')
          return true
        }  
    }
  },[array])

  const searchRow=useCallback((value=2,start=64)=>{
    for(let i = 0; i< start;i++){
                      //initial, +8, +16
      const colThree = start === 2 ?[i,i+1, i+ value]:[i,i+1, i+ 2,i + value]
      const checkColor= array[i]
      const notValid = start === 2? [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]:
      [5,6, 7, 13,14, 15, 21,22, 23, 29, 30, 31, 39, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      
      if(notValid.includes(i)) continue

        if(colThree.every(v=> array[v] === checkColor)) {
          colThree.forEach((b) => array[b]='')
          return true
        } 
    }
  },[array])
  const moveCube = useCallback(()=>{
    for(let i = 0; i <= 55 ; i++){
        const firstCol = [0, 1, 2, 3, 4, 5, 6, 7]

        if(firstCol.includes(i) && array[i]=== ''){
          let NumColor = Math.floor(Math.random()*color.length)
          array[i]= color[NumColor]
        }
      if((array[i+width]) === ''){
        array[i+width]= array[i]
        array[i]= ''
      }  

      }
  },[array])


const dragStart=(e)=>{
setChange(e.target)
const border = document.querySelector('#c')
  border.classList.contains('seen') && border.classList.remove('seen')
}

const dragDrop=(e)=>{
  setChangeEnd(e.target)
}

const dragEnd=()=>{
  
  const changeDrop = parseInt(change.getAttribute('data-id'))
  const changeMove = parseInt(changeEnd.getAttribute('data-id'))
  const border = document.querySelector('#c')
  
  array[changeMove]= change.style.backgroundColor
  array[changeDrop]= changeEnd.style.backgroundColor

  const validMoves=[
    
    changeDrop - width,
    changeDrop -1,
    changeDrop + 1,
    changeDrop + width,
  ]
  const valid = validMoves.includes(changeMove)
    const a = searchCol(3,39)
    const b = searchCol()
    const c = searchRow(3)
    const d = searchRow()
    
    if (changeMove && valid && (a || b || c || d)){
      setChange(null)
      setChangeEnd(null)
      
    }else{
      array[changeMove]= changeEnd.style.backgroundColor
      array[changeDrop]= change.style.backgroundColor
      setArray([...array])
      console.log('don t smatch')
      border.classList.add('seen')
    }
}

    useEffect(() => {
      Create()
    }, [])
    
    useEffect(() => {
      const Timer = setInterval(()=>{
        searchCol(3,39)
        searchCol()
        searchRow(3)
        searchRow()
        moveCube()
        setArray(array=>[...array])
      },200)
        
      return ()=> clearInterval(Timer)
    }, [searchCol,searchRow,moveCube,array])



  return <>
        <NavBar />
        
        <Content>
          <div id="c" className={`flex items-center justify-center text-xl text-gray-300 sm:w-5/12 p-2 h-auto w-full shadow rounded boder-solid border-2 shadow-lg shadow-indigo-500/50 border-violet-300 `}>
            <div className="  game">
              {array.map((v,i)=>{
                return <img
                key={i}
                className="img"
                style={{backgroundColor: v}}
                alt={v}
                data-id={i}
                draggable={true}
                onDragOver={(e)=> e.preventDefault()}
                onDragEnter={(e)=> e.preventDefault()}
                onDragLeave={(e)=> e.preventDefault()}
                onDragStart={dragStart}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
                whileDrag={{ scale: 1.2 }}
                />
              })}
            </div>
          </div>
        </Content>
  </>

}

export default Appss;

import { useCallback, useEffect, useState } from "react";
import Content from "./components/content";
import NavBar from "./components/navBar";
import blanc from './image/blanck.png'
import green from './image/green-candy.png'
import orange from './image/orange-candy.png'
import purple from './image/purple-candy.png'
import red from './image/red-candy.png'
import yellow from './image/yellow-candy.png'
import blue from './image/blue-candy.png'
import Score from "./components/score";
import Checks from "./components/check"



const width= 8

const color=[
  blue,
  green,
  orange,
  purple,
  red,
  yellow
]

function App() {
  const[array,setArray]=useState([])
  const[change,setChange]=useState(null)
  const[changeEnd,setChangeEnd]=useState(null)
  const[score,setScore]=useState(0)
  const[valid,setValid]=useState(false)
  const[move,setMove]=useState(false)


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
          colThree.forEach((b) => array[b]=blanc)
          setScore(score=> score+value)
          return true
        }  
    }
  },[array])

  const searchRow=useCallback((value=2,start=64)=>{
    for(let i = 0; i < start;i++){
                      //initial, +8, +16
      const colThree = value === 2 ?[i,i+1, i+ value]:[i,i+1, i+ 2,i + value]
      const checkColor= array[i]
      const notValid = start === 2? [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]:
      [5,6, 7, 13,14, 15, 21,22, 23, 29, 30, 31, 39, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      
      if(notValid.includes(i)) continue

        if(colThree.every(v=> array[v] === checkColor)) {
          colThree.forEach((b) => array[b]=blanc)
          setScore(score=> score+value)
          return true
        } 
    }
  },[array])

  const moveCube = useCallback(()=>{
    for(let i = 0; i <= 55 ; i++){
        const firstCol = [0, 1, 2, 3, 4, 5, 6, 7]

        if(firstCol.includes(i) && array[i]=== blanc){
          let NumColor = Math.floor(Math.random()*color.length)
          array[i]= color[NumColor]
          setMove(true)
        }
      if((array[i+width]) === blanc){
        array[i+width]= array[i]
        array[i]= blanc
        setMove(true)
      }  

      }
      setMove(false)
  },[array])


const dragStart=(e)=>{
setChange(e.target)

const border = document.querySelector('#c')
  border.classList.contains('seen') && border.classList.remove('seen')
}

const dragDrop=(e)=>{
  //console.log(e.target)
  setChangeEnd(e.target)
}

const dragEnd=(e,i)=>{
  
  const changeDrop = parseInt(change.getAttribute('data-id'))
  const changeMove = parseInt(changeEnd.getAttribute('data-id'))
  const border = document.querySelector('#c')
  
  array[changeMove]= change.getAttribute('src')
  array[changeDrop]= changeEnd.getAttribute('src')

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
      array[changeMove]= changeEnd.getAttribute('src')
      array[changeDrop]= change.getAttribute('src')
      setArray([...array])
      console.log(changeEnd)
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
      },100)
        
      return ()=> clearInterval(Timer)
    }, [searchCol,searchRow,moveCube,array])



  return <>
  <NavBar />

  <Score score={score} valid={valid}/>
  <Content>
    

    <div id="c" className={`hey flex items-center justify-center text-xl text-gray-300 w-5/12 p-2 h-auto  shadow rounded boder-solid border-2 shadow-lg shadow-indigo-500/50 border-violet-300 `}>
   
    { !valid && <Checks score={setScore} valid={setValid} wait={move} />}
      <div className={valid?"pl-4  game":"pl-4 game opacity-0"} >
        {array.map((v,i)=>{
          return <img
          src={v}
          key={i}
          className="img"
          id="drag"
          alt={v}
          data-id={i}
          draggable={true}
          onDragOver={(e)=> e.preventDefault()}
          onDragEnter={(e)=> e.preventDefault()}
          onDragLeave={(e)=> e.preventDefault()}
          onDragStart={dragStart}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          
          />
        })}
      </div>
    </div>
  </Content>
</>


}

export default App;

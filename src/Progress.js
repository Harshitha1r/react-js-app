import "./App.css"
import {useEffect, useState} from 'react';

export default function Progress(props){
    const [percent,setPercent]=useState(0)
    useEffect(()=>{
      const per=setTimeout(()=>{
        if(percent<100){
        setPercent(percent+1)
        }
      },10)
      return () => {
        clearTimeout(per)
      }
    },[percent])
    return(
        <div className="box">
            <div className="box1" style={{width:`${percent}%`}}></div>
        </div>
    )
}
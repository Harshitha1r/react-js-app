import React, { useEffect, useState } from "react";
import { questions as data } from "./data/questions";
export default function Quiz(){
    let cloned = JSON.parse(JSON.stringify(data));
    const [id,setId]=useState(1)
    const [questions,setQuestion]=useState(cloned)
    const [score,setScore]=useState(0)
    const [submitClicked,setSubmitclicked]=useState(false)
    useEffect(()=>{
        if(submitClicked){
            alert(`You scored ${score} / 4`);
            setId(1)
            
        }
        setQuestion(cloned)

    },[score])
    const inputchange=(e)=>{
        let arr=[...questions]
        arr.map(val=>{
            if(val.id==id){
                val.answer=e.target.value
            }
        })
        setQuestion(arr)
    }
    async function onsubmit(){
        let score1=0;
        setSubmitclicked(true)
        await questions.map(val=>{
            let ans=val.answer
            val.options.map(option=>{
                if(option.isCorrect && option.name===ans){
                    score1+=1
                }
            })
        }
        )
        setScore(score1)
    }
    return(
        <>
        {questions.map(val=>(
            <>
            {val.id==id && (
                <>
            <h1>{val.question}</h1>
            {val.options.map(option=>(
                <><input type="radio" value={option.name} name="foo" onChange={(e)=>inputchange(e)} checked={val.answer==option.name}/>{option.name}<br/></>
            ))}
            </>)}
            </>
        ))}
        <button disabled={id==1} onClick={()=>setId(id-1)}>Prev</button>
        {id==questions.length?<button onClick={onsubmit}>Submit</button>
        :<button onClick={()=>setId(id+1)}>Next</button>}
        </>
    )
}
import React, { useState } from "react";

function ChipsInput() {
  const [inputvalue,setInput]=useState("")
  const [chipsarr,setChips]=useState([])
  const addChips=(e)=>{
   if(e.key=="Enter"){
    setChips([...chipsarr,{name:inputvalue}])
    setInput("")
   }
  }
  const removeChips=(value)=>{
    let arr=chipsarr.filter(val=>val.name!=value)
    console.log("haii",arr,value)
    setChips(arr)
  }

  return (
    <div style={{display:"flex", flexDirection:"column",alignItems:"center", margin:"40px 0"}}>
      <h2>Chips Input</h2>
      <input
        type="text" 
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
        value={inputvalue}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>addChips(e)}
      />
      <hr/>
      <div style={{display:'flex',flexDirection:'row',gap:'0.2rem'}}>
      {chipsarr.map(val=>(
        <div style={{display:'flex',height:'auto',width:'auto',gap:'0.5rem',backgroundColor:'lightgray',opacity:'0.8',borderRadius:'0.7rem',padding:'0.4rem'}}>
        <div>
          {val.name}</div>
        <div style={{color:'red',cursor:'pointer'}} onClick={()=>removeChips(val.name)}>X</div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default ChipsInput;
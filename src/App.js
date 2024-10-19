// src/App.js
import React, { useEffect, useState } from 'react';

const App = () => {
  const [activeLight,setActivelight]=useState("red");
  const lights={
    red:{
      time:1,
      next:"yellow"
    },
    yellow:{
      time:5,
      next:"green"
    },
    green:{
      time:10,
      next:"red"
    }
  }
  useEffect(()=>{
    setTimeout(() => {
      setActivelight(lights[activeLight].next)
    }, lights[activeLight].time*1000);
  },[activeLight])

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={()=>setActivelight("red")}>Red</button>
      <button onClick={()=>setActivelight("yellow")}>Yellow</button>
      <button onClick={()=>setActivelight("green")}>Green</button>
      <div style={{marginBottom:'1rem',height:'3rem',width:'3rem',backgroundColor:'red',marginLeft:'2rem',borderRadius:'2rem',
        opacity:`${activeLight === "red" ? 1 :'0.2'}`
      }}></div>
      <div style={{marginBottom:'1rem',height:'3rem',width:'3rem',backgroundColor:'yellow',
        opacity:`${activeLight === "yellow" ? 1 :'0.2'}`,marginLeft:'2rem',borderRadius:'2rem'}}></div>
      <div style={{marginBottom:'1rem',height:'3rem',width:'3rem',
        opacity:`${activeLight === "green" ? 1 :'0.2'}`,backgroundColor:'green',marginLeft:'2rem',borderRadius:'2rem'}}></div>
    </div>
  );
};

export default App;

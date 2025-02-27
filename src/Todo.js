import { useEffect, useState } from "react"

export default function Todo(){
    //let cards=[{type:'Todo'},{type:'In Progress'},{type:'Finished'}]
    const [cards,setCards]=useState([{type:'Todo'},{type:'In Progress'},{type:'Finished'}])
    const [todo,settodo]=useState({name:"",desc:""})
    const [list,setlist]=useState([])
    const [desc,setdesc]=useState('')
    const onchangetodo=(e)=>{
        const names=e.target.name,value=e.target.value;
        if(names=="name"){
        settodo({...todo,name:value})
        }else{ 
        settodo({...todo,desc:value})
        }
    }
    const addtodo=()=>{
        let arr=[];
        arr.push(...list,{name:todo.name,desc:todo.desc,status:'Todo'})
        setlist(arr)
    }
    useEffect(()=>{
        let arr=[...cards]
        arr.map(item=>{
            item.items=list.filter(val=>val.status==item.type) || []
        })
        setCards(arr)
    },[list])
    const statusChange=(e,name)=>{
        let arr=[...list]
        arr.map(item=>{
        if(item.name==name){
             item.status=e.target.value
            }
        })
        setlist(arr)
    }
     return(
        <>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <br/>
        <input type="text" name="name" placeholder="Enter name" value={todo.name} onChange={(e)=>onchangetodo(e)}/><br/>
        <textarea name="desc" placeholder="Enter description" value={todo.desc} onChange={(e)=>onchangetodo(e)}/><br/>
        <button onClick={addtodo}>Add Todo</button>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            {cards.map(val=>(
                <div style={{display:'flex',flexDirection:'column',paddingRight:'2rem'}}>
                <h3>{val.type}</h3><br/>
                <div style={{width:'10rem',height:'20rem',background:'white',border:'0.1rem solid black'}}>
                {val?.items?.map(item=>(
                <div style={{width:'9rem',height:'5rem',background:'lightgray',border:'0.1rem solid black',margin:'0.4rem'}}>
                <p style={{fontSize:'0.9rem',margin:0}}>{item.name}</p>
                <p style={{fontSize:'0.9rem',margin:0}}>{item.desc}</p>
                <select onChange={(e)=>statusChange(e,item.name)}>
                    <option val="In Progress" selected={item.status=="In Progress"}>In Progress</option>
                    <option val="Finished" selected={item.status=="Finished"}>Finished</option>
                    <option val="Todo" selected={item.status=="Todo"}>Todo</option>
                </select>
                </div>
                ))}

                </div>
                </div>
            ))}
        </div>
        </>
    )
}
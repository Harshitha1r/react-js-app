import React, { useEffect, useState } from "react";
import Search from "./data/Serach";
import { items } from "./data/menus";
import Menu from "./data/Menu";

export default function FoodOrder(){
    const [item,setItems]=useState(items)
    const [searchText,setSerachtext]=useState('')
    useEffect(()=>{
        if(searchText.length == 0){
            setItems(items)
        }
    },[searchText])
    const sortBy=(e)=>{
        let sortKey=e.target.value,arr=[...item]
        if(sortKey == "Price"){
            arr.sort((a,b)=>(b.price - a.price))
            setItems(arr)
        }else if(sortKey == "Name"){
            arr.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        })
            setItems(arr)
        }else{
            setItems(items)
        }
    }

    const Filterby=(e)=>{
        let val=e.target.value,arr=[];
        if(val=="Tag"){
            setItems(items)
        }else{
        arr=items.filter(value=>{if(value.tags.includes(val)){return value}})
        setItems(arr) 
    }
    }
    return(
        <>
        <Search setItems={setItems} item={items} searchText={searchText} setSerachtext={setSerachtext}/>
        <div style={{display:'flex',justifyContent:'center',marginTop:'1rem'}}>
        Sort By
        <select onChange={(e)=>sortBy(e)}>
            <option selected={true}>None</option>
            <option>Price</option>
            <option>Name</option>
        </select>
        Filter By
        <select onChange={(e)=>Filterby(e)}>
          <option selected={true}>Tag</option>
          <option>American</option>
          <option>Sweet</option>
          <option>Crispy</option>
          <option>Spicy</option>
          <option>Veg</option>
          <option>Non-veg</option>
        </select>
        </div>
        <Menu items={item} setItems={setItems}/>
        </>
    )
}
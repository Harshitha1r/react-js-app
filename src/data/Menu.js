import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Menu(props){
    const {items,setItems}=props;
    const addFav=(name)=>{
        let arr=[...items]
        arr.forEach(val=>{
            if(val.name === name)
                val.fav=!val.fav
        })
        console.log(arr)
        setItems(arr)
    }
    return(
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
        {items.length ? 
        (items.map(item=>(
            <div style={{height:'200px',width:'300px',backgroundColor:'white',margin:'2rem',border:'0.1rem solid black'}}>
               <img src={item.image} width="300" height="150" style={{alignItems:'center'}}/>
               <h3>{item.name}    {item.price}/-  {item.fav==true ? <FaHeart color="red" onClick={()=>addFav(item.name)}/> : <FaRegHeart onClick={()=>addFav(item.name)}/> }</h3> 
            </div>
        ))):
        <p>No items</p>}
        </div>
    )
}
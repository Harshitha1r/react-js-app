export default function Search(props){
    const {setItems,item,searchText,setSerachtext}=props;

    const serachItems=(e)=>{
        setSerachtext(e.target.value)
    }
    const onclickSearch=()=>{
        let arr=[];
        if(searchText.length > 0){
        arr=item.filter(item=>{
            if(item.name.toLowerCase().includes(searchText.toLowerCase())){
                return item
            }
        })
        setItems(arr)
    }
    }
    
    return(
        <div style={{paddingTop:'4rem',display:'flex',justifyContent:'center'}}>
        <input type="search" placeholder="Enter a text to search" style={{marginRight:'1rem'}} value={searchText} onChange={(e)=>serachItems(e)}/>
        <button onClick={onclickSearch}>Search</button>
        </div>
    )
}
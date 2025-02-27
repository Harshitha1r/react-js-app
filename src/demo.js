import { useState, useEffect } from "react";

export default function App() {
  const [rowData, setRowdata] = useState([]);
  const [ids, setIds] = useState([]);
  const [donee,setdone]=useState(false)
  let arr=[]
  async function fetchApi() {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json",
    ).then((res) => {
      return res.json();
    });
    setIds(res);
  }
  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    ids.map((val)=>{
      fetch(`https://hacker-news.firebaseio.com/v0/item/${val}.json`).then(res=>res.json()).then(res=>(setRowdata((prev)=>[...prev,res])));
    })
  }, [ids]);

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Hacker news Job Board{rowData.length}</h1>
      {rowData?.map(val=>(
      <div style={{ width: "30rem", height: "5rem", backgroundColor: "pink",marginTop:'2rem' }}>
        <h4>{val.id}</h4>
        <span>{val.title}</span>
      </div>
      ))}
      <button
        style={{ backgroundColor: "orange", border: "none", marginTop: "2rem" }}
      >
        Load More Jobs
      </button>
    </div>
  );
}

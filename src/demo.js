import { useState, useEffect } from "react";

export default function App() {
  const [rowData, setRowdata] = useState([]);
  const [ids, setIds] = useState([]);
  const [currentIndex, setIndex] = useState(6);
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
    setRowdata([]);
    setIndex(6);
  }, []);
  const onbtnClick = () => {
    if (ids.length - currentIndex < 6) {
      setIndex(currentIndex + (ids.length % 6));
    } else {
      setIndex(currentIndex + 6);
    }
  };

  useEffect(() => {
    ids.map((val, i) => {
      if (i < currentIndex && i >= rowData.length) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${val}.json`)
          .then((res) => res.json())
          .then((res) => setRowdata((prev) => [...prev, res]));
      }
    });
  }, [ids, currentIndex]);

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Hacker news Job Board</h1>
      {rowData?.map((val) => (
        <div
          style={{
            width: "40rem",
            height: "5rem",
            backgroundColor: "pink",
            marginTop: "2rem",
          }}
        >
          <h4 style={{ margin: "1rem 0rem 1rem 1rem", textAlign: "left" }}>
            {val.title}
          </h4>
          <p style={{ textAlign: "left", marginLeft: "1rem" }}>By {val.by}</p>
        </div>
      ))}
      {currentIndex !== ids.length && (
        <button
          style={{
            backgroundColor: "orange",
            border: "none",
            marginTop: "2rem",
          }}
          onClick={onbtnClick}
        >
          Load More Jobs
        </button>
      )}
    </div>
  );
}

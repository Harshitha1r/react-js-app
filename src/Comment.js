import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function App() {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [indcomment, setindComment] = useState("");
  const [indreply, setindReply] = useState("")
  const postComment = () => {
    let arr = [];
    arr.push(...comments, { author: author, comment: comment, id: Math.floor(Math.random() * (20000 - 10000 + 1) + 100000) });
    setComments(arr);
    setComment("");
    setAuthor("")
  };
  const oneditreplymode = (author, id, type) => {
    let arr = [...comments];
    arr.map((val) => {
      if (id) {
        if (val.id == id) {
          val.children.map((item) => {
            if (item.comment == author) {
              if (type == "edit") {
                item.editMode = true
              } else {
                item.replyMode = true
              }
            }
          }
          )
        }
      } else
        if (val.author == author) {
          if (type == "edit") {
            val.editMode = true
          } else {
            val.replyMode = true
          }
        }
    }
    )
    setComments(arr)

  }
  const ontimeupdate = (e, author, id) => {
    let arr = [...comments]
    arr.map((val) => {
      if (id) {
        if (val.id == id) {
          val.children.map((item) => {
            if (item.comment == author) {
              item.comment = indcomment;
              item.editMode = false
            }
          })
        }
      } else
        if (val.author == author) {
          val.comment = indcomment;
          val.editMode = false
        }
    })
    setComments(arr)
  }

  const onsave = (author, id) => {
    let arr = [...comments]
    arr.map((val) => {
      if (id) {
        if (val.id == id) {
          val.children.map((item) => {
            if (item.comment == author) {
              item.replyMode = false
            }
          })
        }
      } else
        if (val.author == author || val.id == id) {
          let newarr = [...val.children || [], { comment: indreply }]
          val.children = newarr;
          val.replyMode = false
        }
    })
    setComments(arr)
  }

  const commentLayout = (val, id = 0) => {
    return (
      <div>
        <p style={{ fontSize: "0.7rem", textAlign: "left" }}>
          {val.author}
        </p>
        <p
          style={{
            fontFamily: "fantasy",
            paddingLeft: "2rem",
            marginTop: 0,
            fontSize: "0.9rem",
            marginLeft: "0.6rem",
          }}
        >
          {val.editMode ? <><input type="text" defaultValue={val.comment} onChange={(e) => {
            setindComment(e.target.value);
          }} /><button onClick={(e) => ontimeupdate(e, val.author || val.comment, id)}>Update</button></> : val.comment}
          <MdEdit style={{ marginLeft: "1rem",cursor:'pointer' }} onClick={() => oneditreplymode(val.author || val.comment, id, "edit")}/>
          <FaReply style={{ marginLeft: "1rem",cursor:'pointer' }} onClick={() => oneditreplymode(val.author || val.comment, id, "reply")}/>
          {val.replyMode && <><input type="text" onChange={(e) => setindReply(e.target.value)} /><button onClick={() => onsave(val.author || val.comment, id)}>save</button></>}
        </p>
        {val?.children?.map(item => (commentLayout(item, val.id)))}
      </div>
    )
  }
  return (
    <div className="App">
      <h1>Add a Comment:</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <textarea
          style={{ height: "4rem", width: "20rem" }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Enter Comment here"
        />
        <button style={{ marginTop: "1rem" }} onClick={postComment}>
          Send
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <h3>Comments:</h3>
        {comments.map(val => (
          commentLayout(val)
        ))}
      </div>
    </div>
  );
}

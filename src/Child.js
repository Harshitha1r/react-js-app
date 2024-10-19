
import React from "react";
function Child(props){
    console.log("re-rendred",props.obj);
    return(
        <p>hello world</p>
    )
}

export default React.memo(Child)
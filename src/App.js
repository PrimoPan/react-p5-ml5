import React from "react";
import Canvas from "./canvas"

function App(props)
{
    return (
        <div>
             <div style={{borderStyle:"solid",height:"480px",width:"640px",margin:"0 auto"}}>
                 <Canvas/>
             </div>
        </div>
    )

}
export default App
import type { JSX } from "react";

// la zone avec les messages recus + l'input et son bouton
interface ChatZoneProps{
    
}

const test = "hello";

export default function ChatZone({}:ChatZoneProps):JSX.Element {
    return(
        <div style={{backgroundColor:"lightblue", width: "80%", border: "1px solid green", display: "flex", flexDirection:"column", height: "100%", justifyContent: "space-between"}}>
            {/* messages */}
            <div style={{backgroundColor:"lightblue", display:"flex", flexDirection:"column", overflowY:"scroll"}}>
                <div style={{ border : "1px solid blue", backgroundColor:"blue"}}>{test}</div>
                {/* <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div>
                <div style={{minHeight:"500px", border : "1px solid blue"}}>{test}</div> */}
            </div>

            {/* input + boutton */}
            <div style={{backgroundColor:"lightgrey", }}>yaya</div>
        </div>

    );
};
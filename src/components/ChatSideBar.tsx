import type { JSX } from "react";

interface ChatSideBarProps{
    readonly id : number;
}

export default function ChatSideBar({id} : ChatSideBarProps): JSX.Element{
    return (
        <aside style={{ width: "20%", backgroundColor: "#f4f4f4", padding: "1rem" }}>
            <h3>Utilisateurs connectés</h3>
            <p> id : {id} </p> {/* entre accolades full js */}
            <ul>
                {/* data temporaire */}
                <li>Alice</li>
                <li>Bob</li>
            </ul>
        </aside>
    );
};
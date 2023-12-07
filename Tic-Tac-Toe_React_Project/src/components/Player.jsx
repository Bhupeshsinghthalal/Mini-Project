import { useState } from "react";

export default function Player({name,symbol,isActive,onChangeName}){
    const [isEditing,setIsEditing]=useState(false);
    const [initialName,setInitialName]=useState(name);

    function handleEditClick(){
        setIsEditing((editing)=> !editing);
        if(isEditing){
            onChangeName(symbol,initialName);
        }
    }

    function handleChnage(event){   // use to dinamically changes input value
        setInitialName(event.target.value);
    }

    let playerName= <span className="player-name">{initialName}</span>;

    if(isEditing){
        playerName= <input type="text" required value={initialName} onChange={handleChnage}/>;
    }
    return(
        <li className={isActive?'active':undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    );
}
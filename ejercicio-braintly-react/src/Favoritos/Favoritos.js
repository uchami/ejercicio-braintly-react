import React, {useState} from 'react';
import {Peliculas} from "../Peliculas/Peliculas";
import "./Favoritos.css";

export const Favoritos = () => {
    const [favs, setFavs] = useState(JSON.parse(localStorage.getItem("favs")));
    
    return <div id="favoritos">
        <h1>Favoritos!</h1>
        {favs !== null && Array.isArray(favs) && <Peliculas onFavsChange={
            (newFavs) => 
                {setFavs(newFavs);}
            } peliculas={favs}/>}
    </div>
}
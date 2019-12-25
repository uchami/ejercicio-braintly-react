import React, { useState } from 'react';
import "./Peliculas.css";
import {ListGroup, Collapse} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';

export const Peliculas = ({peliculas}) => {
    const [detailOpened, setDetailOpened] = useState(false)
    const [favs, setFavs] = useState(localStorage.getItem("favs") === null ? [] : JSON.parse(localStorage.getItem("favs")))

    const toggleDetailOpened = (id) => {
        const newDetailOpened = (id === detailOpened) ? false : id; 
        setDetailOpened(newDetailOpened);
    }

    const renderDetail = (peli) => {
        return <Collapse in={(detailOpened === peli.imdbID)}>
            <div id={"detail" + peli.imdbID}>
                <img src={peli.Poster} alt={peli.Title}></img>
                {peli.Title}
                {peli.Year}
            </div>
        </Collapse>
    }

    const toggleFavs = (e, peli) => {
        e.stopPropagation();
        
        let newFavs;

        if(favs && favs.some(f => f.imdbID === peli.imdbID)){
            //is erasing
            newFavs = favs.filter(f => f.imdbID !== peli.imdbID);
        } else {
            //is adding
            newFavs = favs.concat([peli]);
        }

        localStorage.setItem("favs", JSON.stringify(newFavs));
        setFavs(newFavs);
    }
    return <div id="peliculas">
        <ListGroup>
            {peliculas.map(peli => { 
                const isFav = favs.some(f => peli.imdbID === f.imdbID);
                return <ListGroup.Item 
                        aria-controls={"detail" + peli.imdbID} 
                        aria-expanded={detailOpened === peli.imdbID} 
                        onClick={() => toggleDetailOpened(peli.imdbID)} 
                        key={peli.imdbID}>
                        {peli.Title}
                        <FontAwesomeIcon 
                        className={( isFav ? "isFav" : "") + " starIcon"} 
                        onClick={(e) => {toggleFavs(e, peli)}} 
                        icon={isFav ? faStar : farStar} /> 
                        {renderDetail(peli)}
                    </ListGroup.Item>
            })}
        </ListGroup>
    </div>
}
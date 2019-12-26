import React, { useState, useEffect } from 'react';
import "./Peliculas.css";
import {ListGroup, Collapse, Spinner, Col, Row, Image, Container, Toast, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import { obtenerDetallePelicula } from '../api';
import {toggleFavs} from "../utils/FavouritesHelper";
import deepCopy from "../utils/deepCopy";

export const Peliculas = ({peliculas, onFavsChange}) => {
    const [detailOpened, setDetailOpened] = useState(false)
    const [favs, setFavs] = useState(localStorage.getItem("favs") === null ? [] : JSON.parse(localStorage.getItem("favs")))
    const [details, setDetails] = useState({});
    const [recentlyAffectedMovie, setRecentlyAffectedMovie] = useState(null);

    const toggleDetailOpened = (id) => {
        const newDetailOpened = (id === detailOpened) ? false : id; 
        setDetailOpened(newDetailOpened);
    }

    const renderDetail = (peli) => {
        const deets = details[peli.imdbID];
        if(detailOpened === peli.imdbID && deets === undefined){
            //lleno el objeto para no llamar multiples veces al servicio
            let newDetails = deepCopy(details);
            newDetails[peli.imdbID] = {loading: true};
            setDetails(newDetails);

            obtenerDetallePelicula(peli.imdbID).then(res => {
                let newerDetails = deepCopy(newDetails);
                newerDetails[peli.imdbID] = res;
                newerDetails[peli.imdbID].loading = false;
                setDetails(newerDetails);
            });
        }
        return <Collapse in={(detailOpened === peli.imdbID)}>
            <Container id={"detail" + peli.imdbID} className="movie-detail">
                <Row>
                    <h2>{peli.Title} - {peli.Year}</h2>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Image src={peli.Poster} thumbnail></Image>
                    </Col>
                    <Col xs={12} md={8}>
                        {deets && !deets.loading && <p className="text-left">
                            <b>Sinopsis:</b> <br/>
                            {deets.Plot}
                            <br/><br/>
                            <b>Elenco:</b> <br/>
                            {deets.Actors}
                        </p>}
                    </Col>
                </Row>
                <Row>
                    {/* Loading wheel */}
                    { deets && deets.loading && <><Spinner animation="border" variant="primary" /> La información se está cargando... </>}
                </Row>
            </Container>
        </Collapse>
    }

    const toggleFavourites = (e, peli) => {
        e.stopPropagation();
        const newFavs = toggleFavs(peli, favs);
        setFavs(newFavs);
        setRecentlyAffectedMovie(peli);
        if(onFavsChange !== undefined) onFavsChange(newFavs)
    }
    const undoToggle = (peli) => {
        const newFavs = toggleFavs(peli, favs);
        setFavs(newFavs);
        setRecentlyAffectedMovie(null);
        if(onFavsChange !== undefined) onFavsChange(newFavs)
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

                        <div className="row-pelicula">
                            {peli.Title}
                            <FontAwesomeIcon 
                            className={( isFav ? "isFav" : "") + " starIcon"} 
                            onClick={(e) => {toggleFavourites(e, peli)}} 
                            icon={isFav ? faStar : farStar} /> 
                        </div>
                        {renderDetail(peli)}
                        
                    </ListGroup.Item>
            })}
        </ListGroup>
        <Row className={(recentlyAffectedMovie ? "" : "h-0") + " toast-container"}>
            <Col xs={12}>
                <Toast onClose={() => setRecentlyAffectedMovie(null)} show={recentlyAffectedMovie} delay={5000} auothide>
                    <Toast.Header className="p-2">
                        {recentlyAffectedMovie && <><strong className="mr-auto">Se afectó {recentlyAffectedMovie.Title} en tu lista de favoritos</strong>
                        <Button color="primary" onClick={() => undoToggle(recentlyAffectedMovie)}>Deshacer</Button></>}
                    </Toast.Header>
                </Toast>
            </Col>
        </Row>
    </div>
}
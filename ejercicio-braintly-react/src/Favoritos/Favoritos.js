import React, {useState} from 'react';
import {Peliculas} from "../Peliculas/Peliculas";
import {Row, Toast, Col} from "react-bootstrap";
import "./Favoritos.css";

export const Favoritos = () => {
    const [favs, setFavs] = useState(JSON.parse(localStorage.getItem("favs")));
    const [show, setShow] = useState(true);
    return <div id="favoritos">
        <h1>Favoritos!</h1>
        {favs !== null && Array.isArray(favs) && <Peliculas peliculas={favs}/>}
        <Row className="toast-container">
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                    />
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </Col>
        </Row>
    </div>
}
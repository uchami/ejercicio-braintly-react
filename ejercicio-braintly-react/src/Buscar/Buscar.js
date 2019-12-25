import React, { useEffect, useState } from "react"
import { obtenerPeliculas } from '../api';
import { Form } from "react-bootstrap";
import { Peliculas } from "../Peliculas/Peliculas";

export const Buscar = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const renderBody = (pelis) => {
        return <div id="buscar">
            <h1>Peliculas!</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Buscar</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e) => setBusqueda(e.target.value)} 
                        placeholder="Busco la película..." />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
            </Form>
            <Peliculas peliculas={pelis}/> 
        </div>
    }
    useEffect( () => {
        obtenerPeliculas(busqueda).then(res => {
            if(res.Response !== "False"){
                setPeliculas(res.Search);
            }
        })
    }, [busqueda])
    return peliculas ? renderBody(peliculas) : null
}
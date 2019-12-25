import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { Favoritos } from './Favoritos/Favoritos';
import { Peliculas } from './Peliculas/Peliculas'

export const options = [
    {name: "Películas", link: "peliculas", content: Peliculas},
    {name: "Favoritos", link: "favoritos", content: Favoritos}
]

export const Menu = ({}) => {
    return <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/peliculas">PelisCopadas</Navbar.Brand>
    <Nav className="mr-auto">
      {options.map(option => {
          return <Link className="nav-link" to={option.link}>{option.name}</Link>
      })}
    </Nav>
  </Navbar>
}
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { Favoritos } from './Favoritos/Favoritos';
import { Buscar } from './Buscar/Buscar';

export const options = [
    {name: "Buscar películas", link: "buscar", content: Buscar},
    {name: "Favoritos", link: "favoritos", content: Favoritos}
]

export const Menu = () => {
    return <Navbar bg="dark" variant="dark">
    <Navbar.Brand href={"/" + options[0].link}>PelisCopadas</Navbar.Brand>
    <Nav className="mr-auto">
      {options.map(option => {
          return <Link key={option.link} className="nav-link" to={option.link}>{option.name}</Link>
      })}
    </Nav>
  </Navbar>
}
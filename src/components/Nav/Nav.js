import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './img/logo192.png';


const img = {
  width: "25%",
  height: "25%",
  marginLeft: "auto",
  marginRight: "auto"
};

const NavBar = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/">
      <img class="App-logo" src={logo} alt="Card image cap" style={img} />
    </Link>
    <Button variant="success" className="ml-auto" href="new">Start a Project</Button>
  </nav>


);

export default NavBar;

//
// <Navbar.Brand href="/">GoodFund</Navbar.Brand>
// <Navbar.Toggle aria-controls="basic-navbar-nav" />
// <Navbar.Collapse id="basic-navbar-nav">
//   <div class="d-flex justify-content-start">hi</div>
//
//   <Nav className="ml-auto">
//     <Nav.Item>

//     </Nav.Item>
//   </Nav>
// </Navbar.Collapse>

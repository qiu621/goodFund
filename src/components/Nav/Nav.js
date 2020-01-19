import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
  .narbar {
    background-color: #FFF;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #000;

    &:hover {
      color: white;
    }
  }
;
`

const NavBar = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <Button variant="success" href="new">Start a Project</Button>
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

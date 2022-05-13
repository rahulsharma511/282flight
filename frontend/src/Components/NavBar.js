import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function NavBar() {

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="ml-auto" href="#home">Chapri Airlines</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    
                    
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                        <NavDropdown title={localStorage.getItem("email")} id="collasible-nav-dropdown">
                            <Link to="/search"><NavDropdown.Item href="#action/3.1">Search Flight</NavDropdown.Item></Link>
                            <Link to="/mybookings"><NavDropdown.Item href="#action/3.1">My Bookings</NavDropdown.Item></Link>
                            <NavDropdown.Divider />
                            <Link to="/"><NavDropdown.Item href="/" 
                            onClick={()=>{
                                localStorage.removeItem("email");
                                localStorage.removeItem("id");
                                localStorage.removeItem("firstName");
                                localStorage.removeItem("lastName");
                            }}
                            >Log out</NavDropdown.Item></Link>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            
        </div>
    )
}

export default NavBar

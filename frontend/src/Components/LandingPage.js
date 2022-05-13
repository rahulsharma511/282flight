import React from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
// import airplane1 from '../Images/airplane1.jpg';
// import airplane2 from '../Images/airplane2.jpg';
import airplane3 from '../Images/airplane3.jpg';
// import airplane4 from '../Images/airplane4.jpg';

function LandingPage() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" className="ml-auto">Chapri Airlines</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Nav className="mr-auto">
                    <ul className="navbar-nav" >
                        <li className="nav-item"><Link to ='/login'><Nav.Link href="/login">Log in</Nav.Link></Link></li>
                        <li className="nav-item" style={{backgroundColor: "rgb(255, 127, 80)"}}><Link to ='/signup'><Button variant="outline-light">Sign up</Button></Link></li>
                    </ul>
                </Nav>
                </Container>
            </Navbar>
            <div>
                <Image className = "main_img"
                src={airplane3}
                />
            </div>
        </div>
    )
}

export default LandingPage;

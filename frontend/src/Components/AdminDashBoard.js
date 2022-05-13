import React from 'react';
import {Navbar, Nav, NavDropdown, Container, Row, Col, Button, Table, Modal, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import backendServer from '../webConfig.js';

function AdminDashBoard() {


    const[allFlights, changeAllFlights] = useState([]);
    const[newPrice, changeNewPrice] = useState(0);
    const[selectedFlight, changeSelectedFlight] = useState({});


    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        
        changeNewPrice(0);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const getAllFlights = async () => {

        const response = await axios.post(`${backendServer}/getallflights`);

        if(response.status === 200){
            console.log(response.data);
            changeAllFlights(response.data.flights);
        }
    }

    const updatePrice = async(flight) =>{
        console.log(newPrice);
        console.log(flight);
        
        const data = {
            flight_id:flight.flight_id,
            newPrice: parseInt(newPrice)
        }

        // API CALL

        let response = await axios.post(`${backendServer}/updateprice`,data);

        if(response.status === 200){
            console.log(response.data.Message);
            getAllFlights();
            handleClose();

        }



    }

    useEffect(()=>{
        getAllFlights();
    },[]);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="ml-auto" href="#home">Chapri Airlines</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    
                    
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                        <NavDropdown title={localStorage.getItem("admin_email")} id="collasible-nav-dropdown">
                            
                            <Link to="/"><NavDropdown.Item href="/" 
                            onClick={()=>{
                                localStorage.removeItem("admin_email");
                                localStorage.removeItem("admin_id");
                                localStorage.removeItem("admin_firstName");
                                localStorage.removeItem("admin_lastName");
                            }}
                            >Log out</NavDropdown.Item></Link>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <br/>

            <Row>
                <Col>
                    <h1>All the Flights</h1>
                </Col>
                <Col xs={7}>
                    <Link to= '/addflight'><Button>Add flight</Button></Link>
                </Col>
                <Col></Col>
            </Row>
            
            <Table>
                <thead>
                    <tr>
                        <th>Flight ID</th>
                        <th>Origin City</th>
                        <th>Destination City</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Seat Price</th>
                        <th>Seats Left</th>
                        <th>Update Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allFlights.map(flight =>{
                            return(
                            <tr> 
                                <td>{flight.flight_id}</td>
                                <td>{flight.flight_origin}</td>
                                <td>{flight.flight_destination}</td>
                                <td>{flight.flight_departureTime}</td>
                                <td>{flight.flight_arrivalTime}</td>
                                <td>{flight.flight_price}</td>
                                <td>{flight.flight_seatsLeft}</td>
                                <td>
                                    <Button onClick={()=>{
                                        changeSelectedFlight(flight);
                                        handleShow();
                                    }}>
                                    Update Price
                                    </Button>
                                </td>

                                {/*Modal Start*/}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Update Price</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        
                                        Enter new price for selected Flight ID
                                        <Form>
                                        <Form.Group className="mb-3" controlId="formnewPrice">
                                            <Form.Control 
                                            type="number" 
                                            placeholder="New Price" 
                                            value={newPrice}
                                            onChange={(event)=>{
                                                changeNewPrice(event.target.value);
                                            }}
                                            />
                                        </Form.Group>
                                        </Form>
                                        
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" value={flight.flight_id} onClick={(event)=>{
                                        updatePrice(selectedFlight);
                                    }}>
                                        Save Changes
                                    </Button>
                                    </Modal.Footer>
                                    
                                </Modal>
                                {/*Modal End*/}

                            </tr>
                        )})
                    }
                </tbody>
            </Table>
            
        </div>
    )
}

export default AdminDashBoard;

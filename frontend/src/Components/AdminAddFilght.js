import React from 'react';
import {Navbar, Nav, NavDropdown, Container, Row, Col, Button, Form} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import backendServer from '../webConfig.js';



function AdminAddFilght() {

    const[selectedDate, setSelectedDate] = useState(new Date("2021-01-01"));
    const[origin, changeOrigin] = useState("");
    const[destination, changeDestination] = useState("");
    const[price, changePrice] = useState(0);
    const[capacity, changeCapacity] = useState(0);
    const[company, changeCompany] = useState("");
    const[departureTime, changeDepartureTime] = useState(0);
    const[arrivalTime, changeArrivalTime] = useState(0);
    const[validationText, changeValidationText] = useState("");

    const history = useHistory();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }


    const addFlight = async (event)=>{
        event.preventDefault();
        let map = new Map();
        map.set("Jan",1);
        map.set("Feb",2);
        map.set("Mar",3);
        map.set("Apr",4);
        map.set("May",5);
        map.set("Jun",6);
        map.set("Jul",7);
        map.set("Aug",8);
        map.set("Sep",9);
        map.set("Oct",10);
        map.set("Nov",11);
        map.set("Dec",12);
        console.log(origin, destination, price, capacity, company, departureTime, arrivalTime);
        console.log("Date:",selectedDate.toString().split(' '));

        const splittedDate = selectedDate.toString().split(' ');
        const monthText = selectedDate.toString().split(' ')[1];
        const month = map.get(monthText);


         let actualDate = splittedDate[3]+"-"+month+"-"+splittedDate[2];
         console.log("Actual Date:",actualDate);
        
        let actualDepartureTime = actualDate+"-"+ departureTime;
        let actualArrivalTime = actualDate+"-"+ arrivalTime;

        console.log(actualDepartureTime);
        console.log(actualArrivalTime);

        if(price < 0 || capacity < 0){
            changeValidationText("Entries made or not valid!");
        }else{
            const data = {
                origin:origin,
                destination:destination,
                price:price,
                capacity:capacity,
                company: company,
                departureTime: actualDepartureTime,
                arrivalTime: actualArrivalTime
            }
            
            const response = await axios.post(`${backendServer}/addflight`,data);
    
            if(response.status === 200){
                console.log("Flight Added!!!");
                alert("Flight Added!");
                history.push("/admindashboard");
            }
        }

        
        
    }
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
            
            <Row>
                <Col>
                    <h1>Add Flight</h1>
                </Col>
                <Col xs={7}>
                    
                </Col>
                <Col></Col>
            </Row>

            <Row>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="Origin">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter origin"
                            name="origin"
                            onChange={(event)=>{
                                changeOrigin(event.target.value)
                            }}
                            />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="Destination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter destination" 
                            name="destination"
                            onChange={(event)=>{
                                changeDestination(event.target.value)
                            }}
                            />
                            </Form.Group>
                        </Col>

                        <Col>

                            <Form.Group className="mb-3" controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                            type="number" 
                            placeholder="Enter price"
                            name="price"
                            onChange={(event)=>{
                                changePrice(event.target.value)
                            }}
                            />
                            <Form.Text className="text-muted">
                            Enter a positive value.
                            </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>

                            <Form.Group className="mb-3" controlId="Capacity">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control 
                            type="number" 
                            placeholder="Enter capacity" 
                            name="capacity"
                            onChange={(event)=>{
                                changeCapacity(event.target.value)
                            }}
                            />
                            <Form.Text className="text-muted">
                            Enter a positive value.
                            </Form.Text>
                            </Form.Group>
                        </Col>

                        <Col>

                            <Form.Group className="mb-3" controlId="Company">
                            <Form.Label>Company</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter company" 
                            name="company"
                            onChange={(event)=>{
                                changeCompany(event.target.value);
                            }}
                            />
                            </Form.Group>

                        </Col>

                        <Col>
                            
                        </Col>
                    </Row>

                    <Row>
                        
                        <Col>
                            <Form.Group className="mb-3" controlId="departureTime">
                            <Form.Label>Departure Time</Form.Label>
                            <Form.Control 
                            type="number" 
                            placeholder="Enter departure time" 
                            name="departureTime"
                            onChange={(event)=>{
                                changeDepartureTime(event.target.value);
                            }}
                            />
                            <Form.Text className="text-muted">
                            Enter time according to 24 hours format.
                            </Form.Text>
                            </Form.Group>
                        </Col>
                            
                        <Col>
                            <Form.Group className="mb-3" controlId="arrivalTime">
                            <Form.Label>Arrival Time</Form.Label>
                            <Form.Control 
                            type="number" 
                            placeholder="Enter arrival time" 
                            name="arrivalTime"
                            onChange={(event)=>{
                                changeArrivalTime(event.target.value);
                            }}
                            />
                            <Form.Text className="text-muted">
                            Enter time according to 24 hours format.
                            </Form.Text>
                            </Form.Group>
                        </Col>

                        <Col>
                            
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Departure Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                        </Col>

                        <Col>
                            <br/>
                            
                            <Button 
                            variant="primary"
                            type="submit"
                            onClick={(event)=>{
                                addFlight(event);
                            }}
                            >
                            Submit
                            </Button>   
                        </Col>
                        <Col></Col>
                    </Row>  
                </Form>
                <p style={{color:"red"}}>{validationText}</p>
            </Row>
        </div>
    )
}

export default AdminAddFilght;

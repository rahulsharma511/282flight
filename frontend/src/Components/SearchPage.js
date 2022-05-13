import React from 'react';
import NavBar from './NavBar';
import {useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import {Card, Button, Form, Row, Col, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import backendServer from '../webConfig.js';


function SearchPage() {

    const[selectedDate, setSelectedDate] = useState(new Date("2021-01-01"));
    const[origin, changeOrigin] = useState("");
    const[destination, changeDestination] = useState("");
    const[seats, changeSeats] = useState(0);
    const[flights, changeFlights] = useState([]);
    const[flightSearched, changeflightSearched] = useState(false);
    const[spinner, changeSpinner] = useState(false);
    const[seatValidation, changeSeatValidation] = useState("");

    const history = useHistory();


    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const searchFlight = async (event) =>{
        changeSeatValidation("");
        changeflightSearched(true);
        changeSpinner(true);
        console.log(origin, destination, seats);
        console.log(selectedDate);

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
        console.log("Date:",selectedDate.toString().split(' '));

        const splittedDate = selectedDate.toString().split(' ');
        const monthText = selectedDate.toString().split(' ')[1];
        const month = map.get(monthText);

        let actualDate = splittedDate[3]+"-"+"0"+month+"-"+splittedDate[2];
        console.log("Actual Date:",actualDate);

        const data = {
            origin:origin,
            destination:destination,
            date:actualDate
        }

        let response = await axios.post(`${backendServer}/searchflight`,data);
        console.log(data);

        if(response.status === 200){
            console.log(response.data.result);
            changeFlights(response.data.result);
            console.log(flights);
            setTimeout(()=>{
                console.log("Loading the flights");
                changeSpinner(false);
                
            },2000);
            console.log(flights);
        }




    }

   const bookFlight = (flight)=>{
       console.log(flight);
       const actualSeats = parseInt(seats);

       if(flight.flight_seatsLeft < actualSeats){

            changeSeatValidation("Seats required are required is greater then no of seats left.");

        }else if(actualSeats === 0){

            changeSeatValidation("0 Seats cannot be booked!");
            
        }else{

            history.push({
                pathname:"/booking",
                state:{
                    flight:flight,
                    seats:seats
                }
            });
        }

       
   }


    return (
        <div>
            <NavBar/>
            {/*Now the search Component */}
            <div>

            <Card>
                <Card.Header as="h3">Search Flight</Card.Header>
                <Card.Body>
                    <Form>  
                        <Row>  

                            <Col>
                                <Form.Group className="mb-3" controlId="formorigin">
                                    <Form.Label>Departing City</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Enter departing city"
                                    value={origin}
                                    onChange={(event)=>{
                                        changeOrigin(event.target.value);
                                    }} 
                                        />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="formdestination">
                                    <Form.Label>Arriving city</Form.Label>
                                    <Form.Control type="text" 
                                    placeholder="Enter arriving city"
                                    value={destination}
                                    onChange={(event)=>{
                                        changeDestination(event.target.value);
                                    }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="formseats">
                                    <Form.Label>Seats</Form.Label>
                                    <Form.Control type="number" 
                                    placeholder="Enter Seats"
                                    value={seats}
                                    onChange={(event)=>{
                                        changeSeats(event.target.value);
                                    }}
                                    />
                                </Form.Group>
                            </Col>

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
                        </Row> 

                        <Row>
                            <Col xs={10}></Col>
                            <Col>
                                <Button variant="primary"
                                type="submit"
                                onClick={(event)=>{
                                    searchFlight(event);
                                }}
                                >
                                Submit
                                </Button>
                            </Col>
                        </Row> 
                    </Form>
                    <p style={{color:"red"}}>{seatValidation}</p>
                
                </Card.Body>
            </Card>

            <br/>
            <br/>
                
            { flightSearched ? 
                 
                spinner ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> 
                    
                :flights.length === 0 ? 
                    <h1>No Flights were found! Search for another day</h1>
                :flights.map(flight =>{
                    return(
                        <Card key={flight.flight_id} style={{ marginBottom: "2rem" }}>
                            <Card.Header>{flight.flight_id}</Card.Header>
                            <Card.Body>
                                <Card.Title>{flight.flight_company}</Card.Title>
                                <Card.Text>
                                <table style={{ width: "100%", tableLayout: "fixed" }}>
                                    <tbody>
                                    <tr>
                                        <td style={{ fontSize: "1.4rem" }}>{flight.flight_origin}</td>
                                        <td>
                                        <span class="plane">
                                            <svg
                                            clip-rule="evenodd"
                                            fill-rule="evenodd"
                                            height="30"
                                            width="30"
                                            image-rendering="optimizeQuality"
                                            shape-rendering="geometricPrecision"
                                            text-rendering="geometricPrecision"
                                            viewBox="0 0 500 500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <g stroke="#222">
                                                <line
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-width="30"
                                                x1="300"
                                                x2="55"
                                                y1="390"
                                                y2="390"
                                                />
                                                <path
                                                d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                                                fill="#222"
                                                stroke-linejoin="round"
                                                stroke-width="10"
                                                />
                                            </g>
                                            </svg>
                                        </span>
                                        </td>
                                        <td style={{ fontSize: "1.4rem" }}>{flight.flight_destination}</td>
                                        <td style={{ fontSize: "1.4rem" }}>
                                        {/* <span style={{ float: "right" }}> */}
                                        ${flight.flight_price}
                                        {/* </span> */}
                                        </td>
                                        <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                    bookFlight(flight);
                                            }}
        
                                        >
                                            Book now
                                        </Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <span style={{ textAlign: "start" }}></span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                }) 
            
    

                // START
        :  <h1>Your searched flights will appear here.</h1> 
        }
                    
            </div>
        </div>
    )
}

export default SearchPage

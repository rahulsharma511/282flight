import React from 'react';
import NavBar from './NavBar';
import {useState, useEffect} from 'react';
import {Card, Button, Row, Col, Form} from 'react-bootstrap';
import {useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import backendServer from '../webConfig.js';


function BookPage() {

    const location = useLocation();
    const history = useHistory();

    const[flight, changeFlight] = useState({});
    const[seats, changeSeats] = useState(1);
    const[mileage, changeMileage] = useState(null);
    const[useMileage, changeUseMileage] = useState(false);


    const getUserDetails = async() =>{
        
        const data = {
            user_id:localStorage.getItem("id")
        }
        console.log(data);

        let response = await axios.post(`${backendServer}/getuserdetails`,data);

        if(response.status === 200){
            console.log(response.data.user);
            changeMileage(response.data.user.user_mileage);
        }

    }

    const bookFlight = async(event) =>{
        event.preventDefault();
        // console.log(flight.flight_arrivalTime);
        // console.log(flight.flight_arrivalTime);
        // let d = new Date('2021-11-30T18:00:00.000Z');
        // console.log(d.getUTCFullYear());
        // console.log(d.getUTCMonth() + 1);
        // console.log(d.getUTCDate());
        // console.log(d.getUTCHours()); 

        let departureTime = new Date(flight.flight_departureTime);
        let actualDeparutreTime = departureTime.getUTCFullYear() + "-" +(departureTime.getUTCMonth() + 1) + "-"+ departureTime.getUTCDate()+"-"+(departureTime.getUTCHours() - 8);
        console.log(actualDeparutreTime);

        let arrivalTime = new Date(flight.flight_arrivalTime);
        let actualArrivalTime;

        if(arrivalTime.getUTCDate() === departureTime.getUTCDate()){
            console.log("Same Day");
            actualArrivalTime = arrivalTime.getUTCFullYear() + "-" +(arrivalTime.getUTCMonth() + 1) + "-"+ arrivalTime.getUTCDate()+"-"+(arrivalTime.getUTCHours() - 8);
        }else{
            console.log("Different Day -- Add 16 - getUTCDATE()");
            actualArrivalTime = arrivalTime.getUTCFullYear() + "-" +(arrivalTime.getUTCMonth() + 1) + "-"+ (arrivalTime.getUTCDate() - 1)+"-"+(arrivalTime.getUTCHours()+16);
        }
        console.log(actualArrivalTime);

        //Using Mileage Points
        let totalPrice;
        if(useMileage){
            totalPrice = flight.flight_price * seats - mileage;
        }else{
            totalPrice = flight.flight_price * seats;
        }

        console.log("Total Price:",totalPrice);
        //
        
        const data = {
            user_id:localStorage.getItem("id"),
            user_firstname: localStorage.getItem("firstName"),
            user_lastname:localStorage.getItem("lastName"),
            user_email:localStorage.getItem("email"),
            flight_id:flight.flight_id,
            origin:flight.flight_origin,
            destination:flight.flight_destination,
            deparatureTime: actualDeparutreTime,
            arrivalTime: actualArrivalTime,
            noOfSeats:parseInt(seats),
            totalPrice:totalPrice,
            company:flight.flight_company,
            useMileage:useMileage
        }

        console.log(data);

        let response = await axios.post(`${backendServer}/bookflight`,data);

        if(response.status === 200){
            console.log("Flight Booked");
            console.log("Navigate to Success page!");
            history.push({
                pathname:"/success",
                state:{
                    noOfSeats:parseInt(seats),
                    origin:flight.flight_origin,
                    destination:flight.flight_destination,
                    company:flight.flight_company
                }
            });
        }

    }

    useEffect(() => {
        console.log(location.state.flight);
        changeFlight(location.state.flight);
        changeSeats(location.state.seats);
        getUserDetails();
    },[location.state.flight, location.state.seats])

    return (
        <div>
            <NavBar/>
            <Row>
                <Col>
                    <h1>Book Flight</h1>
                </Col>
                <Col xs={6}>
                </Col>
                <Col><h4>Your Mileage Points : {mileage}</h4></Col>
            </Row>

            <Card key={flight.flight_id} style={{ marginBottom: "2rem" }}>
                <Card.Header>Flight ID: {flight.flight_id}</Card.Header>
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
                            <p>Total Price:${flight.flight_price * seats} {useMileage === false ? 
                                null:
                                <p>
                                 - {mileage} = ${flight.flight_price * seats - mileage}
                                 </p>
                            }
                            </p>
                            {/* </span> */}
                            </td>
                            <td>
                                <Form.Check 
                                aria-label="option 1" 
                                label="Use Mileage Points"
                                checked ={useMileage}
                                onChange={(event)=>{
                                    changeUseMileage(!useMileage);
                                }}
                                />
                                    
                            </td>
                            <td>
                            <Button
                                variant="primary"
                                onClick={(event) => {
                                    bookFlight(event);
                                }}
                            >
                                Pay & Confirm
                            </Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <span style={{ textAlign: "start" }}></span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Row>
                <Col></Col>
                <Col>
                    <p>Mileage points: 10% of the total price</p>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default BookPage

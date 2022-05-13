import React from 'react';
import NavBar from './NavBar';
import {useState, useEffect} from 'react';
import {Card, Button, Row, Col, Modal} from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../webConfig.js';


function UserBookings() {

    const[reservations, changeReservations] = useState([]);
    const[mileage, changeMileage] = useState(null);

    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const getReservation = async() =>{
        const data = {
            user_id:localStorage.getItem("id")
        }
        console.log(data);
         let response = await axios.post(`${backendServer}/getreservations`,data);

         if(response.status === 200){
            console.log(response.data.reservation);
            changeReservations(response.data.reservation);
         }
    }

    const cancelBooking =  async(event, reservation) =>{
        
        console.log(reservation);
        event.preventDefault();
        const data = {
            user_id : localStorage.getItem("id"),
            flight_id: reservation.reservation_flightid,
            reservation_id:reservation.reservation_id,
            noOfSeats:reservation.reservation_noofseats,
            totalPrice:reservation.reservation_totalprice
        }
        console.log(data);

        // delete reservation

        let response = await axios.post(`${backendServer}/cancelreservation`, data);

        if(response.status === 200){
            console.log(response.data.message);
            getReservation();
            handleClose();
        }

    }

    useEffect(()=>{
        getUserDetails();
        getReservation();
    },[]);

    return (
        <div>
            <NavBar />
            <Row>
                <Col><h1>All Bookings</h1></Col>
                <Col xs={6}></Col>
                <Col><h4>Your Mileage Points : {mileage}</h4></Col>
            </Row> 
            <br/>
            <Row>
                {
                    reservations.length !== 0 ?
                    reservations.map((reservation)=>{
                        return(
                            <Card key={reservation.reservation_id} style={{ marginBottom: "2rem" }}>
                                <Card.Header>Reservation ID:{reservation.reservation_id}</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                    {reservation.reservation_userfirstname + " " + reservation.reservation_userlastname}
                                    </Card.Title>
                                    <Card.Text>
                                    <table style={{ width: "100%", tableLayout: "fixed" }}>
                                        <tbody>
                                        <tr>
                                            <td style={{ fontSize: "1.2rem" }}>
                                            {reservation.reservation_flightcompany}
                                            <br />
                                            Flight ID:{reservation.reservation_flightid}
                                            </td>
                                            <td style={{ fontSize: "1.2rem" }}>
                                            {reservation.reservation_origin}
                                            </td>
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
                                            <td style={{ fontSize: "1.2rem" }}>
                                            {reservation.reservation_destination}
                                            </td>
                                            <td style={{ fontSize: "1.2rem" }}>
                                            {reservation.reservation_departureTime}
                                            </td>
                                            <td style={{ fontSize: "1.2rem" }}>
                                            {/* <span style={{ float: "right" }}> */}
                                            ${reservation.reservation_totalprice}
                                            {/* </span> */}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <span style={{ textAlign: "start" }}></span>
                                    </Card.Text>
                                    <Button
                                    variant="secondary"
                                    style={{ marginRight: "2rem" }}
                                    onClick={(event)=>{                         
                                        handleShow()
                                    }}
                                    
                                    >
                                    Cancel booking
                                    </Button>

                                    {/* Modal Start */}
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Cancel Booking</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={(event)=>{
                                            cancelBooking(event, reservation);
                                        }}>
                                            Confirm
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    {/*Modal End */}

                                </Card.Body>
                            </Card>
                        )
                    })
                    : <h4>No Bookings</h4>
                }
            </Row>
        </div>
    )
}

export default UserBookings

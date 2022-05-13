import React from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
import NavBar from './NavBar';
import {useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';

function SuccessPage() {

    const location = useLocation();
    const[seats, changeSeats] = useState(1);
    const[origin, changeOrigin] = useState("");
    const[destination, changeDestination] = useState("");
    const[company, changeCompany] = useState("");

    useEffect(()=>{
        changeSeats(location.state.noOfSeats);
        changeOrigin(location.state.origin);
        changeDestination(location.state.destination);
        changeCompany(location.state.company);
    },[location.state.noOfSeats, location.state.origin, location.state.destination, location.state.company]);

    return (
        <div>
            <NavBar />
            <br/>
            <Row>
            <Col></Col>
            <Col xs={8}>
                <Card>
                    <h1>Booking successful!</h1>
                    <hr/>
                    <p>{seats} Tickets from {origin} to {destination} booked via {company}</p>
                    <p>
                        <Button variant="primary">
                        <Link
                            to="/mybookings"
                            style={{ color: "inherit", textDecoration: "inherit" }}
                        >
                            View all bookings
                        </Link>
                        </Button>
                    </p>
                </Card>
            </Col>
            <Col></Col>
            
                
            </Row>
        </div>
    )
}

export default SuccessPage

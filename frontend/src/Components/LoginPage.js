import React from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import backendServer from '../webConfig.js';

function LoginPage() {

    // States 
    const[email, changeEmail] = useState("");
    const[password, changePassword] = useState("");
    const[validationText, changeValidationText] = useState("");

    //routing
    const history = useHistory();

    const handleLogin = async (event) =>{
        event.preventDefault();
        const data = {
            email : email,
            password : password
        }

        try{
            const response =  await axios.post(`${backendServer}/login`, data);
            console.log(response.data);

            if(response.status === 200){
                console.log("Login Successful");
                localStorage.setItem("email",response.data.results[0].user_email);
                localStorage.setItem("id",response.data.results[0].user_id );
                localStorage.setItem("firstName",response.data.results[0].user_firstName);
                localStorage.setItem("lastName",response.data.results[0].user_lastName);
                history.push('/search');
            }

            if(response.status === 209){
                console.log("Wrong Password");
                changeValidationText("Wrong Password!");
            }

            if(response.status === 210){
                console.log("Email Password does not exist!");
                changeValidationText("Email Address does not exist. Signup First!");
            }

        }catch(error){
           console.log(error); 

        }

    }


    return (
        <div>
            <h1>
                Login Page!
            </h1>

                <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Form>                           

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(event)=>{
                                    changeEmail(event.target.value);
                                }} 
                                 />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(event)=>{
                                    changePassword(event.target.value);
                                }}
                                />
                            </Form.Group>

                            <Form.Text className="text-muted">
                            Not user? <Link to="/adminlogin">Admin Login</Link> 
                            </Form.Text>
                            <br/>
                            
                            
                            

                            <Button variant="primary"
                             type="submit"
                             onClick={(event)=>{
                                handleLogin(event);
                             }}
                             >
                                Submit
                            </Button>
                        </Form>
                        <p style={{color:"red"}}>{validationText}</p>
                    
                    </Col>
                    <Col></Col>
                </Row>

                </Container>
        </div>
    )
}

export default LoginPage

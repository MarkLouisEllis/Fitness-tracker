import jwt_decode from "jwt-decode";
import React, { useState,useContext } from 'react';
import { useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {CredentialsContext} from '../App';
import logo from '../mylogo3.png';

import { Container,Navbar,Nav,Button,Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export const handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  };

function Login() {
//React hook useState declarations
const [email, setEmail] =useState('');
const [password, setPassword] =useState(''); 
const [error, setError] =useState(false);
const [credentials,setCredentials] = useContext(CredentialsContext);

//jwt
 const storedJwt = localStorage.getItem('token');
 const [, setJwt] = useState(storedJwt || null);

 //the fetch function is used to send a request tot he login endpoint. The jwt token that is generated when a user logged in is stored to local storage where it will be used 
 // in the activity or admin component to authenticate the user.
 //we extract the state of admin from the jwt token.

const handleLogin = (e)  =>{
    e.preventDefault();
    fetch('/api/signin/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    })
    .then(handleErrors)
    .then((data)=>{
        const token = data.token;
        const decoded = jwt_decode(token);

        //console.log(decoded);
        localStorage.setItem('token', data.token);
        setJwt(data.token);
        setCredentials({
            email,
            name:decoded.name,
            admin:decoded.admin     
        });    
    })
    .then(()=>{
        history.push('/');
    })
    .catch((error)=>{
        console.log('error');
        setError(true);
    })
};

const history = useHistory();
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand><img src={logo} alt='fitness app logo' style={{width:"3cm"}} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link ><Link to = "About">About us</Link></Nav.Link>
                        <Nav.Link >{!credentials && <Link to ="Signup">Signup</Link>}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1>Login</h1>

            <Form id="formName" onSubmit = {handleLogin} >
            <center>
            <Form.Group>
                {error && 'An error occured'}
                <Col xs={3}>
                    <Form.Control placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                </Col>
                <Col xs={3}>
                    <Form.Control placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </Col>  
             </Form.Group>
             </center>
            <Button variant="secondary" type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Login;
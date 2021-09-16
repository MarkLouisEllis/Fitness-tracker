import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import Activities from './Activities';
import Admin from './Admin';
import logo from '../mylogo3.png';

import { Container,Navbar,Nav,Button } from 'react-bootstrap';
//import credentials
import {CredentialsContext} from '../App';

//Here the credentials is checked to create routes to different components. activities component will only be shown if email and password credentials are present and admin = false
//and the admin component will only show if credentials are present and admin = false

//Navbar - the links in the navbar are also shown with regard to credential state. 

function Welcome() {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const logout = () =>{
        setCredentials(null);
    };
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
                        <Nav.Link >{!credentials && <Link to ="Login">Login</Link>}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        {credentials && <Button onClick={logout} variant="danger">Logout</Button>}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <h1>Welcome {credentials && credentials.name}</h1>
            {!credentials && <h1>To the Fitness Tracker app</h1>}
            {credentials  && credentials.admin === false && <Activities />}
            {credentials  && credentials.admin === true && <Admin />}
            {!credentials && <img src={logo} style={{width:"8cm"}}  alt="fitness app logo"/>}
            
        </div>
    );
}

export default Welcome;
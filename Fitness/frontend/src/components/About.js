import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { Container,Navbar,Nav,Card} from 'react-bootstrap';
import {CredentialsContext} from '../App';
import logo from '../mylogo3.png';

function About () {

const [credentials,] = useContext(CredentialsContext);

    return(
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand><img src={logo} alt='fitness app logo' style={{width:"3cm"}}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link ><Link to ="/">Home</Link></Nav.Link>
                        <Nav.Link >{!credentials && <Link to ="Signup">Signup</Link>}</Nav.Link>
                        <Nav.Link >{!credentials && <Link to ="Login">Login</Link>}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
            <br/>
            <Container>
             <Card style={{ width: '25rem' }} id="aboutCard" className="text-center bg-secondary text-white">
                <Card.Img variant="top" src={logo} style={{width:"3cm"}} />
                    <Card.Body>
                        <Card.Title>About us</Card.Title>
                        <Card.Text>
                        Welcome to the fitness tracker app.<br/>
                        This app is desgined to help you keep track of your fitness activities in a quick and easy manner.<br/>
                        We look forward to being a part of a healthier and fitter you.
                        </Card.Text>
                    </Card.Body>
             </Card>
            </Container>
        </div>
    )
}

export default About;
import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {CredentialsContext} from '../App';
import {Link} from 'react-router-dom';
import logo from '../mylogo3.png';
import { Container,Navbar,Nav,Button,Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

//error handler to display generic error message when input of signup fields are incorrect
export const handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  };

function Signup() {

//React hook useState declarations
const [name, setName] =useState('');
const [email, setEmail] =useState('');
const [password, setPassword] =useState('');
const [password2, setPassword2] =useState('');
const [admin,] = useState(false);
const [error, setError] =useState(false);
const [credentials,setCredentials] = useContext(CredentialsContext);

//FEtch function is used with a post request to request signup endpoint. once the user is created the user is redirected to the login page. 

const handleSignup = (e)  =>{
    e.preventDefault();
    fetch('/api/signup/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password,password2,admin})
    })
    .then(handleErrors)
    .then((data)=>{
        setCredentials({
            email  
        });
        history.push('/login');
    })
    .catch((error)=>{
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
                        <Nav.Link >{!credentials && <Link to ="Login">Login</Link>}</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <h1>Create your profile</h1>

            <Form id="formName" onSubmit = {handleSignup} >
            <center>
            <Form.Group>
                <Form.Label><h5>Please create your profile by entering the requested information below.
                <br/>  Click on the submit button when completed</h5></Form.Label>
                <br/>
                {error && 'An error occured'}
                    <Col xs={3}>
                        <Form.Control placeholder="name" onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col xs={3}>
                        <Form.Control placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </Col>
                    <Col xs={3}>
                        <Form.Control placeholder="password (min 6 characters)" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                    <Col xs={3}>
                        <Form.Control placeholder="confirm password" type="password" onChange={(e) => setPassword2(e.target.value)} />
                    </Col>  
             </Form.Group>
             </center>
            <Button variant="secondary" type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Signup;
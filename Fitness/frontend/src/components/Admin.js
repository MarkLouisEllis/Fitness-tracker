import React, { useState,useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Col } from 'react-bootstrap';

function Admin  () {

    //State using useState hook
    const[users,setUsers]= useState([]);
    const [userId,setUserId] = useState('');
    const [name,setUserName] = useState('');
    const [email,setUserEmail] = useState('');
    const [admin,setUserAdmin] = useState('');
    const[,setCounter]= useState('');
    

    //display all users with JWT authentication
    //I encountered a porblem with the useEffect method in that it rerenders everytime the users array updates. Because it calls the request the function continually sees the array
    //as updating. I have not been able to find a good solution for this problem. By removing users in the very bottom(see *** comment) the table in the UI does not automatically update.
    useEffect(()=>{
      
      const token = localStorage.getItem('token');
        fetch('/admin/', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization:` ${token}`
            },
        })
        .then((response) => response.json())
        .then((data) => setUsers(data),setCounter(users.length));

        //*** 
    },[users.length]);

    //delete a user by receiving the userid which is obtained from the UI users table.
    const handleDelete = (e)=>{
      const token = localStorage.getItem('token');
        e.preventDefault();
        fetch("/admin/delete/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization:` ${token}`
            },
        })
        .then(response => {
            return response.json( )
        })
        .then((data) => setUsers(data));
    }

    //update
        //here The fetch method is used to call the api and the PUT method is assigned.
       const handleUpdate =(e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
          fetch("/admin/update/" + userId , {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization:` ${token}`
                  },
                  body: JSON.stringify({name,email,admin }),
              })
              .then(response => {
                  return response.json( )
              })
              .then(data => setUsers(data));
      }

    return (
        <div>

          <h2 id ="header"><center>Users</center></h2>
          <center>
          <Col xs={8}>
            <Table  striped bordered hover variant="secondary" id='adminTable'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Admin</th>
                </tr>
              </thead>
              
              <tbody >
              {users.map((user =>(
                <tr key = {user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user._id}</td>
                  <td>{JSON.stringify(user.admin===true)}</td>
                </tr>
              )))}
              </tbody>
            </Table> 
          </Col>
          </center>
               
           <Form id="formName" onSubmit={handleDelete} >
           <center>
            <Form.Group>
                <Form.Label>Enter ID of the user you want to delete</Form.Label>
                <Col xs={3}>
                <Form.Control type="text" placeholder="Enter ID" onChange={(e) =>setUserId(e.target.value)} value={userId} />
                </Col>
            </Form.Group>
            </center>
            <Button variant="danger" type="submit">Delete</Button>
            </Form>           

            <Form id="formName" onSubmit={handleUpdate} >
            <center>
            <Form.Group>
                <Form.Label>Enter all requested data of the user you want to update</Form.Label>
                <Col xs={3}>
                <Form.Control type="text" placeholder="Enter ID of user to update" onChange={(e) =>setUserId(e.target.value)} value={userId} />
                </Col>
                <Col xs={3}>
                <Form.Control type="text" placeholder="Enter name" onChange={(e) =>setUserName(e.target.value)} value={name} />
                </Col>
                <Col xs={3}>
                <Form.Control type="text" placeholder="Enter Email" onChange={(e) =>setUserEmail(e.target.value)} value={email} />
                </Col>
                <Col xs={3}>
                <Form.Control type="text" placeholder="Admin: enter 'true' or 'false'" onChange={(e) =>setUserAdmin(e.target.value)} value={admin} />
                </Col>
            </Form.Group>
            </center>
            <Button variant="warning" type="submit">Update</Button>
            </Form>   
                
        </div>
    );
};

export default Admin;
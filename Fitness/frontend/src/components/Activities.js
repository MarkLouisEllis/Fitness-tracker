import React, { useState,useContext, useEffect } from 'react';
import {CredentialsContext} from '../App';
import {v4 as uuidv4} from 'uuid';
//bootsrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container,Tabs,Tab } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


function Activities() {

    //State using useState hook
    const[activities, setActivities] = useState([]);
    const[activityText, setActivityText]= useState('');
    const[activityType, setActivityType]= useState('');
    const[activityDur,setActivityDur]= useState('');
    const[credentials] = useContext(CredentialsContext);
    const[counter,setCounter]= useState('');

    //add activity with jwt token auth and also trigger when an activity is deleted. 
    const persist = (newActivities) =>{
        const token = localStorage.getItem('token');
        const email = credentials.email;
        
        fetch('/activity/add', {  
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization:` ${token}`
            },
            body: JSON.stringify({newActivities,email})
        })
        
    };

    //display activity list with email auth and rerender each time when activities array updates from add or delete.
    useEffect(()=>{
        const token = localStorage.getItem('token');
        
        fetch('/activity/', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization:` ${token}`
            },
        })
        .then((response) => response.json())
        .then((activities) => setActivities(activities),setCounter(activities.length));
       
    },[activities.length]);
    
    //The array is updated or changed in the react fucntion. Following are all handlers to update the array in the desired way.
    //add activity by creating new activity with unique id,text,type and duration. Activuty is added to activity array and pushed to tthe presist function which ads the updated array
    //to the database
    const addActivity = (e)=>{
        e.preventDefault();
        if(!activityText) return;
        const newActivity = {id: uuidv4() ,text:activityText,type:activityType,duration:activityDur};
        const newActivities = [...activities, newActivity];
        setActivities(newActivities);
        setCounter(newActivities.length)
        setActivityText('');
        setActivityType('');
        setActivityDur('');
        //setCounter(activities.length)
        persist(newActivities);
    }
  
    //delete activity - a new array is created named new activitylist and populated by the activites array. Create a new var actitivtyitem with an activty.id to taget specific activity.
    //
    const deleteActivity = (id) =>{
        const newActivityList=[...activities];
        const activityItem = newActivityList.find((activity) => activity.id === id);
        for (let i = newActivityList.length - 1; i >= 0; --i) {
            if (newActivityList[i].id === activityItem.id) {
                newActivityList.splice(i,1);
            }
        }
        setActivities(newActivityList);
        setCounter(newActivityList.length)
        persist(newActivityList);
    }

    const activityTypes = [
        'Run',
        'Ride',
        'Yoga',
        'Swim',
    ];
    
    //the activityOptions var is a options menu which is populated by the map function which itterates through the activityTypes array. 
    const activityOptions = activityTypes.map(media => (
        <option value={media} label={media} key={media} />   
    ));

    return (
        <div>
            <h1>Activities</h1>

            <Container >
                <Form id="formName" onSubmit={addActivity} >
                    <Form.Group>
                        <Form.Label>Please complete the form below to submit an activity:</Form.Label>
                                <h5>Enter description:</h5>
                                <Form.Control type="text" placeholder = 'description...' onChange={(e) =>setActivityText(e.target.value)} value={activityText}  />
                                <h5>Select activity type:</h5>
                                <Form.Control as="select" className="my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={(e) =>setActivityType(e.target.value)} value={activityType} >
                                {activityOptions}
                                </Form.Control>
                                <h5>Enter activity duration:</h5>
                                <Form.Control type="text" className="my-1 mr-sm-2"  placeholder = 'Please enter duration in total min eg. 120' 
                                              onChange={(e) =>setActivityDur(e.target.value)} value={activityDur} />            
                    </Form.Group>
                    <Button variant="dark" type="submit">Add activity</Button>    
                </Form>
        
        <h1 id ="header"><center>Activity Stats</center></h1>
        <br/>
        <Tabs defaultActiveKey="all" className="mb-3" id="tabs" >
            <Tab eventKey="all" title="All">
            <Table striped bordered hover variant="secondary" id='activityTable'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Delete</th>
            </tr>
          </thead>   
          <tbody  >
            {activities.map((activity) =>(
              <tr key = {activity.id}  >
                <td>{activity.text}<br/></td>
                <td>{activity.type}</td> 
                <td>{activity.duration} minutes</td> 
                <td><Button variant="danger" onClick = {() => deleteActivity(activity.id)}>X</Button></td>
              </tr> 
              ))}
            </tbody>   
        </Table> 
            </Tab>
                <Tab eventKey="activity count" title="Activity Count" >
                    <Table Table striped bordered hover variant="secondary">
                        <thead>
                            <th>Your activity count:</th>
                        </thead>
                        <tbody  >
                        <tr>
                            <td>{counter}</td>
                        </tr> 
                    </tbody> 
                    </Table>   
                </Tab>
            </Tabs>
        </Container>
        </div>  
    );
}

export default Activities;
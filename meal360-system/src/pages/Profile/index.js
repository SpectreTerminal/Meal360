import { Container, Card } from "react-bootstrap";
import AppNavbar from "../../components/navbar";
import { store } from '../Login'
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const email = store.useState('email')[0]

  //initialize display variable states
  const [sdiet, setDiet] = useState("");
  const [scalories, setCalories] = useState("");
  const [sexclude, setExclude] = useState([""]);

  //function to retrieve and display diet preferences
  function setDisplay() {
    const data = { 'email': email };
    const response = fetch('/retrievePrefs', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setDiet(data.preferences.diet)
      setCalories(data.preferences.targetCalories)
      setExclude(data.preferences.exclude.join(", "))
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  };

  // called once on load, sets the display of diet preferences
  useEffect(() => {
    setDisplay();
  }, []);

  return (<>
    <AppNavbar active={'profile'}/>
    <br/>
    <Container>
      <h1 className="text-secondary">Profile</h1>
      <strong>Email: </strong>
      {email}
      <br/><br/>

      <Card className='w-50 p-3 mb-4'>
        <Card.Title>Your Preferences</Card.Title>
        <Card.Body className="">
          <p><b>Diet:</b> {sdiet}</p>
          <p><b>Target Calories:</b> {scalories}</p>
          <p><b>Excluded Ingredients:</b><br></br> {sexclude}</p>
        </Card.Body>
      </Card>
    </Container>
  </>)
}
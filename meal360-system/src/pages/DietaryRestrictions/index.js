import { Button, Container, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbar";
import { store } from "../Login/index";

export default function DietaryRestrictionsPage() {
  const globEmail = store.useState("email")[0];

  //initialize display variable states
  const [displayDiet, setDisplayDiet] = useState("");
  const [displayCalories, setDisplayCalories] = useState("");
  const [displayExclude, setDisplayExclude] = useState([""]);
  const [displayName, setDisplayName] = useState(""); 
  const [name, setName] = useState(""); 
  const [diet, setDiet] = useState("No Diet"); 
  const [calories, setCalories] = useState(""); 
  const [exclude, setExclude] = useState([""]); 

  //function to retrieve and display diet preferences
  function setDisplay() {
    const data = { 'email': globEmail };
    const response = fetch('/retrievePrefs', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setDisplayDiet(data.preferences.diet)
      setDisplayCalories(data.preferences.targetCalories)
      setDisplayExclude(data.preferences.exclude.join(", "))
      setDiet(data.preferences.diet)
      setCalories(data.preferences.targetCalories)
      setExclude(data.preferences.exclude.join(", "))
    })
    .catch(error => {
      console.log('Error: ', error); 
    })

    const response2 = fetch('/getName', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setDisplayName(data.name)
      setName(data.name)
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  };

  //called when apply is clicked, 
  async function handleApply() {
    // api call to update name
    const nameData = { 'email': globEmail, 'name': name }
    const r = await fetch('/update', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nameData), 
    })
    .then(response => response.json())
    .then(data => {
      setDisplayName(name)
    })
    .catch((error) => {
      console.error('Error (name):', error);
    }); 

    //api call to set dietary preferences
    const data = { 'email': globEmail, 
                    'params': {
                      'email': globEmail,
                      'diet': diet,
                      'exclude': exclude,
                      'targetCalories': calories,
                    },
                 };

    const response = await fetch('/setPrefs', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Profile has been updated.');
      setDisplayDiet(diet); setDisplayExclude(exclude); setDisplayCalories(calories)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //updates form values on change
  function updateDiet(event) {
    setDiet(event.target.value)
  }

  function updateCalories(event) {
    setCalories(event.target.value)
  }

  function updateExclude(event) {
    setExclude(event.target.value.split(', '))
  }

  const updateName = e => setName(e.target.value)

  // called once on load, sets the display of diet preferences
  useEffect(() => {
    setDisplay();
  }, []);

  return (<>
    <AppNavbar active={'dietaryRestrictions'}/>
    <br/>
    <Container>
      <h1 className="text-secondary">Profile</h1>

      <Card className='w-50 p-3 mb-4'>
        <Card.Title>Basic Info</Card.Title>
        <Card.Body>
        <p><b>Email:</b> {globEmail}</p>
        <p><b>Name:</b> {displayName}</p>
        </Card.Body>
        <Card.Title>Dietary Preferences</Card.Title>
        <Card.Body className="">
          <p><b>Diet:</b> {displayDiet}</p>
          <p><b>Target Calories:</b> {displayCalories}</p>
          <p><b>Excluded Ingredients:</b><br></br> {displayExclude}</p>
        </Card.Body>
      </Card>

      <Card className='w-50 p-3'>
        <Card.Title>Edit</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control defaultValue={name} onChange={updateName}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Diet</Form.Label>
            <Form.Select defaultValue={displayDiet} value={diet} aria-label="Default select example" onChange={updateDiet}>
              <option value="No Diet">No Diet</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Paleo">Paleo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Target Calories</Form.Label>
            <Form.Control defaultValue={displayCalories} onChange={updateCalories}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Exclude Ingredients</Form.Label>
            <Form.Control defaultValue={displayExclude} onChange={updateExclude}/>
          </Form.Group>

          <Button variant='primary' onClick={()=>handleApply()}>Apply</Button>
        </Form>
      </Card>
    </Container>

  </>)
}
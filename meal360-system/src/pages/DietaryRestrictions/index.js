import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import AppNavbar from "../../components/navbar";

export default function DietaryRestrictionsPage() {
  let diet = "No Diet";
  let calories = "3000";
  let exclude = [""];

  async function handleApply() {
    console.log('apply');
    const data = { 'email': "green@gmail.com", 
                    'params': {
                      'email': "green@gmail.com",
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
      alert('Preferences are set.');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function updateDiet(event) {
    diet = event.target.value
  }

  function updateCalories(event) {
    calories = event.target.value
  }

  function updateExclude(event) {
    exclude = event.target.value.split(', ');
  }

  return (<>
    <AppNavbar active={'dietaryRestrictions'}/>

  <Container>
    <h1 className="text-secondary">Dietary Restrictions</h1>
    <Card className='w-50 p-3'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Diet</Form.Label>
          <Form.Select aria-label="Default select example" onChange={updateDiet}>
            <option value="no-diet">No Diet</option>
            <option value="vege">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pesc">Pescetarian</option>
            <option value="keto">Ketogeic</option>
            <option value="paleo">Paleo</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Target Calories</Form.Label>
          <Form.Control defaultValue={calories} onChange={updateCalories}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Exclude Ingredients</Form.Label>
          <Form.Control defaultValue={exclude} onChange={updateExclude}/>
        </Form.Group>


        <Button variant='primary' onClick={()=>handleApply()}>Apply</Button>
      </Form>
    </Card>
  </Container>

  </>)
}
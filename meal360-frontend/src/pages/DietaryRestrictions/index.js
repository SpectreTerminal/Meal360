import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import AppNavbar from "../../components/navbar";

var calorieValue

function CalorieRange(event) {
    console.log(event.target.value)
    calorieValue = event.target.value
} 

export default function DietaryRestrictionsPage() {
  var calorieValue = 0

  return (<>
    <AppNavbar active={'dietaryRestrictions'}/>

  <Container>
    <h1 className="text-secondary">Dietary Restrictions</h1>
    <Card className='w-50 p-3'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Diet</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="1">No Diet</option>
            <option value="2">Vegetarian</option>
            <option value="3">Vegan</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Calories</Form.Label>
          <Form.Control aria-label="Amount (to the nearest dollar)" />
        </Form.Group>
        <Link to='/'>
          <Button variant='primary' type='submit'>Apply</Button>
        </Link>
      </Form>
    </Card>
  </Container>

  </>)
}
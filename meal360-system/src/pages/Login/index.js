import { Button, Navbar, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



export default function LoginPage() {
  let email = "";
  let password = "";
  let logSuccess = false;
  //const navigate = useNavigate();

  async function handleLogIn() {
    console.log('login');
    const data = { 'email': email, 'password': password };
    const response = await fetch('/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.status) {
        logSuccess = true;
      } else {
        alert("Invalid Login");
      };
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    if (logSuccess) {
      //navigate('/');
    }
  }

  async function handleCreateAccount() {
    const data = { 'email': email, 'password': password };
    const response = await fetch('/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert("New account created");
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    console.log(response);
  }

  function updateEmail(event) {
    email = event.target.value
  }

  function updatePassword(event) {
    password = event.target.value
  }


  return (<>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#">Meal360</Navbar.Brand>
      </Container>
    </Navbar>
    
    <Container>
    <h1 className="text-secondary">Login / Create Account</h1>
    <Card className='w-50 p-3'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={updateEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={updatePassword}/>
        </Form.Group>
        <Button variant='primary' type='submit' onClick={()=>handleLogIn()}>Login</Button>
        <Button className='m-1' variant='primary' onClick={()=>handleCreateAccount()}>Create Account</Button>
      </Form>
    </Card>
    </Container></>


  )
}
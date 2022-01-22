import { Button, Navbar, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

//import { authenticateUser } from '../../backend/loginBackend.js'
//Test 

export default function LoginPage() {

  let email = "";
  let password = "";
  function handleLogIn() {
    console.log(email)
    console.log(password)
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
        <Link to='/'>
          <Button variant='primary' type='submit' onClick={()=>handleLogIn()}>Login</Button>
        </Link>
        <Link to='/'>
          <Button className='m-1' variant='primary'>Create Account</Button>
        </Link>
      </Form>
    </Card>
    </Container></>


  )
}
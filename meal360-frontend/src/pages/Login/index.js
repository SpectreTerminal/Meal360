import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginPage() {
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
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Link to='/'>
          <Button variant='primary' type='submit'>Login</Button>
        </Link>
        <Link to='/'>
          <Button className='m-1' variant='primary'>Create Account</Button>
        </Link>
      </Form>
    </Card>
    </Container></>


  )
}
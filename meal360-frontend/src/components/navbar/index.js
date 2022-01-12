import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar({active}) {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link to='/'>
          <Navbar.Brand href="#">Meal360</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Link to='/profile' className="nav-link">
            Profile
          </Link>
          <Link to='/dietaryRestrictions' className="nav-link">
            Dietary Restrictions
          </Link>
          <Link to='/weeklyMealPlan' className="nav-link">
            Weekly Meal Plan
          </Link>
          <Link to='/mealHistory' className="nav-link">
            Meal History
          </Link>
          <Link to='/login' className="nav-link">
            Logout
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
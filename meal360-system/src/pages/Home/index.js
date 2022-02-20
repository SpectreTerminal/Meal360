import { Container } from "react-bootstrap";
import AppNavbar from "../../components/navbar"

export default function HomePage() {
  let logSuccess = true;
  return (<>
    <AppNavbar />
    <br/><br/>
    <Container>
      <h2>Welcome to Meal360! Get started by clicking one of the menu items above.</h2>
    </Container>
  </>
  )
}
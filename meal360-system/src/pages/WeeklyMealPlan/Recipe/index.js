import { useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../../components/navbar";

export default function RecipePage() {
  const location = useLocation()
  const { meal } = location.state
  return (<>
    <AppNavbar />
    <br />
    <Container>
      <Link to='/weeklyMealPlan'>
        <Button size='sm' variant='secondary'>Back to Weekly Meal Plan</Button>
      </Link>
      <h1 className="text-secondary">Recipe: {meal.name}</h1>
      <strong>Calories: {meal.calories}</strong>
      <h3>Ingredients</h3>
      <ul>
        {meal.ingredients.map(ingredient => (
          <li>{ingredient}</li>
        ))}
      </ul> 
      <h3>Instructions</h3>
      <ol>
        {meal.instructions.map(instruction => (
          <li>{instruction}</li>
        ))}
      </ol>
    </Container>
  </>)
}
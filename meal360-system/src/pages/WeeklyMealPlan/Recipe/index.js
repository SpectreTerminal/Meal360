import { useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../../components/navbar";
import { useEffect, useState  } from "react";
import { ListGroup, Table } from "react-bootstrap";

export default function RecipePage() {
  const location = useLocation()
  const { meal } = location.state

  const [recipeInfo, setRecipeInfo] = useState(false)

  useEffect(() => {
    const response = fetch('/getRecipeInfo', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: meal.id})
    })
    .then(response => response.json())
    .then(data => {
      saveRecipeInfo(data)
    })
    .catch(error => {
      console.log('Error: ', error)
    })
  }, [])

  const saveRecipeInfo = data => {
    data = data.recipeDetails
    const r = {}
    r.attributes = []
    if (data.dairyFree) r.attributes.push('Dairy Free')
    if (data.glutenFree) r.attributes.push('Gluten Free')
    if (data.vegan) r.attributes.push('Vegan')
    if (data.vegetarian) r.attributes.push('Vegetarian')
    r.instructions = data.analyzedInstructions
    r.image = data.image
    r.ingredients = data.extendedIngredients
    r.nutrition = data.nutrition
    r.pricePerServing = data.pricePerServing
    r.readyInMinutes = data.readyInMinutes
    r.servings = data.servings
    setRecipeInfo(r)
  }

  return (<>
    <AppNavbar />
    <br />
    <Container>
      <Link to='/weeklyMealPlan'>
        <Button size='sm' variant='secondary'>Back to Weekly Meal Plan</Button>
      </Link>
      <h1 className="text-secondary">Recipe: {meal.title}</h1>

      {recipeInfo == false ? <></> : 
        <>
        {/* brief info */}
        <p>
          <strong>{recipeInfo.servings} servings &emsp; Ready in {recipeInfo.readyInMinutes} minutes</strong>
        </p>

        {/* attributes */}
        <ListGroup horizontal>
          {recipeInfo.attributes.map((a, i) => <ListGroup.Item key={i}>
            {a}
          </ListGroup.Item>)}
        </ListGroup><br/>

        {/* image */}
        <img src={recipeInfo.image} /><br/><br/>

        {/* ingredients */}
        <h3>Ingredients</h3>
        <ul>
          {recipeInfo.ingredients.map((ing, i) => (
            <li key={i}>{ing.measures.metric.amount} {ing.measures.metric.unitShort} {ing.nameClean}</li>
          ))}
        </ul>

        {/* instructions */}
        <h3>Instructions</h3>
        <ol>
          {recipeInfo.instructions[0].steps.map((ins, i) => (
            <li key={i}>{ins.step}</li>
          ))}
        </ol>

        {/* nutrition info */}
        <h3>Nutrition Info</h3>
        <h5>Caloric Breakdown</h5>
        <Table bordered size="sm" style={{width: '50%'}}>
          <tbody>
            <tr>
              <td>Percent Carbs</td>
              <td>{recipeInfo.nutrition.caloricBreakdown.percentCarbs}</td>
            </tr>
            <tr>
              <td>Percent Fat</td>
              <td>{recipeInfo.nutrition.caloricBreakdown.percentFat}</td>
            </tr>
            <tr>
              <td>Percent Protein</td>
              <td>{recipeInfo.nutrition.caloricBreakdown.percentProtein}</td>
            </tr>
          </tbody>
        </Table>

        <h5>Nutrients</h5>
        <Table striped bordered size="sm" style={{width: '50%'}}>
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recipeInfo.nutrition.nutrients.map((n, i) => (
              <tr key={i}>
                <td>{n.name}</td>
                <td>{n.amount} {n.unit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      }    
    </Container>
  </>)
}
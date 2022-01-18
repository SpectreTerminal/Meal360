import { Button, Container, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbar";

export default function MealHistoryPage() {

const meals = [
    {
      dayOfWeek: 'Sunday',
      date: 'January 16, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    },
    {
      dayOfWeek: 'Monday',
      date: 'January 17, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    },
    {
      dayOfWeek: 'Tuesday',
      date: 'January 18, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    },
    {
      dayOfWeek: 'Wednesday',
      date: 'January 19, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    },
    {
      dayOfWeek: 'Thursday',
      date: 'January 20, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    },
    {
      dayOfWeek: 'Friday',
      date: 'January 20, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    },
    {
      dayOfWeek: 'Saturday',
      date: 'January 21, 2022',
      breakfast: {
        name: 'Omellete',
        calories: 50,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      lunch: {
        name: 'Chickpea and Seeds Sandwich',
        calories: 220,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
      dinner: {
        name: 'Shrimp Scampi',
        calories: 250,
        ingredients: ['4 eggs', '1 tsp milk', 'pinch of salt', '1 tsp black pepper', '1 tbsp oil or butter'],
        instructions: [
          'In a small bowl, break the eggs and pour the yolk and eggwhites.',
          'Add milk. This will make your omellete puffier.',
          'Add salt.',
          'Add black pepper',
          'Using a whisk or a fork, mix all the ingredients in the bowl.',
          'Heat up a pan and add oil or butter.',
          'Add the egg mixture to the pan. Let it heat up for 3-4 min.',
          'Serve.'
        ]
      }, 
    }
  ]


  return (<>
    <AppNavbar active={'mealHistory'}/>

<Container>
    <h1 className="text-secondary">Meal History</h1>

        {meals.map(meal => (<Col sm>

          <Link to='/recipe' 
            style={{textDecoration: 'none', color: 'inherit'}}
            state={{ meal: meal.breakfast }}  
          >
            <Card style={{width: '15rem'}}>
              <Card.Body>
                <Card.Title>{meal.breakfast.name}</Card.Title>
                <Card.Subtitle>Breakfast</Card.Subtitle>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/recipe' 
            style={{textDecoration: 'none', color: 'inherit'}}
            state={{ meal: meal.lunch }}  
          >
            <Card style={{width: '15rem'}}>
              <Card.Body>
                <Card.Title>{meal.lunch.name}</Card.Title>
                <Card.Subtitle>Lunch</Card.Subtitle>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/recipe' 
            style={{textDecoration: 'none', color: 'inherit'}}
            state={{ meal: meal.dinner }}  
          >
            <Card style={{width: '15rem'}}>
              <Card.Body>
                <Card.Title>{meal.dinner.name}</Card.Title>
                <Card.Subtitle>Dinner</Card.Subtitle>
              </Card.Body>
            </Card>
          </Link>
        </Col>))}

  </Container>


  </>)
}
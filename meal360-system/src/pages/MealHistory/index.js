import { Button, Container, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbar";
import { useEffect, useState } from "react";

export default function MealHistoryPage() {

  const [meals, setMealHistory] = useState([])

  useEffect(() => {
    // timeFrame, diet, exclude, targetCalories
    console.log("hi");
    const data = { 'attributes': "1",
                    'operators': '2',
                    'values': '3',
                  };

    const response = fetch('/getMealHist', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      getMealHistory(data);
      console.log("yo");
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  }, [])

  const getMealHistory = data => {
    const mH = []

    setMealHistory(mH)
  }

  return (<>
    <AppNavbar active={'mealHistory'}/>
    <br />
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
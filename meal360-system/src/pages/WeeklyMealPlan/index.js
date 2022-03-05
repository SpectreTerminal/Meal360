import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { store } from '../Login'

export default function WeeklyMealPlanPage() {

  const [mealplan, setMealplan] = useState([])
  const email = store.useState('email')[0]

  useEffect(() => {
    const data = {
      'email': email
    }

    const response = fetch('/genNewMP', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      saveMealPlan(data);
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  }, [])

  const saveMealPlan = data => {
    const mp = []
    mp.push({'day': 'Sunday', 'meals': data.mealplan.meals.week.sunday.meals})
    mp.push({'day': 'Monday', 'meals': data.mealplan.meals.week.monday.meals})
    mp.push({'day': 'Tuesday', 'meals': data.mealplan.meals.week.tuesday.meals})
    mp.push({'day': 'Wednesday', 'meals': data.mealplan.meals.week.wednesday.meals})
    mp.push({'day': 'Thursday', 'meals': data.mealplan.meals.week.thursday.meals})
    mp.push({'day': 'Friday', 'meals': data.mealplan.meals.week.friday.meals})
    mp.push({'day': 'Saturday', 'meals': data.mealplan.meals.week.saturday.meals})
    setMealplan(mp)
  }

  return (<>
    <AppNavbar active={'weeklyMealPlanPage'}/>
    <br/>
    <Container>
      <h1 className="text-secondary">Weekly Meal Plan</h1>
      <Row>
        {mealplan.map(day => (<Col sm key={day.day}>
          <Card style={{width: '15rem'}}>
            <Card.Body>
              <Card.Title className="text-primary">{day.day}</Card.Title>
              {/* <Card.Subtitle>{meal.date}</Card.Subtitle> */}
            </Card.Body>
          </Card>
          <Link to='/recipe' 
            style={{textDecoration: 'none', color: 'inherit'}}
            state={{ meal: day.meals[0] }}  
          >
            <Card style={{width: '15rem'}}>
              <Card.Body>
                <Card.Title>{day.meals[0].title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/recipe' 
            style={{textDecoration: 'none', color: 'inherit'}}
            state={{ meal: day.meals[1] }}  
          >
            <Card style={{width: '15rem'}}>
              <Card.Body>
                <Card.Title>{day.meals[1].title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          <Link to='/recipe' 
            style={{textDecoration: 'none', color: 'inherit'}}
            state={{ meal: day.meals[2] }}  
          >
            <Card style={{width: '15rem'}}>
              <Card.Body>
                <Card.Title>{day.meals[2].title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>))}
      </Row>
    </Container>
  </>)
}
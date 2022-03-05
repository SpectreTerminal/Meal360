import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbar";
import React, { useEffect, useState } from "react";
import { store } from '../Login'

export default function WeeklyMealPlanPage() {

  const [mealplan, setMealplan] = useState([])
  const [completed, setCompleted] = useState({
    Sunday: false, 
    Monday: false, 
    Tuesday: false, 
    Wednesday: false, 
    Thursday: false, 
    Friday: false, 
    Saturday: false
  })
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
    const meals = data.mealplan.meals.week
    if (meals.sunday) mp.push({'day': 'Sunday', 'meals': meals.sunday.meals})
    if (meals.monday) mp.push({'day': 'Monday', 'meals': meals.monday.meals})
    if (meals.tuesday) mp.push({'day': 'Tuesday', 'meals': meals.tuesday.meals})
    if (meals.wednesday) mp.push({'day': 'Wednesday', 'meals': meals.wednesday.meals})
    if (meals.thursday) mp.push({'day': 'Thursday', 'meals': meals.thursday.meals})
    if (meals.friday) mp.push({'day': 'Friday', 'meals': meals.friday.meals})
    if (meals.saturday) mp.push({'day': 'Saturday', 'meals': meals.saturday.meals})
    setMealplan(mp)
  }

  const dayCompleted = day => {
    setCompleted(completed => ({...completed, [day]: true}))
  }

  const markDayAsComplete = day => {
    const data = {
      email, 
      day: day.toLowerCase()
    }
    const response = fetch('/delMealDay', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data.result == 'success') dayCompleted(day)
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  }

  return (<>
    <AppNavbar active={'weeklyMealPlanPage'}/>
    <br/>
    <Container>
      <h1 className="text-secondary">Weekly Meal Plan</h1>
      <Row>
        {mealplan.map(day => (
        completed[day.day] ? <React.Fragment key={day.day}></React.Fragment> : 
        <Col sm key={day.day}>
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
          <Card style={{width: '15rem'}}><Button 
            variant="primary"
            onClick={() => markDayAsComplete(day.day)}
            >
            Mark as complete
          </Button></Card>
          
        </Col>
        ))}
      </Row>
    </Container>
  </>)
}
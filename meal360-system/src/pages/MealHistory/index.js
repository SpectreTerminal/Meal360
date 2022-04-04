import { Button, Container, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { store } from "../Login/index";

export default function MealHistoryPage() {
  const globEmail = store.useState("email")[0];
  const [meals, setMealHistory] = useState([]);

  useEffect(() => {
    // timeFrame, diet, exclude, targetCalories
    const data = { 'attributes': ["email"],
                    'operators': ["=="],
                    'values': [globEmail],
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
      getMealHistory(data.history[0].mealData);
      console.log(data.history[0].mealData);
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  }, [])

  const getMealHistory = data => {
    const mH = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        console.log('day ' + key);
        console.log(data[key].meals);
        mH.push({'day': key, 'meals': data[key].meals});
      }
    }
    setMealHistory(mH)
  }

  const deleteMealHistory = day => {
    const data = { 'attributes': ["email"],
                    'operators': ["=="],
                    'values': [globEmail, day],
                  };

    const response = fetch('/delMealHist', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('deleted history');
    })
    .catch(error => {
      console.log('Error: ', error); 
    })

    let mH = meals;
    let mH2 = mH.filter((item) => item.day !== day);

    setMealHistory(mH2);
  }

  return (<>
    <AppNavbar active={'mealHistory'}/>
    <br />
    <Container>
      <h1 className="text-secondary">Meal History</h1>

        {meals.map(day => (<Col sm key={day.day}>
          <br />
          <Card style={{width: '15rem', display: 'none'}}>
            <Card.Body>
              <Card.Title className="text-primary">{day.day}</Card.Title>
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
            onClick={() => deleteMealHistory(day.day)}
            >
            Delete
          </Button></Card>
        </Col>))}
    </Container>


  </>)
}
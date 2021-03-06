import { Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProfilePage from '../pages/Profile';
import WeeklyMealPlanPage from '../pages/WeeklyMealPlan';
import MealHistoryPage from '../pages/MealHistory';
import RecipePage from '../pages/WeeklyMealPlan/Recipe';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/weeklyMealPlan' element={<WeeklyMealPlanPage />} />
      <Route path='/mealHistory' element={<MealHistoryPage />} />
      <Route path='/recipe' element={<RecipePage />} />
    </Routes>
  )
}
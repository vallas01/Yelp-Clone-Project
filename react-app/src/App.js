import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ReviewForm from './components/reviews/newReviewForm';
import Review from './components/reviews/Review';
import RestaurantForm from './components/Restaurants/NewRestaurant/NewRestaurantForm';
import Restaurants from './components/Restaurants/Restaurants/Restaurants';
import SingleRestaurant from './components/Restaurants/SingleRestaurant/SingleRestaurant';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/new-restaurant' exact={true}>
          <RestaurantForm />
        </ProtectedRoute>
        <ProtectedRoute path='/restaurants/:restaurantId' exact={true}>
          <SingleRestaurant />
        </ProtectedRoute>
        <ProtectedRoute path='/restaurants' exact={true}>
          <Restaurants />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
          <Restaurants to='/restaurants'/>
        </Route>
        <Route path='/new-review' exact={true}>
          <ReviewForm />
        </Route>
        <Route path='/review' exact={true}>
          <Review />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

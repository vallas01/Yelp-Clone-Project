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
import NewImage from './components/Images/NewImage';
import Technology from './components/Footer/Technology';
import About from './components/Footer/About';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import EditReview from './components/reviews/editReview';

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

        <Route path='/restaurants/:restaurantId' exact={true}>
          <SingleRestaurant />
        </Route>

        <Route path='/restaurants' exact={true}>
          <Restaurants />
        </Route>

        <Route path='/users' exact={true} >
          <UsersList />
        </Route>

        <Route path='/users/:userId' exact={true} >
          <User />
        </Route>

        <Route path='/' exact={true} >
          <HomePage />
        </Route>

        <ProtectedRoute path='/restaurants/:restaurantId/new-image' exact={true} >
          <NewImage />
        </ProtectedRoute>

        <ProtectedRoute path='/new-review/:restaurantId' exact={true}>
          <ReviewForm />
        </ProtectedRoute>

        <ProtectedRoute path='/new-image/:restaurantId' exact={true}>
          <NewImage />
        </ProtectedRoute>

        <Route path='/review' exact={true}>
          <Review />
        </Route>

        <Route path='/edit-review/:reviewId' exact={true}>
          <EditReview />
        </Route>

        <Route exact path="/technology">
          <Technology />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

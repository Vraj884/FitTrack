import './App.css';
import Login from './Component/Login'
import SignUp from './Component/Signup';
import Home from './Component/Home';
import Nav from './Component/Nav';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OurTools from './Component/OurTools';
import Cart from './Component/Cart.jsx';
import BMICalculator from './Component/BMICalculator';
import store from './RTK/store';
import { Provider } from 'react-redux';
import Profile from './Component/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './RTK/userSlice.js'
import ReadData from './Component/ReadData.jsx';
import WalkingCaloriesCalculator from './Component/WalkingCaloriesCalculator.jsx';
import RopeJumpingCaloriesCalculator from './Component/RopeJumpingCaloriesCalculator.jsx';
import SwimmingCaloriesCalculator from './Component/SwimmingCaloriesCalculator.jsx';
import CardioCaloriesCalculator from './Component/CardioCaloriesCalculator.jsx';
import MuscleTrainingCaloriesCalculator from './Component/MuscleTrainingCaloriesCalculator.jsx';
import Footer from './Component/Footer.jsx';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Nav /><Home /><Footer/></>
    },
    {
      path: '/cardio',
      element: <><Nav /><CardioCaloriesCalculator /></>
    },
    {
      path: '/muscle',
      element: <><Nav /><MuscleTrainingCaloriesCalculator /></>
    },
    {
      path: '/PastData',
      element: <><Nav /><ReadData/></>
    },
    {
      path: '/BMI',
      element: <><Nav /><BMICalculator/></>
    },
    {
      path: '/walking',
      element: <><Nav /><WalkingCaloriesCalculator/></>
    },
    {
      path: '/Login',
      element: <><Nav /><Login /></>
    },
    {
      path: '/Signup',
      element: <><Nav /><SignUp /></>
    },
    {
      path: '/ourtools',
      element: <><Nav /><OurTools /></>
    },
    {
      path: '/Profile',
      element: <><Nav /><Profile /></>
    },
    {
      path: '/TrackMyData',
      element: <><Nav/><Cart/></>
    },
    {
      path: '/rope',
      element: <><Nav/><RopeJumpingCaloriesCalculator/></>
    },
    {
      path: '/swim',
      element: <><Nav/><SwimmingCaloriesCalculator/></>
    }
  ])
  return (
    <Provider store={store}>
      <div className="App  ">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}
export default App;
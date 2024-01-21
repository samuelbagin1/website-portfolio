import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Contact from './Contact';
import Portfolio from './Portfolio';
import Skills from './Skills';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },

  {
    path: "/portfolio",
    element: <Portfolio />,
  },

  {
    path: "/skills",
    element: <Skills />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


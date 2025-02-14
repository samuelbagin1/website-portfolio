import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Contact from './Contact';
import Portfolio from './Portfolio';
import Skills from './Skills';

import Develop from './subpages/Develop'
import Graphic from './subpages/Graphic'
import Photo from './subpages/Photo'
import Video from './subpages/Video'

import Upload from './subpages/Upload'


import {
  createBrowserRouter,
  RouterProvider,
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

  {
    path: "/portfolio/develop",
    element: <Develop />,
  },

  {
    path: "/portfolio/graphic",
    element: <Graphic />,
  },

  {
    path: "/portfolio/photo",
    element: <Photo />,
  },

  {
    path: "/portfolio/video",
    element: <Video />,
  },

  {
    path: "/upload",
    element: <Upload />,
  },
]);

// In your main index.js file
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(estimate => {
    console.log('Storage estimate:', estimate);
  });
}

// Set SameSite cookie attribute
document.cookie = `session=YOUR_SESSION_ID; Secure; SameSite=None; Path=/`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);


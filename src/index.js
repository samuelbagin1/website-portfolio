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

import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const client = new ApolloClient({
  url: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client} >
    <RouterProvider router={router} />
  </ApolloProvider>
);


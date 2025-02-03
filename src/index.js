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

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
});



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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client} >
    <RouterProvider router={router} />
  </ApolloProvider>
);


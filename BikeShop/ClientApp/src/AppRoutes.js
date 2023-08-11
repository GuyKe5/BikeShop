import React, { useState, useEffect } from 'react';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { HomePage } from "./components/HomePage";
import { OrderPage } from "./components/OrderPage";
 
const AppRoutes = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  //{
  //  path: '/fetch-data',
  //  element: <FetchData />
  //  },
    {
        path: '/order',
        element : <OrderPage />
    }
];

export default AppRoutes;

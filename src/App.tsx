import React from 'react';
import './App.css';
import Header from "./components/Header";
import PageResults from "./pages/PageResults/PageResults";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "../src/components/ErrorPage"
import PageRunner from "../src/pages/PageRunner/PageRunner";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-wrapper">
        <Header />
        <div id="detail">
            <Outlet />
        </div>
    </div>
  );
}

export const router = createBrowserRouter([
    {
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "runners/:runnerId",
                element: <PageRunner/>,
            },
            {
                path: "/",
                element: <div className="main-area">
                    <PageResults />
                </div>,
            }
        ]
    }
]);


export default App;

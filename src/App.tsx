import React from 'react';
import './App.css';
import Header from "./components/Header";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../src/components/ErrorPage"
import PageRunner from "../src/pages/PageRunner/PageRunner";
import { Outlet } from "react-router-dom";
import PageAllRaces from "./pages/PageAllRaces/PageAllRaces";
import PageMain from "./pages/PageMain/PageMain";
import PageRace from "./pages/PageRace/PageRace";
import PageAllRunners from "./pages/PageAllRunners/PageAllRunners";

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
                path: "races/:raceId",
                element: <div className="main-area">
                    <PageRace />
                </div>,
            },
            {
                path: "/",
                element: <div className="main-area">
                    <PageMain />
                </div>,
            },
            {
                path: "/allRaces",
                element: <div className="main-area">
                    <PageAllRaces />
                </div>,
            },
            {
                path: "/allRunners",
                element: <div className="main-area">
                    <PageAllRunners />
                </div>,
            },
        ]
    }
]);


export default App;

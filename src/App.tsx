import React from 'react';
import './app.scss';
import Header from "./components/Header/Header";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../src/components/ErrorPage"
import PageRunner from "../src/pages/PageRunner/PageRunner";
import { Outlet } from "react-router-dom";
import PageAllRaces from "./pages/PageAllRaces/PageAllRaces";
import PageMain from "./pages/PageMain/PageMain";
import PageRace from "./pages/PageRace/PageRace";
import PageAllRunners from "./pages/PageAllRunners/PageAllRunners";
import Footer from "./components/Footer";
import PageAbout from "./pages/PageAbout/PageAbout";

const App = () => {
  return (
    <div className="app-wrapper">
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
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
                element: <PageRace />,
            },
            {
                path: "/",
                element: <PageMain />,
            },
            {
                path: "/allRaces",
                element: <PageAllRaces />,
            },
            {
                path: "/allRunners",
                element: <PageAllRunners />,
            },
            {
                path: "/about",
                element: <PageAbout />,
            },
        ]
    }
]);


export default App;

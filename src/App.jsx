import React, {useEffect} from 'react';
import './app.scss';
import Header from "./components/Header/Header";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../src/components/ErrorPage"
import PageRunner from "../src/pages/PageRunner/PageRunner";
import { Outlet, useLocation } from "react-router-dom";
import PageAllRaces from "./pages/PageAllRaces/PageAllRaces";
import PageMain from "./pages/PageMain/PageMain";
import PageRace from "./pages/PageRace/PageRace";
import PageAllRunners from "./pages/PageAllRunners/PageAllRunners";
import Footer from "./components/Footer/Footer";
import PageAbout from "./pages/PageAbout/PageAbout";
import PageRulesPreview from "./pages/PageRulesPreview/PageRulesPreview";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(utc);

const App = () => {

  const location = useLocation();

  return (
    <div className="app-wrapper">
        <Header />
        <main>
            <Outlet />
        </main>
        {location.pathname !== '/allRunners' && <Footer />}
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
                path: "races/:raceId/document",
                element: <PageRulesPreview />,
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

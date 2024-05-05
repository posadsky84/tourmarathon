import React from 'react';
import './App.css';
import Header from "./components/Header";
import PageResults from "./pages/PageResults/PageResults";

const App = () => {
  return (
    <div className="app-wrapper">
        <Header />
        <div className="main-area">
            <PageResults />
        </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import SubmitForm from './submitForm';

function App() {

    return (
        <div className="Main-container">
            <div className="Header-background">
                <div className="Oval"></div>
                <img className="search" src="/img/search.png" alt=""/>
            </div>
            <SubmitForm/>
            <div className="Group-3">
                <div className="Social-group">
                    <div className="Social-group-item Twitter-icon"></div>
                    <div className="Social-group-item Linkedin-icon"></div>
                    <div className="Social-group-item Instagram-icon"></div>
                </div>
            </div>
        </div>
    );
}

export default App;

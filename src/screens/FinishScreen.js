import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FinishScreen.css';

export default function FinishScreen() {
  return (
    <section className="finish-page">
      <div className="black-overlay"></div>
      <div className="wrapper eight">
        <h3 className="smoke">
          <span>C</span>
          <span>O</span>
          <span>N</span>
          <span>G</span>
          <span>R</span>
          <span>A</span>
          <span>T</span>
          <span>U</span>
          <span>L</span>
          <span>A</span>
          <span>T</span>
          <span>I</span>
          <span>O</span>
          <span>N</span>
          <span>S</span>
        </h3>
      </div>
      <div className="wrapper one">
        <div className="drop-main">
          <span>S</span>
          <span>U</span>
          <span>C</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
          <span>S</span>
          <span>F</span>
          <span>U</span>
          <span>L</span>
          <span>L</span>
          <span>Y</span>
          <span>&nbsp;&nbsp;</span>
          <span>D</span>
          <span>O</span>
          <span>N</span>
          <span>E</span>
          <span>!</span>
        </div>
      </div>
      <div className="go-to-home-button-container">
        <Link to="/" className="go-to-home-button">
          <i className="fa-solid fa-arrow-left left-arrow"></i> Go to Home
        </Link>
      </div>
    </section>
  );
}

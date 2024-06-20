import React, { useState, useRef, useEffect } from 'react';
import '../styles/Recipes.module.css';

const SearchBar = ({ onNumberFieldChange, numberFieldValues, handleSearchClick }) => {
    const searchContainerRef = useRef(null);

    const handleNumberFieldChange = (event) => {
        const { id, value } = event.target;
        onNumberFieldChange(id, value);
    };

  return (
    <div className="search-container" ref={searchContainerRef}>
        <input
            type="text"
            id="Search"
            className="search-bar"
            placeholder="Search..."
            value={numberFieldValues.Search}
            onChange={handleNumberFieldChange}
        />
        <button onClick={handleSearchClick}>Search</button>
        <div id="dropdown" className="dropdown-content">
            <div style={{display: 'block', marginTop: '10px'}}>
                <label style={{color: 'white', paddingRight: '10px'}}>Minimum Calories: <input type="number" id="Calories" value={numberFieldValues.Calories} onChange={handleNumberFieldChange} /></label>
                <label style={{color: 'white'}}>Minimum Protein: <input type="number" id="Protein" value={numberFieldValues.Protein} onChange={handleNumberFieldChange} /></label>
            </div>
            <div style={{display: 'block', marginTop: '10px'}}>
                <label style={{color: 'white', paddingRight: '10px'}}>Minimum Fat: <input type="number" id="Fat" value={numberFieldValues.Fat} onChange={handleNumberFieldChange} /></label>
                <label style={{color: 'white'}}>Minimum Carbohydrates: <input type="number" id="Carbohydrates" value={numberFieldValues.Carbohydrates} onChange={handleNumberFieldChange} /></label>
            </div>
            <div style={{display: 'block', marginTop: '10px'}}>
                <label style={{color: 'white', paddingRight: '10px'}}>Minimum Fiber: <input type="number" id="Fiber" value={numberFieldValues.Fiber} onChange={handleNumberFieldChange} /></label>
                <label style={{color: 'white', paddingRight: '10px'}}>Minimum Sugar: <input type="number" id="Sugar" value={numberFieldValues.Sugar} onChange={handleNumberFieldChange} /></label>
                <label style={{color: 'white'}}>Minimum Sodium: <input type="number" id="Sodium" value={numberFieldValues.Sodium} onChange={handleNumberFieldChange} /></label>
            </div>
        </div>
    </div>
    );
};

export default SearchBar;

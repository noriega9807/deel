import React, { useEffect, useState, useCallback, useRef } from 'react';

import './App.css';
import { useDebounce } from './hooks/useDebounce';
import { useOnClickOutside } from './hooks/useOnClickOutside';
import Country from './interfaces/Country';

function App() {
  const [query, setQuery] = useState<string | ''>('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm: string = useDebounce<string>(query, 500);
  useOnClickOutside(ref, () => setIsDropdownOpen(false));

  const getCountryData = useCallback(async (search: string) => {
    return await fetch(`https://restcountries.com/v2/name/${search}`)
    .then((response) => response.json())
    .then((response) => 
      response.map((country: any) => ({
          name: country?.name?.toUpperCase(),
          key: country?.alpha3Code
      }))
    )
    .catch((error) => {
      console.log(error);
      return [];
    })
  }, []);

  useEffect(
    () => {
      const fetchAsync = async () => {
        try {
          const results = await getCountryData(debouncedSearchTerm);
          setIsSearching(false);
          setIsDropdownOpen(true);
          setSuggestions(results);
        } catch (e) {
          console.log(e);
        }
      };

      if (debouncedSearchTerm) {
        setIsSearching(true);
        fetchAsync();
      } else {
        setSuggestions([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm]
  );

  const clickCountry = (countryName: string) => {
    setQuery(countryName);
    setSuggestions([]);
  }

  const renderSuggestions = suggestions.map((country) => {
    const uppercaseQuery = query.toUpperCase();
    if (country.name === uppercaseQuery) return null;

    const countryHighlighted = country.name.replace(uppercaseQuery, `<b>${uppercaseQuery}</b>`);

    // NOTE: dangerouslySetInnerHTML is a hack and I never use it, only in this case because of time restriction
    return (
      <div
        className="option"
        onClick={() => {clickCountry(country?.name)}} 
        key={country?.key}
      >
          <span dangerouslySetInnerHTML={{__html:countryHighlighted}}></span>
      </div>
    );
  })
  
  return (
    <>
      <div className="container">
        <h1 className="center-text">Deel Test</h1>
        <h3 className="center-text">React autocomplete component</h3>
        <div className="holder">
          <label htmlFor="countryAutocomplete" className="labelCountry">Search a country:</label>
          <input 
            key="countryAutocomplete"
            id="countryAutocomplete"
            type="text"
            placeholder="Type Country"
            className="inputCountry"
            name="countryAutocomplete"
            value={query}
            onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            onClick={() => suggestions.length > 0 ? setIsDropdownOpen(true) : setIsDropdownOpen(false)}
          />

          {isSearching && <div className='loading'>Searching ...</div>}

          { (suggestions.length > 0 && suggestions[0].name !== query && isDropdownOpen) && (
            <div ref={ref} className="dropdown">
              {renderSuggestions}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

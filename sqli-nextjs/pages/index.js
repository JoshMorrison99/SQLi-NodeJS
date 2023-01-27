import React, { useState } from 'react';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [queryResult, setQueryResult] = useState([])

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(searchText);
    fetch('http://localhost:3001/query?username=' + searchText)
      .then(response => response.json())
      .then(data => {
        // Do something with the data here
        setQueryResult(data);
        console.log(queryResult)
      })
      .catch(error => {
        // Handle the error here
        console.error('Error:', error);
      });

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <h2>Database query is: SELECT * FROM users WHERE username='{searchText}'</h2>
      <pre>
        <code>{JSON.stringify(queryResult)}</code>
      </pre>
    </>
  );
}

export default SearchBar;
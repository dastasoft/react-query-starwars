import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Person from './Person';

const fetchPeople = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['people', page], fetchPeople, {
    staleTime: 2000,
    // cacheTime: 10,
    onSuccess: () => console.log('data fetched'),
    onError: () => console.log('error')
  });

  return (
    <div>
      <h2>People</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>

      {status === 'loading' && <div>Loading data ...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map(person => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;

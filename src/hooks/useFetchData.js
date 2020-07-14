import { useState, useEffect } from 'react'
import axios from 'axios';

const useFetchData = (filter) => {

  function filterData(data, aFilter){
    if (aFilter.length >= 0)
     return data.filter((l)=>l.nombre.toLowerCase().includes(aFilter.toLowerCase()));
    else
     return data;
  }

  const url = 'data/data-beerstore.json';
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url)
      .then(response => {
        setTimeout(() => {
          setData(filterData(response.data, filter));
          setIsLoading(false);
        }, 1500);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, [filter]);

  return {data, isLoading, error}

}

export default useFetchData;

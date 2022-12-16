import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import {useSearchParams } from "react-router-dom";
import { GET_MOVIES } from "../graphql/Queries";

import Movies from "./Movies";

const Search = () => {

const [getMovies, { data, error }] = useLazyQuery( GET_MOVIES );

  
const[searchParams,setSearchParams]=useSearchParams()
 const filterValue=searchParams.get('q')
  
useEffect(() => {
    getMovies()
}, [])

  if ( error ) return <h1>Error </h1>
    
  var filterData;
  if (data) {
    if (filterValue) {
      filterData = data.getMovies.filter((movie) =>
        movie.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      filterData = data.getMovies;
    }
  }
  

  return (
  <Movies movies={filterData}/>
  );
}

export default Search
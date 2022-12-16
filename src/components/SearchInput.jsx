import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {

const searchRef=useRef()

  // para el search bar
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
  navigate(`/home?q=${searchRef.current.value}`)
    event.target.reset() 
  }

  return (
    <form onSubmit={handleSubmit} className="container-fluid d-flex" style={{backgroundColor:'white', border:'.5px solid grey'}}>
    <input ref={searchRef} name='key' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{border:'none'}}/>
    <button  className="btn px-2 " type="submit"><i className="bi bi-search" style={{border:'none'}}></i></button>
  </form>
  )
}

export default SearchInput
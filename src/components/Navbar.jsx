import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext2";
const Navbar = () => {
 
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const {authorized,setAuthorized}= useAuthContext();
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  

  const logoutHandler = async () => {
    window.localStorage.removeItem("token")
    console.log("sesion terminda")
    setAuthorized(false)
   
  };
  
  useEffect(() => {
   
    console.log(authorized)
   }, [authorized])
   
  

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light  sticky-top  " style={{background:'#0d0911',opacity: '0.96',height:'80px'}}>
   
    <div className="container-fluid">   
        <button
          className="custom-toggler navbar-toggler bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>

       <div
          className={`${
            isNavCollapsed ? "collapse  container-fluid" : ""
          } navbar-collapse  container-fluid justify-content-between `}  
          id="navbarsExample09"
        >

         <ul className=" navbar-nav ">
           <li className="nav-item active">
             <Link className="nav-link text-light" to={"/home"}>Movies <span className="sr-only"></span></Link>
           </li>
           <li className="nav-item">
             <a className="nav-link text-light" href="#">Series</a>
           </li>
          
         </ul>
          <Link className="navbar-ICONmx-2 " to={"/home"} >
         <img
           className="d-none d-lg-block"  
           src="src/assets/HBOMAX.png"
           alt="Logo"
           style={{ width: "150px", paddingLeft:"10px"}}
         />
       </Link>
         <ul className=" navbar-nav justify-content-end">
         <li className="nav-item">
             <a   onClick={logoutHandler}
                  href="#"
                  className="nav-link text-light"
                  to="/login" >{authorized?'Logout': 'Login'}</a>
           </li>
           
           <li className="nav-item">
             <Link className="nav-link text-light" to={"/create-movie"}>Add movie</Link>
           </li>
           
         </ul>
       
       </div>
       <a className="navbar-ICONmx-2 " href="#" >
         <img
           className=" d-lg-none"  
           src="src/assets/HBOMAX.png"
           alt="Logo"
           style={{ width: "150px", paddingLeft:"10px"}}
         />
       </a>
       </div>
      
     </nav>
</>
  )
}

export default Navbar
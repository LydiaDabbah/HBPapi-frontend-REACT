import "../styles/NavBarStyle.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import SearchInput from "./SearchInput";


const NavBar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);

 const [displayInputBar, setDisplayInputBar] = useState(false);// para poner la input band abajo usas esto y pones la condicional: {displayInputBar && <SearchInput />}
  const {
    authorized: user,
    logoutAuth,
    getUserData,
    userData,
  } = useAuthContext();

  const logoutHandler = async () => {
    await logoutAuth();
  };

  useEffect(() => {
    if (user) {
      const getData = async () => {
        await getUserData(window.localStorage.token);
      };
      getData();
    }
  }, [user]);

  return (
   
      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top "
        style={{ backgroundColor: "#B0A9B0", fontSize: "1.1rem" }}
      >
        <div className="container-fluid">
        <a className="navbar-ICONmx-2" href="#">
          <img
            className=""
            src="src/assets/BEISMENT LOGO CROP.png"
            alt="Logo"
            style={{ width: "130px", paddingLeft:"10px"}}
          />
        </a>

        <button
          className="bg-dark custom-toggler navbar-toggler"
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
            isNavCollapsed ? "collapse row container-fluid" : ""
          } navbar-collapse row container-fluid `}  
          id="navbarsExample09"
        >
          <ul className="navbar-nav px-0 ">
            <li className="nav-item ">
              <Link className="nav-link active" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            {window.localStorage.role === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link active" to="/admin">
                  Admin Panel
                </Link>
              </li>
            )}
          {displayInputBar ?

            <li className="nav-item ms-auto ">
              <SearchInput setDisplayInputBar={setDisplayInputBar} displayInputBar={displayInputBar} />
            </li>

            :
            <li className="nav-item ms-auto ">
              <a
                href="#"
                className="nav-link active"
                onClick={() => setDisplayInputBar(!displayInputBar)}
              >
                <i className="bi bi-search text-black "></i>
              </a>
            </li>

             }
           

            <li className="nav-item">
              {user ? (
                <a
                  onClick={logoutHandler}
                  href="#"
                  className="nav-link active"
                  to="/login"
                >
                  {
                    <p style={{ margin: 0 }}>
                      <i className="bi bi-box-arrow-right"></i>{" "}
                      {userData ? `Hi, ${userData.data.user.first_name}` : ""}
                    </p>
                  }
                </a>
              ) : (
                <Link href="#" className="nav-link active" to="/login">
                  <i className="bi bi-person text-black "></i>
                </Link>
              )}
            </li >

            <li className="nav-item ">
              <Link href="#" className="nav-link active " to="/login">
                <i
                  className="bi bi-bag text-black "
                  style={{ padding: "0", marginRight: "5px" }}
                ></i>
              </Link>
            </li>
       </ul>
         
        </div>
        </div>
      </nav>
     
 
  );
};

export default NavBar;

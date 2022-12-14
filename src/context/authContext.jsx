import { useMutation } from "@apollo/client";
import { useState, useContext, createContext, useEffect } from "react";
import { LOGIN } from "../graphql/Mutations";
import { isValidToken, setSession } from "../utils/jwt";

const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [authorized, setAuthorized] = useState(()=>{

    const token = window.localStorage.token || ''
    return !!(token && isValidToken(token))
    
  });
  const [init, setInit] = useState(false); // para ver si se actualizam
 // const [userData, setUserData] = useState(null);

const [login] = useMutation(LOGIN, {});
 
  const loginAuth = async ({email,password}) => {


    await login({variables:{email,password}}).then(function (response) {
      console.log(response);
      var token = response.data.login;
      console.log(token);
      console.log(isValidToken(token))
     
      if (token &&isValidToken(token)) {

          setAuthorized(true)
          console.log("authorized")
          setSession(token)  
      } else {
        console.log("invalid crredentials")
      }
            } ).catch( function ( err ) {
                console.log( "Something went wrong!!", err)
            } )
  };
/*
  const logoutAuth = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("role");
    setAuthorized(false);
    setUserData(null)
    console.log("sesion terminada");
  };

  const getUserData = async (token) => {
    try {
      const data = await reqUserData(token);
      setUserData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const signUp=async({first_name,last_name,birth_date,gender,email,password})=>{

      const response = await axios.post(
        "https://ecomerce-master.herokuapp.com/api/v1/signup",
        {
          first_name,
          last_name,
          birth_date,
          gender,
          email,
          password,
        }
      );

    }
  

  const getAllUsers = async (token) => {
    try {
      const data = await reqAllUsers(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(authorized){
    const getData = async () => {
      await getAllUsers(window.localStorage.token);
    };
    getData();
  }
  }, [authorized]);
*/

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    
    setInit(true);
    console.log(token)
    try {
      if (token && isValidToken(token)) {
        setSession(token);
       // if(role)setRole(role)
        setAuthorized(true);
        console.log("sesión activa");
        console.log(`autho:${authorized}`)

      } else {
        console.log("no hay sesión");
        setAuthorized(false);
        //setUserData(null)
      }
     
        
    } catch (error) {
      console.log("catch error");
      setAuthorized(false);
    }
 
  }, []);

  const initialValues = {
    loginAuth,
    authorized
   
   // logoutAuth,
    //userData,
    //getUserData,
    //signUp,

  };

  return (
    <AuthContext.Provider value={ initialValues}>
      {children}
    </AuthContext.Provider>
  );
};

// creo el hook dentro del contexto para evitar crear un archivo
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };

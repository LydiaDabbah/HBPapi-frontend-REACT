import { useMutation } from "@apollo/client";
import { useState, useContext, createContext, useEffect } from "react";
import { LOGIN } from "../graphql/Mutations";
import { isValidToken, setSession } from "../utils/jwt";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authorized, setAuthorized] = useState(()=>{

    const token = window.localStorage.token || ''
    return !!(token && isValidToken(token))
    
  });

  /*const [login] = useMutation(LOGIN, {});
  const loginAuth = async ({email,password}) => {


    await login({variables:{email,password}}).then(function (response) {
  
      var token = response.data.login;
      console.log(token)
      console.log(isValidToken(token))
     
      if (token &&isValidToken(token)) {
        setSession(token)  
          setAuthorized(true)
          console.log(authorized)
          
      } else {
        console.log("invalid crredentials")
      }
            } ).catch( function ( err ) {
                console.log( "Something went wrong!!", err)
            } )
  };*/
 

   useEffect(() => {
    const token = window.localStorage.getItem("token");
    

    console.log(token)
    try {
      if (token && isValidToken(token)) {
        setSession(token);
    
        setAuthorized(true);
        console.log("sesión activa");
        console.log(`autho:${authorized}`)

      } else {
        console.log("no hay sesión");
        setAuthorized(false);
  
      }
     
        
    } catch (error) {
      console.log("catch error");
      setAuthorized(false);
    }
 
  }, []); 

  const initialValues = {
    //loginAuth,
    authorized,
    setAuthorized
 
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

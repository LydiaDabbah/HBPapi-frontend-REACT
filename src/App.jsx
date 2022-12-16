import "./App.css";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginProtected from "./guards/loginProtected";
import { AuthProvider } from './context/AuthContext2'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Login2 from "./components/Login";
import AddMovieForm from "./components/addMovieForm";
import Search from "./components/Search";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3000/",
});

function App() {
  
 
  return (
    <Router>
			<ApolloProvider client={client}> 
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/home" element={<LoginProtected><Search /></LoginProtected>} />
					<Route path="/create-movie" element={<LoginProtected><AddMovieForm /></LoginProtected>} />
					<Route  index element={<Login2/>} />
				</Routes>
				</AuthProvider>

		</ApolloProvider> 
	</Router>
   
  )
}

export default App

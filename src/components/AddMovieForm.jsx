import { useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext2";
import { CREATE_MOVIE, LOGIN } from "../graphql/Mutations";
import { isValidToken, setSession } from "../utils/jwt";
//import "../styles/loginStyle.css";

const AddMovieForm = () => {
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState("");
  const { setAuthorized, authorized } = useAuthContext();

  const [createMovie, {data, error }] = useMutation(CREATE_MOVIE, {});

  const refTitle = useRef();
  const refDescription= useRef();
  const refDateOfRelease=useRef()
  const refImage=useRef()
  const refLikes=useRef()


  const submitHandler = async (e) => {
    e.preventDefault();

    const title = refTitle.current.value;
    const description = refDescription.current.value;
    const dateOfRelease=refDateOfRelease.current.value;
    const image=refImage.current.value
    const likes=0;
    
    if(title==="" || description==="" || dateOfRelease===""  ||  image===""){
      setIsCreated(false)
    }else{
    await createMovie({ variables: { title, description,dateOfRelease,image,likes} })
      .then(function (response) {
        var data = response.data.createMovie;

        if (data) {
          setIsCreated(true)
          console.log("Movie added")
          navigate("/home")
          
        } else {
          setIsCreated(false)
         console.log("Something went wrong")
        }
      })
      .catch(function (err) {
        setIsCreated(false)
        console.log("Something went wrong!!", err)
      })
     
      if(isCreated){
        e.target.reset()
      }
  };

}
  return (

    <div
      className="container mt-3  "
      style={{ width: "780px", display: "grid", gap: "1.5rem" }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          display: "grid",
          gap: "1.5rem",
        }}
      >
        <div className="text-center">
          <h3 className="m-0 text-light font-weight-bold">Add movie</h3>
          {error && <p className="m-1 text-danger">{error}</p>}
        </div>

        <div
          className="container mb-5 p-5 "
          style={{
            width: "680px",
            display: "grid",
            gap: "2 rem",
            background:
              "radial-gradient(circle, rgba(54,25,62,1) 0%, rgba(53,30,69,1) 0%, rgba(18,6,23,1) 100%)",
          }}
        >
          
         {!isCreated && isCreated!== ""&& (
            <div>
              <h6 className="text-danger m-0">¡Error! Please make sure every field is completed as requested or try later</h6>
            </div>
          )}

          <div>
            <label className="text-light mt-2" htmlFor="title"> Title</label>
            <input
              ref={refTitle}
              name="title"
              placeholder="title"
              type="text"
              className="form-control "
              autoComplete="off"
              style={{ height: "56px" }}
            />
          </div>
          <div>
            <label className="text-light mt-2" htmlFor="description"> Description</label>
            <input
              ref={refDescription}
              name="description"
              placeholder="description"
              type="text"
              className="form-control "
              autoComplete="off"
              style={{ height: "56px" }}
            />
          </div>
          <div>
          <label  className="text-light mt-2" htmlFor="DateOfRelease"> Date of release</label>
            <input
              ref={refDateOfRelease}
              name="DateOfRelease"
              placeholder="DateOfRelease"
              type="date"
              className="form-control"
              style={{ height: "56px" }}
            />
          </div>
          <div>
          <label className="text-light mt-2" htmlFor="Image"> Image</label>
            <input
              ref={refImage}
              name="Image"
              placeholder="Image"
              type="text"
              className="form-control"
              style={{ height: "56px" }}
            />
          </div>

          <div className="d-flex">
            <button
              type="submit"
              className=" btn-h w-25  btn-lg mt-3"
              style={{ height: "56px" }}
            >
              CREATE
            </button>

            
          </div>
        </div>
      </form>
      {/* <div className="text-center">
        <p>Don´t you have an account?</p>
        <Link to={"/signup"}>
          <button type="link" className="w-100 btn btn-white border">
            Sign Up
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default AddMovieForm;

import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext2";
import { ADD_LIKES } from "../graphql/Mutations";
import { GET_MOVIES } from "../graphql/Queries";


const Movies = ({movies}) => {

  const {authorized}=useAuthContext()

  useEffect(() => {
   /*  if(!filterData){
       getMovies()
    }
    */
   console.log(`f:${movies}`)
   }, [])
   
 
  //  const [getMovies, { data, error }] = useLazyQuery( GET_MOVIES );
   const [addLikes] = useMutation(ADD_LIKES, {});
/* 
 
   if ( error ) return <h1>Error </h1>
   if ( data ) {
    const filterValue="p"

    const filterData=data.getMovies.filter((movie) =>
    movie.title.toLowerCase().includes(filterValue.toLowerCase()))
    console.log(filterData)
  
   } */

   const likesHandler=async(e)=>{
    let id = e.currentTarget.getAttribute( "data-id" )
    return await addLikes({variables:{id}})}
   
  return (


    <div className="App container-fluid " >
   
    { <section className="row gy-4 mt-4 px-3 " style={{margin:'0 auto' , width:'80%'}} >
   {/*  {data &&<p className='m-0 text-light'>{data.getMovies.length} results</p> } */}
      {movies && 
				movies.map( ( { _id, title, description, likes, dateOfRelease,image } ) => (
          <div key={_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        
              <div className="card rounded text-dark border-0 cardHeigth bg-transparent H mb-3">
                <div className="imgHeight">
                
                  <img
                    className="card-img-top styleImage"
                    src={image ||"https://i.etsystatic.com/21013327/r/il/f664c2/2139030529/il_1588xN.2139030529_p9uk.jpg"}
                    alt={title}
                  />
                  
                </div>

                <div className="card-body p-1  bodyHeight">
                  <p className="card-title text-trunc my-0 text-light mt-1  ">
                    <h6>{title}</h6>{" "}
                  </p>
                  <p className="card-textword-wrap font-italic text-trunc my-1 text-light">
                    {description}
                  </p>
                  <button data-id={_id} className="btn-link" onClick={likesHandler}>
                    {likes>20?
                    <b className="text-light"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>      {likes} Likes</b>
                    : likes>10? <b className="text-light"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i>      {likes} Likes</b>
                    :<b className="text-light"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>      {likes} Likes</b>  
                  }
                    </button>
                </div>
              </div>
          
          </div>
      ))}
      
    </section> }
  </div>
  )
}

export default Movies
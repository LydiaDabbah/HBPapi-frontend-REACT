import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext2";
import { GET_MOVIES } from "../graphql/Queries";


const Movies = () => {

  const {authorized}=useAuthContext()
  useEffect(() => {
    getMovies()
    console.log(authorized)
   }, [])
   
 
   const [getMovies, { data, error }] = useLazyQuery( GET_MOVIES );
 
  /*  const [removeNote] = useMutation( REMOVE_NOTE, {
     //refetch the query notes
     refetchQueries : [ {query: GET_NOTES} ]
   }) */
 
   if ( error ) return <h1>Error </h1>
   if ( data ) {
     console.log(data)
   }
  return (


    <div className="App container-fluid " >
   
    { <section className="row gy-4 mt-4 px-3 " style={{margin:'0 auto' , width:'80%'}} >
   {/*  {data &&<p className='m-0 text-light'>{data.getMovies.length} results</p> } */}
      {data && 
				data.getMovies.map( ( { id, title, description, likes, dateOfRelease,image } ) => (
          <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        
              <div className="card rounded text-dark border-0 cardHeigth bg-transparent H ">
                <div className="imgHeight">
                
                  <img
                    className="card-img-top styleImage"
                    src={image ||"https://i.etsystatic.com/21013327/r/il/f664c2/2139030529/il_1588xN.2139030529_p9uk.jpg"}
                    alt={title}
                  />
                  
                </div>

                <div className="card-body p-1  bodyHeight">
                  <p className="card-title text-trunc my-0 text-light ">
                    <b>{title}</b>{" "}
                  </p>
                  <p className="card-textword-wrap font-italic text-trunc my-1 text-light">
                    {description}
                  </p>
                  <p>
                    <b className="text-light">{likes} Likes</b>
                  </p>
                </div>
              </div>
          
          </div>
      ))}
      
    </section> }
  </div>
  )
}

export default Movies
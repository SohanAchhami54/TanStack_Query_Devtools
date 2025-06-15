import { useQuery } from "@tanstack/react-query"
import { getDataForIndi } from "../../Axios/Api"
import { NavLink, useParams } from "react-router-dom";

export const FetchIndividual=()=>{
 const {id}=useParams(); 
  const result=useQuery({
    queryKey:["individual",id],//when id change the queryFn get c
    queryFn:getDataForIndi,
  });
 
  const {data,isPending,isError,error}=result;
  if(isPending) 
    return <p className="text-white text-xl text-center "> ...Loading </p>
     if(isError) 
      return <p  className="text-white text-xl text-center ">Error:{error.message}</p>
  console.log(data);
  return(
    <>
      {/* <h1>Hello my name is sohan achhami.</h1> */}
      <section className=" flex justify-center ">
      
        <section>
          <h1 className="text-xl text-white text-center w-[50vw] p-10">hello individual</h1>
           
            <section className="text-sm  md:text-sm space-y-3 text-white grid w-full p-10 bg-gray-500">
              <p>Id:{data?.id} </p>
              <p>UserId:{data?.userId}</p>
              <p>Title:{data?.title}</p>
              <NavLink to="/rq">
                <button className="text-white border w-25 bg-gray-800 rounded-lg">Go Back</button>
              </NavLink>
              
            </section>
        </section>
      </section>

    </>
  )
}
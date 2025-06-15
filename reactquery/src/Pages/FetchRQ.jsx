import { NavLink, useAsyncError } from "react-router-dom";
import {  getDataForQuery } from "../Axios/Api"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ=()=>{
  const [pageNumber,setPageNumber]=useState(0);
  const result=useQuery({
    // queryKey:['posts',],
    queryKey:['posts',pageNumber],//jastai pagenumber ko value change vayo vaney cahi queryFn run hunxa ani api call hunxa.
    queryFn:()=>getDataForQuery(pageNumber),
    // staleTime:5000,
    // refetchInterval:1000,
    refetchInterval:1000,
    placeholderData:keepPreviousData,
    refetchIntervalInBackground:true,
  });
  const {data,isPending,isError,error}=result;

  if(isPending){
    return <p className="text-white text-center text-xl">Loading</p>
  }
  if(isError){
    return <p className="text-white text-center text-2xl">Error:{error.message} </p>
  }


  return( 
    <>
    {/* <div className="h-[85vh]  overflow-y-scroll text-white text-sm relative"> */}
      <div className="text-white text-sm relative">
        <section className="sticky top-0 z-10 bg-gray-800 py-2 px-4 flex items-center justify-around gap-3">

        <button onClick={()=>setPageNumber((prev)=>Math.max(prev-1  ,0))}
        className="border px-2 bg-green-600">Prev</button>

        <h2 className="text-lg">Page:{pageNumber+1} </h2>

        <button onClick={()=>setPageNumber((prev)=>prev+1)} disabled={pageNumber>=100}
        className="border px-2 bg-green-600">Next</button>

             </section>
    <h1 className=" w-full flex justify-center items-center">This is FetchRQ</h1>
     <ul className="  grid grid-cols-1   gap-5 p-5">
      {
        data?.map((curElem)=>{
            return(
              <li key={curElem.id} className="bg-gray-700 flex-1 h-60 sm:h-45 mx-5 md:mx-20 ">

                <section className="grid flex-col gap-4  ">
                <section className="space-y-1">
                   <p className="text-lg">{curElem.id}  </p>
                   <p>userId:{curElem.userId}</p>
                   <p>title:{curElem.title}</p>
                   <p>body:{curElem.body} </p>
                    </section>
                   <NavLink to={`/rq/${curElem.id}`} className=" text-white border rounded-xs
                   bg-gray-900 w-20 "><button>SeeMore</button></NavLink>
                   </section>
              </li>
            );
        })
      }
     </ul>
  
     </div>
    </>
  )
}

// import { useQuery } from "@tanstack/react-query";
// import { getData } from "../Axios/Api";

// export const FetchRQ = () => {
//   const fetchData = async () => {
//     try {
//       const res = await getData();
//       return res.status === 200 ? res.data : [];
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['posts'],  // ✅ fixed key
//     queryFn: fetchData,
//   });

//   if (isLoading) return <p className="text-white">Loading...</p>;
//   if (error) return <p className="text-red-500">Something went wrong</p>;

//   return (
//     <div className="h-[700px] overflow-y-scroll">
//       <h1 className="text-white w-full flex justify-center items-center">This is FetchRQ</h1>
//       <ul className="text-white grid grid-cols-3 gap-4 p-5">
//         {
//           data?.map((curElem, index) => (
//             <li key={index} className="bg-gray-600 flex-1 space-y-2">
//               <p>userId: {curElem.userId}</p>
//               <p>id: {curElem.id}</p>
//               <p>title: {curElem.title}</p>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   );
// }

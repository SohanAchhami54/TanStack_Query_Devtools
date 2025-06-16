import { NavLink, useAsyncError } from "react-router-dom";
import {  deleteDataMutate, getDataForQuery, updateDataMutate } from "../Axios/Api"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ=()=>{
  const [pageNumber,setPageNumber]=useState(0);
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [selectedPost,setSelectedPost]=useState(null);
  const result=useQuery({
    // queryKey:['posts',],
    queryKey:['posts',pageNumber],//jastai pagenumber ko value change vayo vaney cahi queryFn run hunxa ani api call hunxa.
    queryFn:()=>getDataForQuery(pageNumber),
    // staleTime:5000,
    // refetchInterval:1000,
      placeholderData:keepPreviousData,
    // refetchInterval:1000,
    // refetchIntervalInBackground:true,
  });
  const {data,isPending,isError,error}=result;
 
//useMutation chai create delete rw update garna ko lagi local cache ko data ma.
const queryClient=useQueryClient();
const deleteMutation=useMutation({
  mutationFn:(id)=> deleteDataMutate(id),
  onSuccess:(data,id)=>{
    console.log(data,id);
    queryClient.setQueryData(['posts',pageNumber],(curElem)=>{
      return curElem.filter((deleteData)=>deleteData.id!==id);
    }); 
  },
});


//useMutation hook to update the apidata.
const updateMutation=useMutation({
   mutationFn:({id,title,body})=>updateDataMutate({id,title,body}),
   onSuccess:(updatedata,element)=>{
    const {id}=element;
    console.log(updatedata,id);
    queryClient.setQueryData(['posts',pageNumber],(curElem)=>{
    
      return curElem?.map((curPost)=>{// harek ma map garney [0,1,2];
        return curPost.id===id?{...curPost,title:updatedata.data.title,body:updatedata.data.body}:curPost;
      }); 
    })
      setSelectedPost(null);
      setTitle("");
      setBody("");
   }

})

  if(isPending){
    return <p className="text-white text-center text-xl">Loading</p>
  }
  if(isError){
    return <p className="text-white text-center text-2xl">Error:{error.message} </p>
  }


  return( 
    <>
    {/* <div className="h-[85vh]  overflow-y-scroll text-white text-sm relative"> */}

    {/* Pagination */}
      <div className="text-white text-sm relative">
        <section className="sticky top-0 z-10 bg-gray-800 py-2 px-4 flex items-center justify-around gap-3">

        <button onClick={()=>setPageNumber((prev)=>Math.max(prev-1  ,0))}
        className="border px-2 bg-green-600">Prev</button>

        <h2 className="text-lg">Page:{pageNumber+1} </h2>

        <button onClick={()=>setPageNumber((prev)=>prev+1)} disabled={pageNumber>=100}
        className="border px-2 bg-green-600">Next</button>

             </section>
   {/* input form */}
             {/* <section className="flex place-content-center text-sm md:text-lg  m-3 gap-5">
                 <form>
                  <input type="text"
                   placeholder="Enter title"
                  className="border text-center w-60 md:w-100"
                  value={title}
                   onChange={(e)=>setTitle(e.target.value)}
                  />

                    <input type="text"
                   placeholder="Enter Body"
                  className="border text-center w-60 md:w-120"
                  value={body}
                   onChange={(e)=>setBody(e.target.value)}
                  />
                 </form>
               
                  <button className="border px-1"
                  onClick={()=>updateMutation.mutate({id:selectedPost,title,body})}        
                  >Add</button>
             </section> */}
             <section className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 w-full max-w-screen-lg mx-auto">
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="border px-2 py-1 text-center w-full md:w-60"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Enter Body"
                    className="border px-2 py-1 text-center w-full md:w-80"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  
                   <button
                     className="border px-4 py-1 bg-blue-600 text-white rounded w-full md:w-auto"
                     onClick={() => updateMutation.mutate({ id: selectedPost, title, body })}
                   >
                     {selectedPost ? "Update" : "Add"}
                   </button>
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

                    <section className="flex text-center gap-2">
                   <NavLink to={`/rq/${curElem.id}`} className=" text-white border rounded-xs
                   bg-gray-900 w-16 "><button>SeeMore</button></NavLink>

                   <button className="w-16 border bg-gray-900" 
                   onClick={()=>deleteMutation.mutate(curElem.id) }
                   >Delete</button>

                   <button className="w-16 border bg-gray-900" 
                    onClick={()=>{
                      setTitle(curElem.title);
                      setBody(curElem.body);
                      setSelectedPost(curElem.id);
                    }}>Update</button>
                    </section>  
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

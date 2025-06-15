import { useEffect, useState } from "react";
import { getData } from "../Axios/Api"

export const FetchOld=()=>{
  const [state,setState]=useState([]);
  const fetchData=async()=>{
    try{
      const res=await getData();
      console.log(res.data); 

      if(res.status===200){
      setState(res.data);   
      }
     
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
 
  return(
    <>
    <div className="h-[85vh]  overflow-y-scroll p-10">
    <h1 className="text-white w-full flex justify-center items-center">This is FetchOld</h1>
     <ul className="text-white grid grid-cols-1 sm:grid-cols-2   gap-5 p-5">
      {
        state?.map((curElem,index)=>{
            return(
              <li key={index} className="bg-gray-600 flex-1 space-y-2">
                   <p> id:{curElem.id}  </p>
                   <p>title:{curElem.title}</p>
              </li>
            );
        })
      }
     </ul>
     </div>
    </>
  )
}
import { useInfiniteQuery } from "@tanstack/react-query"
import { getDataforScroll } from "../Axios/Api"
import { useEffect } from "react";

export const Scroll=()=>{

const result=useInfiniteQuery({
  queryKey:['scroll'],
  queryFn:getDataforScroll,
  // getNextPageParam:(allPages,lastPages)=>{
  //   console.log(allPages,lastPages);
  // }
  getNextPageParam:(lastPages,allPages)=>{//it we don't declare this function reactquery assume it is not real paginated query.
     console.log(lastPages,allPages);
     return lastPages.page<lastPages.total_pages?lastPages.page+1:undefined;
  }//paginated query.

})
const {data,hasNextPage,fetchNextPage}=result;
console.log(data);

const handleScroll=()=>{
  const atBottom=window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-1;
  if(atBottom&&hasNextPage){
    fetchNextPage();
  }
}

//this part run when the user scroll through the pages.
useEffect(()=>{
  window.addEventListener("scroll",handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
},[hasNextPage])
  return(
    <>
       <h1 className="text-white text-sm md:text-base text-center ">Movie Data</h1>
       <ul className="flex flex-col text-white text-xs md:text-lg gap-4">
        {
          data?.pages?.map((curElem)=>{
            return curElem?.results.map((curPost)=>{
                 return <li key={curPost.id}>
                 
                      <h1>{curPost.genre_ids} </h1>
                    <img src={`https://image.tmdb.org/t/p/w500${curPost.backdrop_path}`} alt={curPost.id}
                   className=" w-[50%] "
                   />      
             </li>
            })
          })
        }
       </ul>

       
    </>
  )
}
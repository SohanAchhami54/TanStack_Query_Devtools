 import {createBrowserRouter, RouterProvider} from "react-router-dom";
 import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { MainLayout } from "./components/layout/Mainlayout";  
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Scroll } from "./Pages/Scroll";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { FetchIndividual } from "./components/UI/FetchIndividual";
 
 const router=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<Scroll/>,
      },
      {
        path:"/trad",
        element:<FetchOld/>,
      },
      {
        path:"rq",
        element:<FetchRQ/>,
      },
      {
        path:"rq/:id",
        element:<FetchIndividual/>,
      },
    ],
  },
 ]);
 
 console.log(router);
 

const App=()=>{
  const queryClient=new QueryClient();
  console.log(queryClient);
  return(
    <>
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
   
    </>
  )
}
export default App;

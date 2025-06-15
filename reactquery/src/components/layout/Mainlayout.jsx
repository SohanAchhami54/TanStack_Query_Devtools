import {Outlet} from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
export const MainLayout=()=>{
  return(
    <>
    <div className="min-h-screen bg-gray-800 relative">
    <Header/>
    <div className="flex-grow">
       <Outlet/>
    </div>
    
    <Footer/>
    </div>
    </>
  )
}
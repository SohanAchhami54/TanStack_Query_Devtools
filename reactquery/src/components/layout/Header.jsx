import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useState } from "react";
export const Header = () => {
  const [open,setOpen]=useState(false);
  return (
    <header className="sticky top-0 bg-gray-800 z-50">
      <div className="text-white flex justify-around py-5">
        <NavLink to="/">TanStack</NavLink>


         <button onClick={()=>setOpen(true)}
          className="md:hidden flex "><GiHamburgerMenu /></button>
         
        <ul className="hidden md:flex gap-10 ">
          <li><NavLink to="/">Scroll</NavLink> </li>
          <li><NavLink to="/trad">Axios</NavLink></li>
          <li><NavLink to="/rq">RQuery</NavLink></li>
        </ul>
      
       {open&&
       <section className="md:hidden fixed top-0 left-0 bg-gray-900 p-5 h-[100vh] ">
          <ul className="flex gap-10 flex-col mt-5">
          <li><NavLink to="/" onClick={()=>setOpen(false)}>Scroll</NavLink> </li>
          <li><NavLink to="/trad" onClick={()=>setOpen(false)}>Axios</NavLink></li>
          <li><NavLink to="/rq" onClick={()=>setOpen(false)}>RQuery</NavLink></li>
           <button onClick={()=>setOpen(false)} className="text-red-700"><ImCross/></button>
           <p className="text-white text-xs rotate-270 origin-left mt-40">Infinite Query</p>

        </ul> 
        </section>
       }


      </div>
    </header>
  );
};

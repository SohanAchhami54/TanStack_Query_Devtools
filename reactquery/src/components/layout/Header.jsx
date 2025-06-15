import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="text-white flex justify-around py-5">
        <NavLink to="/">ReactQuery</NavLink>
        <ul className="flex gap-10 ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/trad">Axios</NavLink>
          </li>
          <li>
            <NavLink to="/rq">ReactQuery</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

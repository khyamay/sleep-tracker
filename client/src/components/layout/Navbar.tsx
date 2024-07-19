import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="text-xl cursor-pointer" onClick={() => navigate("/")}>
          CYNOMI Sleep Tracker
        </a>
      </div>

      <div className="navbar-end">
        <a className="btn" onClick={() => navigate("/add")}>
          Add new entry
        </a>
      </div>
    </div>
  );
};

export default Navbar;

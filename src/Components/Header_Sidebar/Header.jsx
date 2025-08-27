import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import "./Header_Sidebar_Style.css";

const Header = () => {
  return (
    <div className="navbar_top">
      <div className="container-fluid pe-md-5">
        <div className="navbar_row">
          {/*====>> Offcanvas bar start <<====*/}
          <button className="offcanvas_close_btn btn btn-dark d-flex align-items-center rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><FaBars className="offcanvas_bar_icon" /></button>
          {/*====>> Offcanvas bar end <<====*/}

          <h5 className="company_brand d-none d-md-block">Admin</h5>
          <div className="d-flex align-items-center gap-3">
            <div className="btn-group">
              <button type="button" className="btn btn-outline-dark rounded-0 dropdown-toggle d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" ><FaUserCircle /></button>

              <ul className="dropdown-menu dropdown-menu-end mt-2 py-0 rounded-0">
                <li><button type="button" className="dropdown-item d-flex align-items-center gap-2"><BiLogOut />Logout</button></li>
                <hr className="dropdown-divider p-0 m-0" />
                <li><Link to='#' className="dropdown-item d-flex align-items-center gap-2"><CgProfile />Profile</Link></li>
                <hr className="dropdown-divider p-0 m-0" />
                <li> <Link to={"/settings"} className="dropdown-item d-flex align-items-center gap-2" ><SlSettings />Setting</Link></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header
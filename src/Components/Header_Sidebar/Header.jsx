import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiMessageDetail } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa";
import "./Header_Sidebar_Style.css";
import { useAuth_Context } from "../../Context/Auth_Context";
const Header = () => {
  const { logout_function } = useAuth_Context()
  return (
    <div className="navbar_top">
      <div className="container-fluid pe-md-5">
        <div className="navbar_row">
          {/*====>> Offcanvas bar start <<====*/}
          <button className="offcanvas_close_btn btn btn-dark d-flex align-items-center rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><FaBars className="offcanvas_bar_icon" /></button>
          {/*====>> Offcanvas bar end <<====*/}

          <h5 className="company_brand d-none d-md-block">Ma Electronics</h5>
          <div className="d-flex align-items-center gap-3">
            <Link to='/send-message' className="navbar_action_btn btn btn-primary rounded-0"><BiMessageDetail /> Message</Link>
            <button onClick={logout_function} className="navbar_action_btn btn btn-danger rounded-0"><FaPowerOff /> Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header
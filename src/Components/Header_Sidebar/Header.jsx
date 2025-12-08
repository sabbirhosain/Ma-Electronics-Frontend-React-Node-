import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsSubstack } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import "./Header_Sidebar_Style.css";
import { useAuth_Context } from "../../Context/Auth_Context";
import { useEffect } from "react";
const Header = () => {
  const { logout_function, store_setting, fetchStoreSettingData } = useAuth_Context()
  useEffect(() => { fetchStoreSettingData() }, ['']);

  return (
    <div className="navbar_top">
      <div className="container-fluid pe-md-5">
        <div className="navbar_row">
          {/*====>> Offcanvas bar start <<====*/}
          <button className="offcanvas_close_btn btn btn-dark d-flex align-items-center rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><FaBars className="offcanvas_bar_icon" /></button>
          {/*====>> Offcanvas bar end <<====*/}

          <h5 className="company_brand d-none d-md-block">{store_setting.data.name || 'Inventory System'}</h5>
          <div className="d-flex align-items-center gap-3">
            <Link to='/send-message' className="navbar_action_btn btn btn-primary rounded-0"><BsSubstack /> Subscription</Link>
            <button onClick={logout_function} className="navbar_action_btn btn btn-danger rounded-0"><FaPowerOff /> Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header
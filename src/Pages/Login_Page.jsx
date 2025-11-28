import { useAuth_Context } from '../Context/Auth_Context';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { login_users } from '../api_base_routes';
import { Navigate, useNavigate } from 'react-router-dom';
import { BiLogInCircle } from "react-icons/bi";
import { MdLockPerson } from "react-icons/md";
import { CiUser } from 'react-icons/ci'
import { toast } from 'react-toastify';
import { useState } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';

const Login_Page = () => {
  const navigate = useNavigate()
  const { encryptData, auth, setAuth, isTokenExpired } = useAuth_Context()
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const passwordShowToggle = () => { setShowPassword(!showPassword) };
  const [users, setUsers] = useState({ user_name: "", password: "" })

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setUsers((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  // if user is login auto redirect dashboard route
  if (auth.access && !isTokenExpired(auth.access)) {
    return <Navigate to="/" replace />;
  }

  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const response = await axios.post(login_users, {
        user: users.user_name,
        password: users.password
      });

      if (response && response.data && response.data.success) {

        const payload = response.data.payload;
        const encrypted = encryptData(payload);
        if (encrypted) { Cookies.set("root", encrypted, { secure: true, sameSite: "Strict" }) }
        setAuth({ user: payload.user, access: payload.access, refresh: payload.refresh, store_name: payload.store_name });

        navigate("/", { replace: true });
        toast.success(response.data.message || "Login Success.");
      }

    } catch (error) {
      Cookies.remove('root');
      console.error(error.response);
      setError_message(error.response.data || { message: 'Login failed' });
      setAuth({ user: null, access: null, refresh: null, store_name: null });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='login_section'>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5">
            <form onSubmit={handleSubmit} className='border p-3 p-md-5'>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Email or Phone</label>
                  <div className='position-relative'>
                    <input type="text" name='user_name' className='form-control rounded-0 ps-5' onChange={handleChange} placeholder='Sabbir Hosain' disabled={loading} required />
                    <CiUser className='login_user_icon' />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Password</label>
                  <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"} name='password' onChange={handleChange} className='form-control rounded-0 ps-5' placeholder='****' disabled={loading} required />
                    <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    <small className='text-danger d-block mt-1'>{error_message.message}</small>
                    <MdLockPerson className='login_lock_icon' />
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <button type="submit" className='login_btn'><BiLogInCircle />{loading ? "Please Wait..." : "Sign In"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login_Page
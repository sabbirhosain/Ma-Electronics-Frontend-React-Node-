import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { CiUser } from 'react-icons/ci'
import { BiLogInCircle } from "react-icons/bi";
import { MdLockPerson } from "react-icons/md";
import { useState } from 'react';
import { login_users } from '../api_base_routes';
import { toast } from 'react-toastify';

const Login_Page = () => {
  const navigate = useNavigate();
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
        navigate("/");
        toast.success(response.data.message || "Login Success.");
      } else {
        alert(response.data.message || "Field Error");
      }
    } catch (error) {
      console.log(error);
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
                    <input type="text" className='form-control rounded-0 ps-5' disabled={loading} required />
                    <CiUser className='login_user_icon' />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Password</label>
                  <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"} className='form-control rounded-0 ps-5' disabled={loading} required />
                    <button type="button" className='password_show_btn' onClick={passwordShowToggle}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
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
import { toast } from 'react-toastify';
import Layout from '../../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { create_categories } from '../../api_base_routes';
import { useState } from 'react';
import axios from 'axios';

const Create_Categories = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error_message, setError_message] = useState({});
  const [categories, setCategories] = useState({ item_name: '' });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setCategories((prev) => ({ ...prev, [name]: type === 'file' ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const response = await axios.post(create_categories, {
        categories_name: categories.item_name
      });

      if (response && response.data && response.data.success) {
        navigate('/categories-table')
        toast.success(response.data.message || 'Create Success.')
      } else {
        alert(response.data.message || 'Field Error')
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }




  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Create Categories</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Item Name</label>
                  <input type="text" name='item_name' onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
                </div>

              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/categories-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100 custom_btn'>{loading ? 'Please Wait' : 'Create'}</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Create_Categories
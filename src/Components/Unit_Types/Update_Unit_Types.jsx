import { single_unittype, update_unittype } from '../../api_base_routes';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';

const Update_Unit_Types = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error_message, setError_message] = useState({});
  const [unittype, setUnittype] = useState({ unit_name: "" });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setUnittype((prev) => ({ ...prev, [name]: type === 'file' ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  useEffect(() => {
    const getUnitType = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_unittype}${id}`);
        if (response && response.data) {
          const result = response.data.payload
          setUnittype({ unit_name: result.unit_name });
        }
      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getUnitType()
  }, [id]);


  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const response = await axios.put(`${update_unittype}${id}`, {
        unit_name: unittype.unit_name
      });

      if (response && response.data && response.data.success) {
        navigate('/unittype-table')
        toast.success(response.data.message || 'Update Success.')
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
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="shadow-sm bg-light px-5 pt-3 pb-4">
              <h4 className="form_heading py-4">Update Unit Types</h4>
              <div className="row border-top border-warning pt-4">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Unit Name</label>
                  <input type="text" name="unit_name" value={unittype.unit_name || ''} onChange={handleChange} className="form-control rounded-0" disabled={loading} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to="/unittype-table" className="btn btn-danger rounded-0 w-100 custom_btn">Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className="btn btn-success rounded-0 w-100 custom_btn">{loading ? "Please Wait" : "Update"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Update_Unit_Types
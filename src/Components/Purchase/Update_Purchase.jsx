import Layout from '../../Layout/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useProduct_Context } from '../../Context/Product_Context'
import { single_purchase, update_purchase } from '../../api_base_routes'

const Update_Purchase = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { products, updateProductState, fetchProductsData, products_options_select, products_options_search } = useProduct_Context()
  useEffect(() => { fetchProductsData(1) }, [products.search]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [purchase, setPurchase] = useState({ date_and_time: "", quentity: "", supplier_name: "" });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setPurchase((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  useEffect(() => {
    const getPurchase = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_purchase}${id}`);
        if (response && response.data) {
          const result = response.data.payload;
          setPurchase({ date_and_time: result.date_and_time, quentity: result.quentity, supplier_name: result.supplier_name });
          updateProductState({ options_value: { value: result.product_id, label: result.product_name } });
        }
      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getPurchase()
  }, [id]);


  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const response = await axios.put(`${update_purchase}${id}`, {
        date_and_time: purchase.date_and_time,
        product_id: products.options_value?.value,
        quentity: purchase.quentity,
        supplier_name: purchase.supplier_name
      });

      if (response && response.data && response.data.success) {
        navigate('/purchase-table')
        toast.success(response.data.message || 'Update Success.');
        updateProductState({ options_value: null });
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
          <div className="col-md-10">
            <form onSubmit={handleSubmit} className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Create Purchase</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Date and Time</label>
                  <input type="date" name="date_and_time" value={purchase.date_and_time || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Product Name</label>
                  <Select
                    options={products.options}
                    value={products.options_value}
                    onChange={products_options_select}
                    onInputChange={products_options_search}
                    isLoading={products.isLoading}
                    placeholder={products.isLoading ? "Loading..." : "Select Products"}
                    isClearable={true}
                    styles={customStyles}
                    maxMenuHeight={300}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Quentity</label>
                  <input type="number" name="quentity" value={purchase.quentity || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Supplier Name</label>
                  <input type="text" name="supplier_name" value={purchase.supplier_name || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} />
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/purchase-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100 custom_btn'>{loading ? 'Please Wait' : 'Update'}</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Update_Purchase
import { useCategories_Context } from '../../Context/Categories_Context'
import { useUnitType_Context } from '../../Context/UnitType_Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { single_products, update_products } from '../../api_base_routes'
import { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify'
import Select from 'react-select'
import axios from 'axios'


const Update_Product = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { categories, updateCategoriesState, fetchCategoriesData, categories_options_select, categories_options_search } = useCategories_Context()
  const { unit_types, updateUnitTypesState, fetchUnitTypesData, units_options_select, units_options_search } = useUnitType_Context()
  useEffect(() => { fetchCategoriesData(1) }, [categories.search]);
  useEffect(() => { fetchUnitTypesData(1) }, [unit_types.search]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [products, setProducts] = useState({ item_name: "", description: "", quentity_stock: "", status: "" });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setProducts((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_products}${id}`);
        if (response && response.data) {
          const result = response.data.payload;
          setProducts({ item_name: result.item_name, description: result.description, quentity_stock: result.quentity_stock, status: result.status });
          updateCategoriesState({ options_value: { value: result.categories_id, label: result.categories_name } });
          updateUnitTypesState({ options_value: { value: result.unit_type_id, label: result.unit_type_name } });
        }
      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getProducts()
  }, [id]);


  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const response = await axios.put(`${update_products}${id}`, {
        item_name: products.item_name,
        categories_id: categories.options_value?.value,
        unit_type_id: unit_types.options_value?.value,
        description: products.description,
        status: products.status
      });

      if (response && response.data && response.data.success) {
        navigate('/product-table')
        toast.success(response.data.message || 'Update Success.');
        updateCategoriesState({ options_value: null });
        updateUnitTypesState({ options_value: null });
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
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Update Product</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Item Name</label>
                  <input type="text" name="item_name" value={products.item_name || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Status</label>
                  <select name="status" value={products.status || ''} onChange={handleChange} className="form-select rounded-0" disabled={loading || Number(products.quentity_stock) === 0}>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Categories</label>
                  <Select
                    options={categories.options}
                    value={categories.options_value}
                    onChange={categories_options_select}
                    onInputChange={categories_options_search}
                    isLoading={categories.isLoading}
                    placeholder={categories.isLoading ? "Loading..." : "Select Categries"}
                    isClearable={true}
                    styles={customStyles}
                    maxMenuHeight={300}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Unit Types</label>
                  <Select
                    options={unit_types.options}
                    value={unit_types.options_value}
                    onChange={units_options_select}
                    onInputChange={units_options_search}
                    isLoading={unit_types.isLoading}
                    placeholder={unit_types.isLoading ? "Loading..." : "Select Categries"}
                    isClearable={true}
                    styles={customStyles}
                    maxMenuHeight={300}
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Description</label>
                  <textarea rows="3" name="description" value={products.description || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} />
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/product-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
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

export default Update_Product
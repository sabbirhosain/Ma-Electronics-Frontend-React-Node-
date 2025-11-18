import { useCategories_Context } from '../Context/Categories_Context'
import Table_Product from '../Components/Products/Table_Product'
import { useProduct_Context } from '../Context/Product_Context'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Select from 'react-select'
import { useEffect } from 'react'


const Products_Page = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { categories, fetchCategoriesData, categories_options_select, categories_options_search } = useCategories_Context()
  useEffect(() => { fetchCategoriesData(1) }, [categories.search]);
  const { updateProductState } = useProduct_Context()

  return (
    <Layout>
      <section className=''>
        <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>Product List</h4>
          <Link to='/product-create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>

        <div className="row justify-content-md-end bg-light shadow-sm p-3">
          <div className="col-md-12"></div>
          <div className="col-md-3">
            <div className='w-100'>
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
          </div>
          <div className="col-md-3">
            <div className='w-100'>
              <select onChange={(event) => updateProductState({ status: event.target.value })} className="form-select rounded-0">
                <option value=''>Select Status</option>
                <option value='available'>Available</option>
                <option value='unavailable'>Unavailable</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100'>
              <input type="search" onChange={(event) => updateProductState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
            </div>
          </div>
        </div>

        <div className='pt-2 pb-5'>
          <Table_Product />
        </div>
      </section>
    </Layout>
  )
}

export default Products_Page
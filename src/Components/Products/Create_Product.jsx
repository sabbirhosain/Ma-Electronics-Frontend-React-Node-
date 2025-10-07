import { useCategories_Context } from '../../Context/Categories_Context'
import { Link } from 'react-router-dom'
import Layout from '../../Layout/Layout'
import { useEffect } from 'react'
import Select from 'react-select'
import { useUnitType_Context } from '../../Context/UnitType_Context'

const Create_Product = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Mozilla Headline" }) };
  const { categories, fetchCategoriesData, categories_options_select, categories_options_search } = useCategories_Context()
  const { unit_types, fetchUnitTypesData, units_options_select, units_options_search } = useUnitType_Context()
  useEffect(() => { fetchCategoriesData(1) }, [categories.search]);
  useEffect(() => { fetchUnitTypesData(1) }, [unit_types.search]);


  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Create Product</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Item Name</label>
                  <input type="text" className='form-control rounded-0' required />
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
                  <textarea rows="3" className='form-control rounded-0' required />
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/product-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100 custom_btn'>Create</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Create_Product
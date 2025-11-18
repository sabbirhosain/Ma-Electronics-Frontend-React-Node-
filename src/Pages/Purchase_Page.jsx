import Table_Purchase from '../Components/Purchase/Table_Purchase'
import { usePurchase_Context } from '../Context/Purchase_Context'
import { useProduct_Context } from '../Context/Product_Context'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Select from 'react-select'
import { useEffect } from 'react'

const Purchase_Page = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { products, fetchProductsData, products_options_select, products_options_search } = useProduct_Context()
  const { updatePurchaseState } = usePurchase_Context()
  useEffect(() => { fetchProductsData(1) }, [products.search]);

  return (
    <Layout>
      <section className=''>
        <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>Purchase List</h4>
          <Link to='/purchase-create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>

        <div className="row bg-light shadow-sm p-3">
          <div className="col-md-12"></div>
          <div className="col-md-3">
            <div className='w-100'>
              <input type="date" onChange={(event) => updatePurchaseState({ from_date: event.target.value })} className="form-control rounded-0" />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100'>
              <input type="date" onChange={(event) => updatePurchaseState({ to_date: event.target.value })} className="form-control rounded-0" />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100'>
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
          </div>
          <div className="col-md-3">
            <div className='w-100'>
              <input type="search" onChange={(event) => updatePurchaseState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
            </div>
          </div>
        </div>

        <div className='pt-2 pb-5'>
          <Table_Purchase />
        </div>
      </section>
    </Layout>
  )
}

export default Purchase_Page
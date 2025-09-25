import Table_Categories from '../Components/Categories/Table_Categories'
import { useCategories_Context } from '../Context/Categories_Context'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'

const Categories_Page = () => {
  const { categories, updateCategoriesState } = useCategories_Context();
  return (
    <Layout>
      <section className=''>
        <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>Categories List</h4>
          <Link to='/categories-create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>

        <div className="row bg-light shadow-sm p-3">
          <div className="col-md-9"></div>
          <div className="col-md-3">
            <div className='w-100'>
              <input type="search" value={categories.search} onChange={(event) => updateCategoriesState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
            </div>
          </div>
        </div>

        <div className='pt-2 pb-5'>
          <Table_Categories />
        </div>
      </section>
    </Layout>
  )
}

export default Categories_Page
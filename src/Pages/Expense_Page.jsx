import { MdFormatListBulletedAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Table_Expense from '../Components/Expense/Table_Expense'

const Expense_Page = () => {
  return (
    <Layout>
      <section className=''>
        <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>Expense List</h4>
          <Link to='/expense-create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>

        <div className="row bg-light shadow-sm p-3">
          <div className="col-md-9"></div>
          <div className="col-md-3">
            <div className='w-100'>
              <input type="search" onChange={(event) => updateCategoriesState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
            </div>
          </div>
        </div>

        <div className='pt-2 pb-5'>
          <Table_Expense />
        </div>
      </section>
    </Layout>
  )
}

export default Expense_Page
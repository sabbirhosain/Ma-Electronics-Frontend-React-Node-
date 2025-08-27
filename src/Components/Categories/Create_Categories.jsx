import { toast } from 'react-toastify';
import Layout from '../../Layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Create_Categories = () => {
  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Create Categories</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Item Name</label>
                  <input type="text" className='form-control rounded-0' required />
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/categories-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
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

export default Create_Categories
import Layout from '../../Layout/Layout'
import { Link } from 'react-router-dom'

const Update_Purchase = () => {
  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Update Purchase</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Date and Time</label>
                  <input type="date" className='form-control rounded-0' required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Items Name</label>
                  <input type="text" className='form-control rounded-0' required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Quentity</label>
                  <input type="text" className='form-control rounded-0' required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Attachment</label>
                  <input type="file" className='form-control rounded-0' required />
                </div>

                <div className="col-md-12 mb-3">
                  <label className='form-label'>Warehouse Location</label>
                  <input type="text" className='form-control rounded-0' required />
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/product-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100 custom_btn'>Update</button>
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
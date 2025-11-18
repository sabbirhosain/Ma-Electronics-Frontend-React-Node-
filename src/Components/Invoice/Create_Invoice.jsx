import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Add_Product_Model from './Add_Product_Model';
import Update_Product_Model from './Update_Product_Model';
import Invoice_Product_Table from './Invoice_Product_Table';

const Create_Invoice = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [invoice, setInvoice] = useState({ date_and_time: "", discount: "", discount_type: "", tax: "", advance_pay: "", customer_name: "", customer_phone: "", customer_address: "", payment_method: "", product_list: [{ product_name: '', unit_price: '', quentity: '', price: '' }] });
  console.log(invoice);

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setInvoice((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };


  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <form className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Create Invoice</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Date and Time</label>
                  <input type="date" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Name</label>
                  <input type="text" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Phone</label>
                  <input type="text" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Address</label>
                  <input type="text" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Discount</label>
                  <input type="text" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Payment Method</label>
                  <select className="form-select rounded-0">
                    <option value=''>Select Method</option>
                    <option value='cash'>Cash</option>
                    <option value='bank_transfer'>Bank Transfer</option>
                    <option value='mobile_banking'>Mobile Banking</option>
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Advance Pay</label>
                  <input type="text" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Tax</label>
                  <input type="text" className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Discount Type</label>
                  <select className="form-select rounded-0">
                    <option value=''>Select Types</option>
                    <option value='percent'>Percent - %</option>
                    <option value='amount'>Amount - Tk</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center justify-content-between border-bottom border-warning pb-2 my-4">
                    <h5 className='form_heading' style={{ fontSize: '18px' }}>Product List</h5>
                    <button type="button" className="btn btn-primary rounded-0 custom_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Product</button>
                  </div>
                  <Invoice_Product_Table />
                </div>

              </div>

              <div className="d-flex align-items-center justify-content-end gap-2">
                <div className="col-md-2 mt-3">
                  <Link to='/invoice-table' className='btn btn-danger rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-2 mt-3">
                  <button type="submit" className='btn btn-success rounded-0 w-100 custom_btn'>Create</button>
                </div>
              </div>
            </form>
            <Add_Product_Model />
            <Update_Product_Model />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Create_Invoice
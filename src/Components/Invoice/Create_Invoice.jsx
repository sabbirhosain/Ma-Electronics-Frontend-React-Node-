import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Add_Product_Model from './Add_Product_Model';
import Update_Product_Model from './Update_Product_Model';
import Invoice_Product_Table from './Invoice_Product_Table';
import { useInvoice_Context } from '../../Context/Invoice_Context';

const Create_Invoice = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { invoice_products } = useInvoice_Context()
  const [error_message, setError_message] = useState({});
  const [invoice, setInvoice] = useState({ date_and_time: "", customer_name: "", customer_phone: "", customer_address: "", total_price: "", discount: "", discount_type: "", tax: "", sub_total: "", advance_pay: "", payment_method: "", grand_total: "" });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setInvoice((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };


  useEffect(() => {
    const total = invoice_products.reduce((sum, item) => { return sum + Number(item.unit_price) * Number(item.quentity) }, 0);

    let discountAmount = 0;
    if (invoice.discount_type === "percent") {
      discountAmount = (total * Number(invoice.discount)) / 100;
    } else {
      discountAmount = Number(invoice.discount);
    }

    const taxAmount = Number(invoice.tax) || 0;
    const subTotal = total - discountAmount + taxAmount;
    const grandTotal = subTotal - Number(invoice.advance_pay || 0);
    setInvoice(prev => ({ ...prev, total_price: total.toFixed(2), sub_total: subTotal.toFixed(2), grand_total: grandTotal.toFixed(2) }));

  }, [invoice_products, invoice.discount, invoice.discount_type, invoice.tax, invoice.advance_pay]);



  return (
    <Layout>
      <section className='container-fluid my-5'>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <form className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Create Invoice</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Date and Time</label>
                  <input type="date" name='date_and_time' value={invoice.date_and_time} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Name</label>
                  <input type="text" name='customer_name' value={invoice.customer_name} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Phone</label>
                  <input type="text" name='customer_phone' value={invoice.customer_phone} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Address</label>
                  <input type="text" name='customer_address' value={invoice.customer_address} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center justify-content-between border-bottom border-warning pb-2 my-4">
                    <h5 className='form_heading' style={{ fontSize: '18px' }}>Product List</h5>
                    <button type="button" className="btn btn-primary rounded-0 custom_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Product</button>
                  </div>
                  <Invoice_Product_Table />
                </div>
              </div>

              <div className="row justify-content-end mt-3">
                <div className="col-md-5">
                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Total Price :</label></div>
                    <div className="col-4 pe-1"><input type="text" value={invoice.total_price || 0} className="form-control rounded-0" readOnly /></div>
                    <div className="col-2 ps-1"><input type="text" value='TK' className="form-control rounded-0" readOnly /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Discount :</label></div>
                    <div className="col-4 pe-1"><input type="number" name='discount' value={invoice.discount} onChange={handleChange} min='0' max='100' className="form-control rounded-0" /></div>
                    <div className="col-2 ps-1">
                      <select className="form-select rounded-0" name='discount_type' value={invoice.discount_type} onChange={handleChange}>
                        <option value='amount'>Tk</option>
                        <option value='percent'>%</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Tax :</label></div>
                    <div className="col-6"><input type="number" name='tax' value={invoice.tax} onChange={handleChange} min='0' className="form-control rounded-0" /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Sub Total :</label></div>
                    <div className="col-6"><input type="text" value={invoice.sub_total} className="form-control rounded-0" readOnly /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Advance Pay :</label></div>
                    <div className="col-6"><input type="number" name='advance_pay' value={invoice.advance_pay} onChange={handleChange} min='0' className="form-control rounded-0" /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className='form-label d-block text-end'>Payment Method :</label></div>
                    <div className="col-6">
                      <select className="form-select rounded-0" name='payment_method' value={invoice.payment_method} onChange={handleChange}>
                        <option value=''>Select Method</option>
                        <option value='cash'>Cash</option>
                        <option value='bank_transfer'>Bank Transfer</option>
                        <option value='mobile_banking'>Mobile Banking</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-6"><label className="form-label d-block text-end">Grand Total :</label></div>
                    <div className="col-6"><input type="text" value={invoice.grand_total} className="form-control rounded-0" readOnly /></div>
                  </div>

                </div>
              </div>

              <div className="d-flex align-items-center justify-content-end gap-2 mt-5">
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
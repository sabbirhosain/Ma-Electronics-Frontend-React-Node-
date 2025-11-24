import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Add_Product_Model from './Add_Product_Model';
import Update_Product_Model from './Update_Product_Model';
import { single_invoice } from '../../api_base_routes';
import { useInvoice_Context } from '../../Context/Invoice_Context';
import Invoice_Product_Table from './Invoice_Product_Table';
import { toast } from 'react-toastify';
import axios from 'axios';

const Update_Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const { invoice_products, setInvoice_Products, setDisabledProducts } = useInvoice_Context()
  const [invoice, setInvoice] = useState({ date_and_time: "", customer_name: "", customer_phone: "", customer_address: "", total_price: "", currency_type: "", discount: "", discount_type: "", tax: "", grand_total: "", sub_total: "", advance_pay: "", payment_type: "", payment_method: "", current_due: "" });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setInvoice((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  useEffect(() => {
    const total = invoice_products.reduce((sum, item) => {
      return sum + Number(item.unit_price) * Number(item.quentity)
    }, 0);

    let discountAmount = invoice.discount_type === "percent"
      ? (total * Number(invoice.discount)) / 100
      : Number(invoice.discount);

    const taxAmount = Number(invoice.tax) || 0;
    const subTotal = total - discountAmount + taxAmount;
    const totalDue = subTotal - Number(invoice.advance_pay || 0);

    setInvoice(prev => ({
      ...prev,
      total_price: total.toFixed(2),
      sub_total: subTotal.toFixed(2),
      current_due: totalDue.toFixed(2)
    }));

  }, [invoice_products, invoice.discount, invoice.discount_type, invoice.tax, invoice.advance_pay]);

  useEffect(() => {
    const getInvoice = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_invoice}${id}`);
        if (response && response.data) {
          const result = response.data.payload;

          setInvoice({
            date_and_time: result.date_and_time,
            customer_name: result.customer_name,
            customer_phone: result.customer_phone,
            customer_address: result.customer_address,
            total_price: result.subtotal,
            currency_type: result.currency_type,
            payment_type: result.payment_type,
            payment_method: result.payment_method,
            discount: result.discount,
            discount_type: result.discount_type,
            current_due: result.current_due,
            advance_pay: result.advance_pay,
            grand_total: result.grand_total,
            tax: result.tax,
          });

          setInvoice_Products(
            result.products.map(item => ({
              id: item.id || item.product_id,
              product: { value: item.product_id, label: item.product_name },
              unit_price: item.unit_price,
              quentity: item.quentity,
              unit_type: item.unit_type,
              price: item.price
            }))
          );

        }
      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getInvoice()
  }, [id]);


  return (
    <Layout>
      <section className='container-fluid my-5'>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <form className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Update Invoice</h4>
              <div className="row border-top border-warning pt-4">

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Date and Time</label>
                  <input type="date" name='date_and_time' value={invoice.date_and_time || ''} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Name</label>
                  <input type="text" name='customer_name' value={invoice.customer_name || ''} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Phone</label>
                  <input type="text" name='customer_phone' value={invoice.customer_phone || ''} onChange={handleChange} className='form-control rounded-0' />
                </div>

                <div className="col-md-3 mb-3">
                  <label className='form-label'>Customer Address</label>
                  <input type="text" name='customer_address' value={invoice.customer_address || ''} onChange={handleChange} className='form-control rounded-0' />
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
                    <div className="col-4 pe-1"><input type="text" value={invoice.total_price || ""} className="form-control rounded-0" readOnly /></div>
                    <div className="col-2 ps-1"><input type="text" value={invoice.currency_type || ""} className="form-control rounded-0" readOnly /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Discount :</label></div>
                    <div className="col-4 pe-1"><input type="number" name='discount' value={invoice.discount || ""} onChange={handleChange} min='0' max='100' className="form-control rounded-0" /></div>
                    <div className="col-2 ps-1">
                      <select className="form-select rounded-0" name='discount_type' value={invoice.discount_type || ""} onChange={handleChange}>
                        <option value='amount'>Tk</option>
                        <option value='percent'>%</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Tax :</label></div>
                    <div className="col-6"><input type="number" name='tax' value={invoice.tax || ""} onChange={handleChange} min='0' className="form-control rounded-0" /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Grand Total :</label></div>
                    <div className="col-6"><input type="text" name='grand_total' value={invoice.grand_total || ""} onChange={handleChange} className="form-control rounded-0" readOnly /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className="form-label d-block text-end">Advance Pay :</label></div>
                    <div className="col-6"><input type="number" name='advance_pay' value={invoice.advance_pay || ""} onChange={handleChange} min='0' className="form-control rounded-0" /></div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className='form-label d-block text-end'>Payment Types :</label></div>
                    <div className="col-6">
                      <select className="form-select rounded-0" name='payment_type' value={invoice.payment_type || ""} onChange={handleChange}>
                        <option value=''>Select Type</option>
                        <option value='partial_payment'>Partial Payment</option>
                        <option value='loan_payment'>Loan Payment</option>
                        <option value='full_payment'>Full Payment</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-2">
                    <div className="col-6"><label className='form-label d-block text-end'>Payment Method :</label></div>
                    <div className="col-6">
                      <select className="form-select rounded-0" name='payment_method' value={invoice.payment_method || ""} onChange={handleChange}>
                        <option value=''>Select Method</option>
                        <option value='cash'>Cash</option>
                        <option value='bank_transfer'>Bank Transfer</option>
                        <option value='mobile_banking'>Mobile Banking</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-6"><label className="form-label d-block text-end">Current Due :</label></div>
                    <div className="col-6"><input type="text" value={invoice.current_due || ""} className="form-control rounded-0 bg-danger text-white" readOnly /></div>
                  </div>

                </div>
              </div>

              <div className="d-flex align-items-center justify-content-end gap-2 mt-5">
                <div className="col-md-2 mt-3">
                  <Link to='/invoice-table' className='btn btn-danger rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-2 mt-3">
                  <button type="submit" className='btn btn-success rounded-0 w-100 custom_btn'>Update</button>
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

export default Update_Invoice
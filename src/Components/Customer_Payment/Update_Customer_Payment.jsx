import { useInvoice_Context } from '../../Context/Invoice_Context'
import { single_customer_payment, update_customer_payment } from '../../api_base_routes'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify'
import Select from 'react-select'
import axios from 'axios'

const Update_Customer_Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [customer_payment, setCustomer_Payment] = useState({ date_and_time: '', invoice_id: '', payable_amount: '', payment_method: '', payment_reference: '' })
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { invoice, updateInvoiceState, fetchInvoiceData, invoice_options_select, invoice_options_search } = useInvoice_Context()
  useEffect(() => { fetchInvoiceData(1) }, [invoice.search]);

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setCustomer_Payment((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  useEffect(() => {
    const getCustomerPayment = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_customer_payment}${id}`);
        if (response && response.data) {
          const result = response.data.payload;
          setCustomer_Payment({ date_and_time: result.date_and_time, payable_amount: result.payable_amount, payment_method: result.payment_method, payment_reference: result.payment_reference });
          updateInvoiceState({ options_value: { value: result.invoice_id, label: result.invoice_no } });
        }
      } catch (error) {
        toast.error(error.response.data || 'Internal Server Error');
        console.error('Internal Server Error', error);
      } finally {
        setLoading(false);
      }
    }
    getCustomerPayment()
  }, [id]);

  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const response = await axios.put(`${update_customer_payment}${id}`, {
        date_and_time: customer_payment.date_and_time,
        invoice_id: invoice.options_value?.value,
        payable_amount: customer_payment.payable_amount,
        payment_method: customer_payment.payment_method,
        payment_reference: customer_payment.payment_reference
      });

      if (response && response.data && response.data.success) {
        navigate('/customer-payment-table')
        toast.success(response.data.message || 'Update Success.');
        updateInvoiceState({ options_value: null });
      } else {
        alert(response.data.message || 'Field Error')
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className='container my-5'>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className='shadow-sm bg-light px-5 pt-3 pb-4'>
              <h4 className='form_heading py-4'>Update Customer Payment</h4>
              <div className="row border-top border-warning pt-4">
                <div className="col-md-12 mb-3">
                  <label className='form-label'>Invoice</label>
                  <Select
                    options={invoice.options}
                    value={invoice.options_value}
                    onChange={invoice_options_select}
                    onInputChange={invoice_options_search}
                    isLoading={invoice.isLoading}
                    placeholder={invoice.isLoading ? "Loading..." : "Select Invoice"}
                    isClearable={true}
                    styles={customStyles}
                    maxMenuHeight={300}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Date and Time</label>
                  <input type="date" name="date_and_time" value={customer_payment.date_and_time.split("T")[0] || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Payable Amount</label>
                  <input type="number" name="payable_amount" min='1' value={customer_payment.payable_amount || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Payment Method</label>
                  <select className="form-select rounded-0" name='payment_method' value={customer_payment.payment_method || ''} onChange={handleChange}>
                    <option value=''>Select Method</option>
                    <option value='cash'>Cash</option>
                    <option value='bank_transfer'>Bank Transfer</option>
                    <option value='mobile_banking'>Mobile Banking</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className='form-label'>Payment Reference</label>
                  <input type="text" name="payment_reference" value={customer_payment.payment_reference || ''} onChange={handleChange} className='form-control rounded-0' disabled={loading} />
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to='/customer-payment-table' className='btn btn-dark rounded-0 w-100 custom_btn'>Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className='btn btn-dark rounded-0 w-100 custom_btn'>{loading ? "Please Wait" : "Update"}</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Update_Customer_Payment
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import { single_invoice } from '../../api_base_routes';
import { MdOutlineBackspace } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';
import { RiPrinterLine } from "react-icons/ri";
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import './View_Invoice.css'
import axios from 'axios';
import Invoice_Print from './Invoice_Print';

const View_Invoice = () => {
  const { id } = useParams();
  const printRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [error_message, setError_message] = useState({});
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    const getInvoice = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_invoice}${id}`);
        if (response && response.data) {
          setInvoice(response.data.payload);
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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: invoice.invoice_no ?? id,
  });

  return (
    <Layout>
      <section className='container invoice_container'>
        <div className="row border p-3">
          <div className="col-md-12">
            <div className="row align-items-center border-bottom pb-3">
              <div className="col-md-6">
                <span className='d-block'>Ma electronics</span>
                <span className='d-block'>Jamnagar Bazar, Bagatipara, Natore</span>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-end gap-3">
                  <strong>Invoice ID :</strong>
                  <span>{invoice.invoice_no}</span>
                </div>
                <div className="d-flex align-items-center justify-content-end gap-3">
                  <strong>Date and Time :</strong>
                  <span>{invoice.date_and_time_formated}</span>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <strong className='d-block'>Pay To:</strong>
                <span className='d-block'>Customer Name : {invoice.customer_name}</span>
                <span className='d-block'>Customer Phone : {invoice.customer_phone}</span>
                <span className='d-block'>Customer Address : {invoice.customer_address}</span>
              </div>
            </div>

            <table className="table border mt-4">
              <thead>
                <tr>
                  <th scope="col" className="table-dark">Product Name</th>
                  <th scope="col" className="table-dark">Quentity</th>
                  <th scope="col" className="table-dark">Unit Price</th>
                  <th scope="col" className="table-dark">Price</th>
                </tr>
              </thead>
              <tbody>
                {invoice.products && invoice.products.length > 0 ? (
                  invoice.products.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.quentity + ' - ' + item.unit_type}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">No Products Found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="row justify-content-end">
              <div className="col-md-4">
                <ol className="list-group rounded-0">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Sub Total</span>
                    <span>{invoice.subtotal} {invoice.currency_type}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Discount</span>
                    <span>{invoice.discount} {invoice.discount_type === 'amount' ? 'Tk' : '%'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Tax</span>
                    <span>{invoice.tax} Tk</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Grand Total</span>
                    <span>{invoice.grand_total}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Advance Pay</span>
                    <span>{invoice.advance_pay}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Payment Type</span>
                    <span>{invoice.payment_type}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Payment Method</span>
                    <span>{invoice.payment_method}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center bg-danger text-white">
                    <span>Current Due</span>
                    <span>{invoice.current_due}</span>
                  </li>
                </ol>
              </div>
            </div>

            <table className="table border mt-5">
              <thead>
                <tr>
                  <th scope="col" className="table-dark">Payment Date</th>
                  <th scope="col" className="table-dark">Previous Due</th>
                  <th scope="col" className="table-dark">Payable Amount</th>
                  <th scope="col" className="table-dark">Payment Method</th>
                  <th scope="col" className="table-dark">Current Due</th>
                  <th scope="col" className="table-dark">Reference</th>
                  <th scope="col" className="table-dark">Received</th>
                </tr>
              </thead>
              <tbody>
                {invoice.customer_payment_history && invoice.customer_payment_history.length > 0 ? (
                  invoice.customer_payment_history.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.date_and_time_formated}</td>
                      <td>{payment.previous_due} TK</td>
                      <td>{payment.payable_amount} TK</td>
                      <td>{payment.payment_method}</td>
                      <td>{payment.current_due} Tk</td>
                      <td>{payment.payment_reference || 'N/A'}</td>
                      <td>{payment.received_by || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">No Payment Found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="invoice_footer_note mt-4">
              <p>Thank you for your business!</p>
              <p className="text-muted mb-0">This is a system-generated invoice and does not require a signature.</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3 mt-5 no-print">
          <Link to='/invoice-table' className='btn btn-danger rounded-0 d-flex align-items-center gap-1'><MdOutlineBackspace /> Back</Link>
          <button type='button' onClick={handlePrint} className='btn btn-success rounded-0 d-flex align-items-center gap-1' disabled={loading}><RiPrinterLine /> Print Invoice</button>
          <div ref={printRef} className="print-only" ><Invoice_Print invoice={invoice} /></div>
        </div>
      </section>
    </Layout>
  )
}

export default View_Invoice
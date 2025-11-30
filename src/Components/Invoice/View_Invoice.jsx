import { useNavigate, useParams } from 'react-router-dom';
import { single_invoice } from '../../api_base_routes';
import React, { useEffect, useState } from 'react'
import { useReactToPrint } from "react-to-print";
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import './View_Invoice.css'

const View_Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error_message, setError_message] = useState({});
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    const getInvoice = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_invoice}${id}`);
        if (response && response.data) {
          const result = response.data.payload;
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

            <table className="table border mt-5">
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
                ) : (<tr> <td colSpan="6" className="text-center">No Products Found</td> </tr>)}
              </tbody>
            </table>

            <div className="invoice_footer_note mt-4">
              <p>Thank you for your business!</p>
              <p className="text-muted mb-0">
                This is a system-generated invoice and does not require a
                signature.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  )
}

export default View_Invoice
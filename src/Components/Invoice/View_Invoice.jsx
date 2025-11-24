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
  console.log(invoice);

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
        <div className="row">
          <div className="col-md-12">
            <div className="row align-items-center border-bottom pb-3">
              <div className="col-md-6">
                <h2 className='invoice_section_title'>Invoice</h2>
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
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default View_Invoice
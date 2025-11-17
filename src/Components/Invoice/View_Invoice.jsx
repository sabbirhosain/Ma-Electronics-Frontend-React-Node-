import { useNavigate, useParams } from 'react-router-dom';
import { single_invoice } from '../../api_base_routes';
import React, { useEffect, useState } from 'react'
import { useReactToPrint } from "react-to-print";
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import { useRef } from "react";
import axios from 'axios';

const View_Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error_message, setError_message] = useState({});
  const [invoice, setInvoice] = useState({ item_name: '' });

  useEffect(() => {
    const getInvoice = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${single_invoice}${id}`);
        if (response && response.data) {
          const result = response.data.payload;
          setInvoice({});
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

    </Layout>
  )
}

export default View_Invoice
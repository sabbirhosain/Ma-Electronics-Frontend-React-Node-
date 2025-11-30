import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useCustomer_Payment_Context } from '../../Context/Customer_Payment_Context';

const Table_Customer_Payment = () => {
  const { customer_payment, fetchCustomerPaymentData, deleteCustomerPayment } = useCustomer_Payment_Context()
  useEffect(() => { fetchCustomerPaymentData(1) }, [customer_payment.search]);
  const onPageChange = (page) => { fetchCustomerPaymentData(page) }; // data table page change

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Invoice No",
      selector: row => row.invoice_no
    },
    {
      name: "Date and Time",
      selector: row => row.date_and_time_formated
    },
    {
      name: "Customer Name",
      selector: row => row.customer_name
    },
    {
      name: "Customer Phone",
      selector: row => row.customer_phone
    },
    {
      name: "Current Due",
      selector: row => row.current_due
    },
    {
      name: "Payable Amount",
      selector: row => row.payable_amount
    },
    {
      name: "Payment Method",
      selector: row => row.payment_method
    },
    {
      name: "Recevied By",
      selector: row => row.received_by ?? 'N/A'
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/customer-payment-update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => deleteCustomerPayment(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "150px"
    }
  ];

  if (customer_payment.error_message) {
    return <div className="text-center">{customer_payment.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={customer_payment.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={customer_payment.isLoading}
          paginationTotalRows={customer_payment.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Customer_Payment
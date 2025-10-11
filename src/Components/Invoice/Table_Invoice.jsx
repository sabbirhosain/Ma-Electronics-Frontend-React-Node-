import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import { useInvoice_Context } from '../../Context/Invoice_Context'

const Table_Invoice = () => {
  const { invoice, fetchInvoiceData } = useInvoice_Context()
  useEffect(() => { fetchInvoiceData(1) }, [invoice.search, invoice.from_date, invoice.to_date, invoice.payment_type, invoice.status]);
  const onPageChange = (page) => { fetchInvoiceData(page) };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
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
      name: "Total Price",
      selector: row => row.subtotal
    },
    {
      name: "Total Due",
      selector: row => row.total_due
    },
    {
      name: "Payment Type",
      selector: row => row.payment_type
    },
    {
      name: "Status",
      selector: row => row.status
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`#`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
        <Link to={`/product-update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => (row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "150px"
    }
  ];

  if (invoice.error_message) {
    return <div className="text-center">{invoice.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={invoice.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={invoice.isLoading}
          paginationTotalRows={invoice.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Invoice
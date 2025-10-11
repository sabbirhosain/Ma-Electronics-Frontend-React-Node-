import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import { usePurchase_Context } from "../../Context/Purchase_Context"
import { useProduct_Context } from "../../Context/Product_Context";

const Table_Purchase = () => {
  const { products } = useProduct_Context()
  const { purchase, fetchPurchaseData } = usePurchase_Context()
  useEffect(() => { fetchPurchaseData(1) }, [purchase.search, purchase.from_date, purchase.to_date, products.options_value]);
  const onPageChange = (page) => { fetchPurchaseData(page) }; // data table page change

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
      name: "Product Name",
      selector: row => row.product_name
    },
    {
      name: "Quentity",
      selector: row => row.quentity
    },
    {
      name: "Received",
      selector: row => row.received_by ?? 'N/A'
    },
    {
      name: "Supplier Name",
      selector: row => row.supplier_name ?? 'N/A'
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/purchase/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
        <Link to={`/purchase-update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => (row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "150px"
    }
  ];

  if (purchase.error_message) {
    return <div className="text-center">{purchase.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={purchase.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={purchase.isLoading}
          paginationTotalRows={purchase.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Purchase
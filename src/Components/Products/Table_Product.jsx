import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BsEyeFill } from 'react-icons/bs';
import { useProduct_Context } from '../../Context/Product_Context';
import { useCategories_Context } from '../../Context/Categories_Context';

const Table_Product = () => {
  const { products, fetchProductsData, deleteProduct } = useProduct_Context()
  const { categories } = useCategories_Context()
  useEffect(() => { fetchProductsData(1) }, [products.search, products.status, categories.options_value]);
  const onPageChange = (page) => { fetchProductsData(page) };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Product Name",
      selector: row => row.item_name
    },
    {
      name: "Catrgories Name",
      selector: row => row.categories_name
    },
    {
      name: "Quentity",
      selector: row => row.quentity_stock + ' - ' + row.unit_type_name
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
        <button type="button" onClick={() => deleteProduct(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "150px"
    }
  ];

  if (products.error_message) {
    return <div className="text-center">{products.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={products.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={products.isLoading}
          paginationTotalRows={products.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Product
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useCategories_Context } from '../../Context/Categories_Context';

const Table_Categories = () => {

  const { categories, fetchCategoriesData } = useCategories_Context()
  useEffect(() => { fetchCategoriesData(1) }, [categories.search]);
  const onPageChange = (page) => { fetchCategoriesData(page) }; // data table page change

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Catrgories Name",
      selector: row => row.categories_name
    },
    {
      name: "Items Count",
      selector: row => row.items_count
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/categories-update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        {row.items_count === 0 ? (<button type="button" onClick={() => (row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>) : (<button type="button" className="btn btn-dark rounded-0 btn-sm" disabled><BiTrash /></button>)}
      </div>,
      width: "150px"
    }
  ];

  if (categories.error_message) {
    return <div className="text-center">{categories.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={categories.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={categories.isLoading}
          paginationTotalRows={categories.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Categories
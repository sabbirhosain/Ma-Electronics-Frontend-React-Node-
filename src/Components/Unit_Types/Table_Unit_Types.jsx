import React, { useEffect } from 'react'
import { useUnitType_Context } from '../../Context/UnitType_Context'
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const Table_Unit_Types = () => {
  const { unit_types, fetchUnitTypesData } = useUnitType_Context()
  useEffect(() => { fetchUnitTypesData(1) }, [unit_types.search]);
  const onPageChange = (page) => { fetchUnitTypesData(page) };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Unit Name",
      selector: row => row.unit_name
    },
    {
      name: "Items Count",
      selector: row => row.items_count
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/unittype-update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        {row.items_count === 0 ? (<button type="button" onClick={() => (row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>) : (<button type="button" className="btn btn-dark rounded-0 btn-sm" disabled><BiTrash /></button>)}
      </div>,
      width: "150px"
    }
  ];

  if (unit_types.error_message) {
    return <div className="text-center">{unit_types.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={unit_types.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={unit_types.isLoading}
          paginationTotalRows={unit_types.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Unit_Types
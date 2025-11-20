import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';

const Invoice_Product_Table = () => {
  const columns = [
    {
      name: 'Items Name',
      selector: row => row.title,
    },
    {
      name: 'Unit Price',
      selector: row => row.year,
    },
    {
      name: 'Quentity',
      selector: row => row.year,
    },
    {
      name: 'Price',
      selector: row => row.year,
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to='#' className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => (row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>
    }
  ];

  const data = [
    {
      id: 1,
      title: 'Macbook Pro 2025',
      year: '1988',
    },
    {
      id: 2,
      title: 'Macbook Air 2025',
      year: '1984',
    },
  ]
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}

export default Invoice_Product_Table
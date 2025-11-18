import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useExpense_Context } from '../../Context/Expense_Context';

const Table_Expense = () => {
  const { expense, fetchExpenseData, deleteExpense } = useExpense_Context()
  useEffect(() => { fetchExpenseData(1) }, [expense.search]);
  const onPageChange = (page) => { fetchExpenseData(page) }; // data table page change

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
      name: "Attachment ",
      selector: row => (row.attachment ? <a href={row.attachment} target="_new" rel="noopener noreferrer"></a> : <span className="text-muted">No File</span>)
    },
    {
      name: "Expense Amount",
      selector: row => row.amount
    },
    {
      name: "Expense Type",
      selector: row => row.expense_type
    },
    {
      name: "Description",
      selector: row => row.description ?? "N/A"
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/expense-update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => deleteExpense(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "150px"
    }
  ];

  if (expense.error_message) {
    return <div className="text-center">{expense.error_message}</div>
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={expense.data}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={expense.isLoading}
          paginationTotalRows={expense.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default Table_Expense
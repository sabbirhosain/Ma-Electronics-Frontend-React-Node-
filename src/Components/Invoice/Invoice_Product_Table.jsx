import { BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import { useInvoice_Context } from '../../Context/Invoice_Context';

const Invoice_Product_Table = () => {
  const { invoice_products, setInvoice_Products, setDisabledProducts } = useInvoice_Context();

  const handleUpdate = (productValue, field, delta) => {
    setInvoice_Products(prev => {
      return prev.map(item => {
        if (item.product.value === productValue) {
          const currentValue = parseFloat(item[field]) || 0;
          const newValue = Math.max(currentValue + delta, 0);
          const updatedItem = { ...item, [field]: newValue };

          // recalculate price  
          const unit = parseFloat(updatedItem.unit_price) || 0;
          const qty = parseFloat(updatedItem.quentity) || 0;
          updatedItem.price = (unit * qty).toFixed(2);
          return updatedItem;
        }
        return item;
      });
    });
  };


  const handleDelete = (productValue) => {
    setDisabledProducts(prev => prev.filter(value => value !== productValue));
    setInvoice_Products(prev => prev.filter(item => item.product.value !== productValue));
  };

  const columns = [
    {
      name: 'Items Name',
      selector: row => row.product.label,
    },
    {
      name: 'Quantity',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <button type='button' className="btn btn-sm btn-danger rounded-0 me-2" onClick={() => handleUpdate(row.product.value, 'quentity', -1)}>-</button>
          <span>{row.quentity}</span>
          <button type='button' className="btn btn-sm btn-success rounded-0 ms-2" onClick={() => handleUpdate(row.product.value, 'quentity', 1)}>+</button>
        </div>
      )
    },
    {
      name: 'Unit Price',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <button type='button' className="btn btn-sm btn-danger rounded-0 me-2" onClick={() => handleUpdate(row.product.value, 'unit_price', -1)}>-</button>
          <span>{row.unit_price}</span>
          <button type='button' className="btn btn-sm btn-success rounded-0 ms-2" onClick={() => handleUpdate(row.product.value, 'unit_price', 1)}>+</button>
        </div>
      )
    },
    {
      name: 'Total',
      selector: row => row.price
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <button type="button" onClick={() => handleDelete(row.product.value)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={invoice_products}
      highlightOnHover
    />
  );
}

export default Invoice_Product_Table
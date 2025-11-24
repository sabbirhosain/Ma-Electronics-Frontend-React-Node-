import { BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import { useInvoice_Context } from '../../Context/Invoice_Context';

const Invoice_Product_Table = () => {
  const { invoice_products, setInvoice_Products, setDisabledProducts } = useInvoice_Context();

  const handleUpdate = (productValue, field, newValue) => {
    setInvoice_Products(prev =>
      prev.map(item => {
        if (item.product.value !== productValue) return item;
        const updatedItem = { ...item, [field]: Math.max(parseFloat(newValue) || 0, 0) };

        const unit = parseFloat(updatedItem.unit_price) || 0;
        const qty = parseFloat(updatedItem.quentity) || 0;
        updatedItem.price = (unit * qty).toFixed(2);
        return updatedItem;
      })
    );
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
      name: 'Quentity',
      cell: (row) => (
        <input type="number" value={row.quentity} min="0" className="form-control form-control-sm text-center rounded-0"
          onChange={(e) => { handleUpdate(row.product.value, "quentity", e.target.value) }} />
      )
    },
    {
      name: 'Unit Price',
      cell: (row) => (
        <input type="number" value={row.unit_price} min="0" step="0.1" className="form-control form-control-sm text-center rounded-0"
          onChange={(e) => { handleUpdate(row.product.value, "unit_price", e.target.value) }}
        />
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
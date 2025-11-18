import React, { useEffect, useState } from 'react'
import { useProduct_Context } from '../../Context/Product_Context';
import Select from 'react-select'

const Add_Product_Model = () => {
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { products, updateProductState, fetchProductsData, products_options_select, products_options_search } = useProduct_Context()
  useEffect(() => { fetchProductsData(1) }, [products.search]);

  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [invoice_products, setInvoice_Products] = useState([{ product_id: '', unit_price: '', quentity: '', price: '' }])

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setInvoice_Products((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  return (
    <div className="modal fade" id="exampleModal" data-bs-backdrop="static">
      <div className="modal-dialog modal-lg">
        <form className="modal-content rounded-0">
          <div className="modal-header">
            <h2 className="modal-title" style={{ fontSize: '18px', fontFamily: 'Poppins, sans-serif' }} id="exampleModalLabel">Add New Product</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="row modal-body">
            <div className="col-md-6 mb-3">
              <label className='form-label'>Items Name</label>
              <Select
                options={products.options}
                value={products.options_value}
                onChange={products_options_select}
                onInputChange={products_options_search}
                isLoading={products.isLoading}
                placeholder={products.isLoading ? "Loading..." : "Select Products"}
                isClearable={true}
                styles={customStyles}
                maxMenuHeight={300}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className='form-label'>Quentity</label>
              <input type="number" name="quentity" onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className='form-label'>Unit Price</label>
              <input type="number" name="unit_price" onChange={handleChange} className='form-control rounded-0' disabled={loading} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className='form-label'>Total Price</label>
              <input type="number" value={parseFloat(invoice_products.quentity) * parseFloat(invoice_products.unit_price) || 0} onChange={handleChange} className='form-control rounded-0' disabled={loading} readOnly />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary rounded-0 custom_btn" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary rounded-0 custom_btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add_Product_Model
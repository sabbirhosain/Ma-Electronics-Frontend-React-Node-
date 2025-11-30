import { useInvoice_Context } from '../../Context/Invoice_Context';
import { useProduct_Context } from '../../Context/Product_Context';
import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'

const Add_Product_Model = () => {
  const CloseRef = useRef()
  const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
  const { setInvoice_Products, disabledProducts, setDisabledProducts } = useInvoice_Context()
  const { products_filter, fetchProductsFilterData, products_options_select_filter, products_options_search_filter } = useProduct_Context()
  useEffect(() => { fetchProductsFilterData(1) }, [products_filter.search]);

  const [single_product, setSingle_Product] = useState({ product: null, unit_price: '', quentity: '', price: '' })
  const products_options_select = (select) => { setSingle_Product(prev => ({ ...prev, product: select })) };
  const resetFields = () => { setSingle_Product({ product: null, unit_price: '', quentity: '' }) };


  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    const newValue = type === "file" ? files[0] : value.trim();

    setSingle_Product((prev) => {
      const updated = { ...prev, [name]: newValue };
      const unit = parseFloat(updated.unit_price) || 0;
      const qty = parseFloat(updated.quentity) || 0;
      updated.price = (unit * qty).toFixed(2);
      return updated;
    });
  };


  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setInvoice_Products(prev => [...prev, single_product]); // add new object in invoice product
      setDisabledProducts(prev => [...prev, single_product.product.value]); //disabled after select
      setSingle_Product({ product: null, unit_price: '', quentity: '' }); // feild reset
      document.activeElement?.blur();
      CloseRef.current.click();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="exampleModal" data-bs-backdrop="static">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit} className="modal-content rounded-0">
          <div className="modal-header">
            <h2 className="modal-title" style={{ fontSize: '18px', fontFamily: 'Poppins, sans-serif' }} id="exampleModalLabel">Add New Product</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={CloseRef} />
          </div>
          <div className="row modal-body">
            <div className="col-md-6 mb-3">
              <label className='form-label'>Items Name</label>
              <Select
                options={products_filter.options.map(opt => ({ ...opt, isDisabled: disabledProducts.includes(opt.value) }))}
                value={single_product.product}
                onChange={products_options_select}
                onInputChange={products_options_search_filter}
                isLoading={products_filter.isLoading}
                placeholder={products_filter.isLoading ? "Loading..." : "Select Products"}
                isClearable={true}
                styles={customStyles}
                maxMenuHeight={300}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className='form-label'>Quentity</label>
              <input type="number" name="quentity" min='1' value={single_product.quentity} onChange={handleChange} className='form-control rounded-0' required />
            </div>
            <div className="col-md-6 mb-3">
              <label className='form-label'>Unit Price</label>
              <input type="number" name="unit_price" min='1' step='0.1' value={single_product.unit_price} onChange={handleChange} className='form-control rounded-0' required />
            </div>
            <div className="col-md-6 mb-3">
              <label className='form-label'>Total Price</label>
              <input type="number" value={single_product.price || 0} onChange={handleChange} className='form-control rounded-0' readOnly />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={resetFields} className="btn btn-secondary rounded-0 custom_btn">Reset</button>
            <button type="submit" className="btn btn-primary rounded-0 custom_btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add_Product_Model
const Invoice_Print = ({ invoice }) => {

  return (
    <div className="bg-white">
      <div className="row align-items-center border-bottom pb-3">
        <div className="col-md-6">
          <span className='d-block'>Ma electronics</span>
          <span className='d-block'>Jamnagar Bazar, Bagatipara, Natore</span>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-end gap-3">
            <strong>Invoice ID :</strong>
            <span>{invoice.invoice_no}</span>
          </div>
          <div className="d-flex align-items-center justify-content-end gap-3">
            <strong>Date and Time :</strong>
            <span>{invoice.date_and_time_formated}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice_Print
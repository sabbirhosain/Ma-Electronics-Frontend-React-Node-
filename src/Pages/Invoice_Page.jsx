import Table_Invoice from '../Components/Invoice/Table_Invoice'
import { useInvoice_Context } from '../Context/Invoice_Context'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'

const Invoice_Page = () => {
    const { updateInvoiceState } = useInvoice_Context()

    return (
        <Layout>
            <section className=''>
                <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Invoice List</h4>
                    <Link to='/invoice-create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>

                <div className="row justify-content-end bg-light shadow-sm p-3">
                    <div className="col-md-12"></div>
                    <div className="col-md-3 mb-2">
                        <div className='w-100'>
                            <input type="date" onChange={(event) => updateInvoiceState({ from_date: event.target.value })} className="form-control rounded-0" />
                        </div>
                    </div>
                    <div className="col-md-3 mb-2">
                        <div className='w-100'>
                            <input type="date" onChange={(event) => updateInvoiceState({ to_date: event.target.value })} className="form-control rounded-0" />
                        </div>
                    </div>
                    <div className="col-md-3 mb-2">
                        <div className='w-100'>
                            <select onChange={(event) => updateInvoiceState({ payment_type: event.target.value })} className="form-select rounded-0">
                                <option value=''>Payment Types</option>
                                <option value='full'>Full</option>
                                <option value='partial'>Partial</option>
                                <option value='credit'>Credit</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 mb-2">
                        <div className='w-100'>
                            <select onChange={(event) => updateInvoiceState({ status: event.target.value })} className="form-select rounded-0">
                                <option value=''>Select Status</option>
                                <option value='paid'>Paid</option>
                                <option value='due'>Due</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className='w-100'>
                            <input type="search" onChange={(event) => updateInvoiceState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
                        </div>
                    </div>
                </div>

                <div className='pt-2 pb-5'>
                    <Table_Invoice />
                </div>
            </section>
        </Layout>
    )
}

export default Invoice_Page
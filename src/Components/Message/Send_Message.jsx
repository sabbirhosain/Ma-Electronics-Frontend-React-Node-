import { useInvoice_Context } from "../../Context/Invoice_Context";
import { BiMessageDetail } from "react-icons/bi";
import { TiCancelOutline } from "react-icons/ti";
import { RxReset } from "react-icons/rx";
import Layout from '../../Layout/Layout'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from 'react-select'

const Send_Message = () => {
    const [loading, setLoading] = useState(false);
    const [error_message, setError_message] = useState({});
    const [customer_message, setCustomer_Message] = useState({ person_number: "", message_type: "", message_text: "", message_checkbox: false });
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Poppins, sans-serif" }) };
    const { invoice_filter, updateInvoiceFilterState, fetchInvoiceFilterData, invoice_options_select, invoice_options_search } = useInvoice_Context()
    useEffect(() => { fetchInvoiceFilterData(1) }, [invoice_filter.search]);


    const handleChange = (event) => {
        const { name, value, files, type } = event.target;
        setCustomer_Message((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
        setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
    };

    return (
        <Layout>
            <section className='login_section'>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-8">
                            <form className='border p-3 p-md-5'>
                                <h2 className="form_heading pb-4">Customer Message</h2>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label className='form-label'>Select Person</label>
                                        <Select
                                            options={invoice_filter.options}
                                            value={invoice_filter.options_value}
                                            onChange={invoice_options_select}
                                            onInputChange={invoice_options_search}
                                            isLoading={invoice_filter.isLoading}
                                            placeholder={invoice_filter.isLoading ? "Loading..." : "Select Invoice"}
                                            isClearable={true}
                                            styles={customStyles}
                                            maxMenuHeight={300}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className='form-label'>Message Types</label>
                                        <select className="form-select rounded-0">
                                            <option value=''>Select</option>
                                            <option value='option'>Option-1</option>
                                            <option value='option'>Option-2</option>
                                            <option value='option'>Option-3</option>
                                            <option value='option'>Option-4</option>
                                            <option value='custome'>Custome</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className='form-label'>Write Your Message</label>
                                        <div className="position-relative">
                                            <textarea rows='3' name="message_text" onChange={handleChange} maxLength='100' className="form-control rounded-0" placeholder="Write Hear..."></textarea>
                                            <span className="customer_message_count">{customer_message.message_text.length} / 100</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input rounded-0" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">I want to send a message.</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="d-flex align-items-center justify-content-start gap-3">
                                            <Link to='/' className='message_action_btn btn btn-danger rounded-0'><TiCancelOutline />Cancel</Link>
                                            <button type="submit" className='message_action_btn btn btn-warning rounded-0'><RxReset />Reset</button>
                                            <button type="submit" className='message_action_btn btn btn-success rounded-0'><BiMessageDetail />Send</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Send_Message
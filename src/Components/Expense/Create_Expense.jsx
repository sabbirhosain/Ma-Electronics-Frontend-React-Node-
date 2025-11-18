import { create_expense } from "../../api_base_routes";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Create_Expense = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error_message, setError_message] = useState({});
  const [expense, setExpense] = useState({ date_and_time: "", expense_type: "", amount: "", description: "", attachment: null });

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setExpense((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value.trim() }));
    setError_message((prev) => ({ ...prev, [name]: null })); // remove error if input
  };

  // --- Form Submit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError_message({});

    try {
      const formData = new FormData();
      formData.append("date_and_time", expense.date_and_time);
      formData.append("expense_type", expense.expense_type);
      formData.append("amount", expense.amount);
      formData.append("description", expense.description || null);
      if (expense.attachment) { formData.append("attachment", expense.attachment) }

      const response = await axios.post(create_expense, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response && response.data && response.data.success) {
        navigate("/expense-table");
        toast.success(response.data.message || "Create Success.");
      } else {
        alert(response.data.message || "Field Error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit} className="shadow-sm bg-light px-5 pt-3 pb-4">
              <h4 className="form_heading py-4">Create Expense</h4>
              <div className="row border-top border-warning pt-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date and Time</label>
                  <input type="date" name="date_and_time" onChange={handleChange} className="form-control rounded-0" disabled={loading} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expense Type</label>
                  <input type="text" name="expense_type" onChange={handleChange} className="form-control rounded-0" disabled={loading} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expense Amount</label>
                  <input type="number" name="amount" onChange={handleChange} className="form-control rounded-0" disabled={loading} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Attachment</label>
                  <input type="file" name="attachment" onChange={handleChange} className="form-control rounded-0" disabled={loading} />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea row='2' name="description" onChange={handleChange} className="form-control rounded-0" disabled={loading} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <Link to="/expense-table" className="btn btn-dark rounded-0 w-100 custom_btn">Cancel</Link>
                </div>
                <div className="col-md-6 mt-3">
                  <button type="submit" className="btn btn-dark rounded-0 w-100 custom_btn">{loading ? "Please Wait" : "Create"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Create_Expense
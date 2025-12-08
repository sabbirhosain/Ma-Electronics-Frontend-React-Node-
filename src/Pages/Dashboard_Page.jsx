import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useDashboard_Context } from '../Context/Dashboard_Context'
import Dashboard_Bar_Chart from '../Components/Dashboard/Dashboard_Bar_Chart'

const Dashboard_Page = () => {
  const { dashboard, updateDashboardState, fetchDashboardData } = useDashboard_Context()
  useEffect(() => { fetchDashboardData(1) }, [dashboard.search]);



  return (
    <Layout>
      <section className='dashboard_section'>
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>{dashboard.data.net_profit_today || 0}</h1>
                <h6 className='dashboard_card_title'>Net Profit</h6>
                <span className='dashboard_card_badge'>Daily</span>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>{dashboard.data.total_cash_today || 0}</h1>
                <h6 className='dashboard_card_title'>Total Cash</h6>
                <span className='dashboard_card_badge'>Daily</span>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>{dashboard.data.total_expense_today || 0}</h1>
                <h6 className='dashboard_card_title'>Total Expense</h6>
                <span className='dashboard_card_badge'>Daily</span>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>{dashboard.data.total_sell_today || 0}</h1>
                <h6 className='dashboard_card_title'>Total Sell</h6>
                <span className='dashboard_card_badge'>Daily</span>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>{dashboard.data.total_products || 0}</h1>
                <h6 className='dashboard_card_title'>Total Products</h6>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>{dashboard.data.total_purchase_quantity_today || 0}</h1>
                <h6 className='dashboard_card_title'>Total Purchase</h6>
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <Dashboard_Bar_Chart />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Dashboard_Page
import React from 'react'
import Layout from '../Layout/Layout'

const Dashboard_Page = () => {
  return (
    <Layout>
      <section className='dashboard_section'>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Total Order</h6>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Complete Order</h6>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Pending Order</h6>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Total Users</h6>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Total purchase</h6>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Total Expense</h6>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className='dashboard_card'>
                <h1 className='dashboard_card_count'>10</h1>
                <h6 className='dashboard_card_title'>Total Profit</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Dashboard_Page
import React from 'react';

function Details() {
  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Recent Orders</h2>
          <a href="#" className="btn">View All</a>
        </div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Payment</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Star Refrigerator</td>
              <td>$1200</td>
              <td>Paid</td>
              <td><span className="status delivered">Delivered</span></td>
            </tr>
            <tr>
              <td>Dell Laptop</td>
              <td>$110</td>
              <td>Due</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>Apple Watch</td>
              <td>$1200</td>
              <td>Paid</td>
              <td><span className="status return">Return</span></td>
            </tr>
            <tr>
              <td>Addidas Shoes</td>
              <td>$620</td>
              <td>Due</td>
              <td><span className="status inProgress">In Progress</span></td>
            </tr>
            <tr>
              <td>Star Refrigerator</td>
              <td>$1200</td>
              <td>Paid</td>
              <td><span className="status delivered">Delivered</span></td>
            </tr>
            <tr>
              <td>Dell Laptop</td>
              <td>$110</td>
              <td>Due</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>Apple Watch</td>
              <td>$1200</td>
              <td>Paid</td>
              <td><span className="status return">Return</span></td>
            </tr>
            <tr>
              <td>Addidas Shoes</td>
              <td>$620</td>
              <td>Due</td>
              <td><span className="status inProgress">In Progress</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="recentCustomers">
        <div className="cardHeader">
          <h2>Recent Customers</h2>
        </div>
        <table>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer02.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>David <br /> <span>Italy</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer01.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>Amit <br /> <span>India</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer02.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>David <br /> <span>Italy</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer01.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>Amit <br /> <span>India</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer02.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>David <br /> <span>Italy</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer01.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>Amit <br /> <span>India</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer01.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>David <br /> <span>Italy</span></h4>
            </td>
          </tr>
          <tr>
            <td width="60px">
              <div className="imgBx"><img src="/assets/imgs/customer02.jpg" alt="Customer" /></div>
            </td>
            <td>
              <h4>Amit <br /> <span>India</span></h4>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Details;

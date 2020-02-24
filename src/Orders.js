import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";

const cookies = new Cookies();

const Orders = props => {
  const [orders, setOrders] = useState([]);

  // const token = cookies.get("CUSTJWT");
  const token = localStorage.getItem("CUSTJWT");
  const url = `http://admin.2qn4ziu8xq.us-east-1.elasticbeanstalk.com/getorders/${props.match.params.id}`;
  console.log("tokentosend: " + token);
  console.log(url);
  const fetchOrders = () => {
    axios({
      method: "get",
      url: url,
      headers: { Authorization: "Bearer " + token }
    }).then(response => {
      console.log(response);
      setOrders(response.data);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      Header: "Order Details",
      columns: [
        {
          Header: "Product Id",
          accessor: "productId"
        },
        {
          Header: "Order Total",
          accessor: "productName"
        },
        {
          Header: "Product Price",
          accessor: "price"
        },
        {
          Header: "Amount Ordered",
          accessor: "quantity"
        }
      ]
    }
  ];

  const columns1 = [
    {
      Header: "Order",
      columns: [
        {
          Header: "Order Id",
          accessor: "orderId"
        },
        {
          Header: "Order Total",
          accessor: "orderTotal"
        },
        {
          Header: "Order Time",
          accessor: "timeOfOrder"
        },
        {
          Header: "Order Time",
          accessor: "orders.orderItems"
        }
      ]
    }
  ];

  //<Table columns={columns} data={orders} />;
  return orders.map((order, index) => {
    return (
      <div className="orders" key={index}>
        <h2>
          Order Id: {order.orderId}, Order Time: {order.timeOfOrder}
        </h2>

        <Fragment>
          <Table columns={columns} data={order.orderItems} />
        </Fragment>

        <h3>Order Total : {order.orderTotal}</h3>
      </div>
    );
  });
};

/*
 
*/
/*  {order.orderItems.map((item, ind) => {
          return (
            <div key={ind}>
              <p>
                <span className="subitem">Product Id: {item.productId}</span>
                <span className="subitem">Product Name: {item.productName}</span>
                <span className="subitem">Price: {item.price}</span>
                <span className="subitem">Amount Ordered: {item.quantity}</span>
              </p>
            </div>

          );
        })}
        */

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table className="table table-dark table-hover" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Orders;

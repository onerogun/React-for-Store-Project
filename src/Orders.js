import React, { useEffect, useState, Fragment, useContext } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useTable } from "react-table";
import { ProductContext } from "./ProductSource/ProductContext";
import { ServerContext } from "./ServerContext";

const cookies = new Cookies();

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [server, setServer] = useContext(ServerContext);


  // const token = cookies.get("CUSTJWT");
  const token = localStorage.getItem("CUSTJWT");
  //const url = `http://admin.2qn4ziu8xq.us-east-1.elasticbeanstalk.com/getorders/${props.match.params.id}`;
  const url = `${server}/getorders/${props.match.params.id}`;
  console.log("tokentosend: " + token);
  console.log(url);
  const fetchOrders = () => {
    axios({
      method: "get",
      url: url,
      headers: { Authorization: "Bearer " + token },
    }).then((response) => {
      console.log(response);
      setOrders(response.data);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const [
    products,
    setProducts,
    tokenFetched,
    setTokenFetched,
    customer,
    setCustomer,
  ] = useContext(ProductContext);
  //const [tokenFetched, setTokenFetched] = useContext(CustomerContext);

  useEffect(() => {
    setTokenFetched(token);
  }, []);

  const columns = [
    {
      Header: "Order Details",
      columns: [
        {
          Header: "Product Id",
          accessor: "productId",
        },
        {
          Header: "Product Name",
          accessor: "productName",
        },
        {
          Header: "Product Price",
          accessor: "price",
        },
        {
          Header: "Amount Ordered",
          accessor: "quantity",
        },
      ],
    },
  ];

  const columns1 = [
    {
      Header: "Order",
      columns: [
        {
          Header: "Order Id",
          accessor: "orderId",
        },
        {
          Header: "Product Name",
          accessor: "orderTotal",
        },
        {
          Header: "Order Time",
          accessor: "timeOfOrder",
        },
        {
          Header: "Order Time",
          accessor: "orders.orderItems",
        },
      ],
    },
  ];

  //<Table columns={columns} data={orders} />;
  return (
    <React.Fragment>
      <div className="mr-auto ml-5">
        <span>Logged in user: {customer.userName}</span>
      </div>
      {orders.map((order, index) => {
        return (
          <div className="mt-5" key={index}>
            <h2>
              Order Id: {order.orderId}, Order Time: {order.timeOfOrder}
            </h2>

            <Fragment>
              <Table columns={columns} data={order.orderItems} />
            </Fragment>

            <h3>Order Total : {order.orderTotal.toFixed(2)}</h3>
          </div>
        );
      })}
    </React.Fragment>
  );
};

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table className="table table-dark table-hover" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
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
              {row.cells.map((cell) => {
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

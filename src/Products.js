import React, { useEffect, useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Cookies } from "react-cookie";
import axios from "axios";
import { ServerContext } from "./ServerContext";

const cookies = new Cookies();

//const csrfToken = cookies.get("XSRF-TOKEN");

const Products = () => {
  const [products, setProducts] = useState([]);
  const [server, setServer] = useContext(ServerContext);
  const url = `${server}/getproducts`;

  // const token = cookies.get("MYJWT");

  const token = localStorage.getItem("MYJWT");

  const fetchProducts = () => {
    axios({
      method: "get",
      url: url,
      headers: { Authorization: "Bearer " + token },
    }).then((response) => {
      console.log(response);
      setProducts(response.data);
    });
  };

  /*  axios
      .get("http://localhost:5000/getproducts", {
        headers: {
          Auth: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken
        }
      })
      .then(response => {
        console.log(response);
        setProducts(response.data);
      });
  };
*/
  useEffect(() => {
    fetchProducts();
  }, []);

  return products.map((product, index) => {
    return (
      <div className="component" key={index}>
        {product.productId ? (
          <img
            alt=""
            src={`${server}/getproducts/getimage/${product.productId}`}
          />
        ) : null}
        <br />
        <h1>{product.productName}</h1>
        <p>ID: {product.productId}</p>
        <p>Price: ${product.price}</p>
        <MyDropzone {...product} />
        <br />
      </div>
    );
  });
};

function MyDropzone({ productId }) {
  const [server, setServer] = useContext(ServerContext);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    console.log(file);
    const token = localStorage.getItem("MYJWT");
    const formData = new FormData();
    formData.append("file", file);
    console.log(productId);
    console.log(token);
    //  console.log(csrfToken);
    //   var csrfToken = cookies.get("XSRF-TOKEN");

    axios
      .post(
        `${server}/getproducts/saveimage/${productId}`,
        formData,
        {
          headers: {
            //     "X-XSRF-TOKEN": csrfToken,
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        console.log("file successfully uploaded");
        //      console.log(csrfToken);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log("failed!!!");
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropZone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select image</p>
      )}
    </div>
  );
}

export default Products;

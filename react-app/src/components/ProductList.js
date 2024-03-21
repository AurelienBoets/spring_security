import React, { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { getUserDetails } from "../helpers/user-details";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const userDetails = getUserDetails();
  const isAdmin = () => {
    return userDetails && userDetails.role === "ROLE_ADMIN";
  };

  useEffect(() => {
    productService
      .getAllProducts()
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des produits.");
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    productService
      .deleteProduct(productId)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        setError("Erreur lors de la suppression du produit.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Product List</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            {isAdmin() && <th></th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              {isAdmin() && (
                <>
                  <td>
                    <span
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Supprimer
                    </span>
                    <span
                      className="btn btn-warning"
                      onClick={() => navigate(`/edit-product?id=${product.id}`)}
                    >
                      Modifier
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;

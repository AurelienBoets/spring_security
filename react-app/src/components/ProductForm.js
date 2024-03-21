import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productService } from "../services/productService";

const ProductForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isEditing, setIsEditing] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
  });

  useEffect(() => {
    setIsEditing(id !== null);
    if (isEditing) {
      productService
        .getProductById(id)
        .then((response) => {
          const { name, price } = response.data;
          setProductData({ name, price });
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, price } = productData;
      if (isEditing) {
        await productService.updateProduct(id, name, price);
        console.log("Produit modifié");
      } else {
        await productService.createProduct(name, price);
        console.log("Product enregistré");
      }
      navigate("/products");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditing ? "Modifier le produit" : "Ajouter un produit"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Prix
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Modifier" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

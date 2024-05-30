import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();
const host = process.env.REACT_APP_HOST_DOM  || 'http://localhost:5000';

const ProductProvider = ({ children }) => {
  // products state
  const [products, setProducts] = useState([]);
  // fetch products

  const fetchProducts = async () => {
    try {
      // http://localhost:5000/api/products/getProducts
      const response = await fetch(`${host}/api/products/getProducts`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      console.log(products);
      setProducts(products);
      // console.log("Products fetched:", products);
    } catch (error) {
      console.error('Error fetching products from api:', error);
    }
  };


  useEffect(() => {

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

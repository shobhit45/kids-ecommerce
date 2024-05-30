import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from '../components/Product'
import Hero from '../components/Hero'
import BarcodeScanner from "../components/BarcodeScanner";
import { SidebarContext } from "../contexts/SidebarContext";

const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);
  const { barCode, setbarCode } = useContext(SidebarContext)
  const filteredProducts = products;
  const toggleBarCode = () => {
    setbarCode(!barCode); // Toggle the state when called
  };
  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
          <div className="h-auto my-6">
            {/* <BarcodeScanner /> */}

            <div className="flex items-center justify-center">
              {!barCode ? (
                <div onClick={toggleBarCode} className="bg-black text-center md:w-[15vw] text-white font-bold text-sm hover:bg-gray-700 px-3 py-2">
                  Scan the barcode
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <BarcodeScanner />
                  <div onClick={toggleBarCode} className="m-1 bg-black text-center md:w-[15vw] text-white font-bold text-sm hover:bg-gray-700 px-3 py-2">
                    Close
                  </div>
                </div>
              )}

            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts && filteredProducts.map((product) => {
              return (
                <Product product={product} key={product.id} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

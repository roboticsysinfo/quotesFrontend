import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProductList from "../components/ProductList";

const ProductListPage = () => {
  return (
    <>

      {/* MasterLayout */}

      <MasterLayout>
        
        {/* Breadcrumb */}
        <Breadcrumb title='Products List For Redeem' />


        <ProductList />


      </MasterLayout>

    </>

  );
};

export default ProductListPage;

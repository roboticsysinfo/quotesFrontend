import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import QuoteImageManager from "../components/QuoteImageManager";



const QuoteImagePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Image Quotes" />

        <QuoteImageManager />

      </MasterLayout>

    </>
  );
};

export default QuoteImagePage; 

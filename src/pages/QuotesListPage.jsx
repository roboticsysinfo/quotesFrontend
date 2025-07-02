import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import QuotesList from "../components/QuotesList";



const QuotesListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Image/Video Quotes" />

        <QuotesList />

      </MasterLayout>

    </>
  );
};

export default QuotesListPage; 

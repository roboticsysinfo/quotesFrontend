import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UploadQuoteForm from "../components/UploadQuoteForm";


const UploadQuotePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Upload Quote" />

        <UploadQuoteForm />


      </MasterLayout>
    </>
  );
};

export default UploadQuotePage;

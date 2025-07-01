import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AlertLayer from "../components/AlertLayer";
import QuoteCategoryManager from "../components/QuoteCategoryManager";


const QuoteCategoryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Manage Category" />

        <QuoteCategoryManager />


      </MasterLayout>
    </>
  );
};

export default QuoteCategoryPage;

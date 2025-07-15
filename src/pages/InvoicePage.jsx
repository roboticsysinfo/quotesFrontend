import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import RedeemProductInvoice from "../components/RedeemProductInvoice";


const InvoicePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Invoice" />

        <RedeemProductInvoice />

      </MasterLayout>
    </>
  );
};

export default InvoicePage;

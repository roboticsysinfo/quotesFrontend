import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import RedeemProductHistoryList from "../components/RedeemProductHistoryList";


const RedeemProductHistoryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Product Redeem History" />

        <RedeemProductHistoryList />

      </MasterLayout>
    </>
  );
};

export default RedeemProductHistoryPage;

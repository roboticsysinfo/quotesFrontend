import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UserPointsTxnHistoryList from "../components/UserPointsTxnHistoryList";


const UserPointsTxnHistoryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Points Transactoin History" />

        <UserPointsTxnHistoryList />


      </MasterLayout>
    </>
  );
};

export default UserPointsTxnHistoryPage;

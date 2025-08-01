import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UserReferralList from "../components/UserReferralList";

const UserReferralPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Referral List' />

        <UserReferralList />

      </MasterLayout>
    </>
  );
};

export default UserReferralPage;

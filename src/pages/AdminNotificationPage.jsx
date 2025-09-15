import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AdminNotificationManager from "../components/AdminNotificationManager";

const AdminNotificationPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Admin Notification' />

        {/* AddBlogLayer */}
        <AdminNotificationManager />
      </MasterLayout>
    </>
  );
};

export default AdminNotificationPage;

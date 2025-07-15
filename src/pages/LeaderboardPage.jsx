import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UserLeaderBoard from "../components/UserLeaderBoard";

const LeaderboardPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title='Leaderboard' />

        <UserLeaderBoard />

      </MasterLayout>
      
    </>
  );
};

export default LeaderboardPage;

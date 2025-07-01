import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UploadQuoteImage from "../components/UploadQuoteImage";


const UploadQouteImagePage = () => {

    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Upload Quote Image" />

                <UploadQuoteImage />


            </MasterLayout>
        </>
    );

};

export default UploadQouteImagePage;

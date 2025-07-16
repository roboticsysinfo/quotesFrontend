import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditQuoteForm from "../components/EditQuoteForm";


const EditQoutesPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Edit" />

                <EditQuoteForm />


            </MasterLayout>
        </>
    );
};

export default EditQoutesPage;

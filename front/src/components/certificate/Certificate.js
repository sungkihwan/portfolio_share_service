import React, { useState, useEffect } from "react";
import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";
import * as Api from "../../api";


function Certificate({ certificateId, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);
    const [certificate, setCertificate] = useState(null);


    useEffect(() => {
        Api.get(`certificatelist`, certificateId).then((res) => setCertificate(res.data));
    }, [certificateId]);

    return (

        <>
            {isEditing ? (
                <CertificateEditForm
                    certificate={certificate}
                    setIsEditing={setIsEditing}
                    setCertificate={setCertificate}
                />
            ) : (
                <CertificateCard
                    certificate={certificate}
                    setIsEditing={setIsEditing}
                    isEditable={isEditable}
                />
            )}
        </>
    )

}


export default Certificate;
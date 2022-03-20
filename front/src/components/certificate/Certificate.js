import React, { useState } from 'react';
import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';

function Certificate({ certificate, setCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setIsEditing={setIsEditing}
          setCertificates={setCertificates}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Certificate;
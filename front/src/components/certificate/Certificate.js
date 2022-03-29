import React, { useState } from 'react';
import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';

function Certificate({ certificate, setCertificates, isEditable, setIsDeleted }) {
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
          setIsDeleted={setIsDeleted}
        />
      )}
    </>
  );
}

export default Certificate;

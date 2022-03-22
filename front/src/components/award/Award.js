import React, { useState } from 'react';
import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';


function Award({ award, setAwards, isEditable, setIsDeleted }) {
  const [isEditing, setIsEditing] = useState(false);


  return (
    <>
      {isEditing ? (
        <AwardEditForm
          award={award}
          setIsEditing={setIsEditing}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          award={award}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          setIsDeleted={setIsDeleted}
        />
      )}



    </>
  );
}

export default Award;

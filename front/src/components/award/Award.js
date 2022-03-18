import React, { useState, useEffect } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";
import * as Api from "../../api";


function Award({ award, setAwards, isEditable }) {
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
                />
            )}
        </>
    );
}


export default Award;
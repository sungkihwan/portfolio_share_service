import React, { useState, useEffect } from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";
import * as Api from "../../api";


function Award({ awardId, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);
    const [award, setAward] = useState(null);

    useEffect(() => {
        Api.get("awardlist", awardId).then((res) => setAward(res.data));
    }, [awardId]);

    return (
        <>
            {isEditing ? (
                <AwardEditForm
                    award={award}
                    setIsEditing={setIsEditing}
                    setAward={setAward}
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
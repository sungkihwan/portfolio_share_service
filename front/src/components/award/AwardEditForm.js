import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";


function AwardEditForm({ currentAward, setIsEditing, setAwards }) {
    const [title, setTitle] = useState(currentAward.title);
    const [description, setDescription] = useState(currentAward.description);


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();


        const user_id = currentAward.user_id;

        await Api.put(`awards/${currentAward.id}`, {
            user_id,
            title,
            description
        });

        const res = await Api.get('awardlist', user_id);


        const updatedAward = res.data;
        setAwards(updatedAward);

        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formTitle'>
                <Form.Control
                    type='text'
                    placeholder='수상내역'
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formDescription'>
                <Form.Control
                    type='text'
                    placeholder='상세내역'
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row}>
                <Col>
                    <Button variant='primary' type='submit'>
                        확인
                    </Button>
                    <Button variant='secondary' onClick={(e) => setIsEditing(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form >
    )

}


export default AwardEditForm;
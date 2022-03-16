import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function CertificateEditForm({ currentCertificate, setIsEditing, setCertificates }) {
    const [title, setTitle] = useState(currentCertificate?.title);
    const [description, setDescription] = useState(currentCertificate?.description);
    const [whenDate, setWhenDate] = useState(currentCertificate?.when_date);


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();


        const user_id = currentCertificate?.user_id;
        const when_date = currentCertificate?.when_date;

        await Api.put(`certificates/${currentCertificate.id}`, {
            user_id,
            title,
            description,
            when_date
        });

        const res = await Api.get('certificatelist', user_id);


        const updatedCertificate = res.data;
        setCertificates(updatedCertificate);

        setIsEditing(false);

    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formTitle'>
                <Form.Control
                    type='text'
                    placeholder='자격증 제목'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formDescription'>
                <Form.Control
                    type='text'
                    placeholder='상세내역'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formWhenDate'>
                <DatePicker
                    selected={whenDate}
                    onChange={(e) => setWhenDate(e.target.value)}
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


export default CertificateEditForm;
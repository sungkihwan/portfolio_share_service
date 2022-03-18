import React, { useState, useEffect } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function CertificateEditForm({ certificate, setCertificate, setIsEditing, }) {

    /*  console.log('certificates', certificate); */
    const { id, title, description, when_date, user_id } = certificate;
    const [whenDate, setWhenDate] = useState(new Date());
    const convertedWhen_date = certificate.when_date;

    useEffect(() => {
        setCertificate({ ...certificate, when_date: convertedWhen_date });
    }, [])



    const handleSubmit = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        try {
            await Api
                .put(`certificates/${id}`, {
                    user_id,
                    title,
                    description,
                    when_date
                })

            const res = await Api.get(`certificatelist/${user_id}`, {
                title: certificate.title,
                description: certificate.description,
                when_date: certificate.when_date
            });

            const updatedCertificate = res.data;
            setCertificate(updatedCertificate);
            setIsEditing(false);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formTitle'>
                <Form.Control
                    type='text'
                    placeholder='자격증 제목'

                    value={title || ''}
                    onChange={(e) => setCertificate({ ...certificate, title: e.target.value })}

                />
            </Form.Group>

            <Form.Group controlId='formDescription'>
                <Form.Control
                    type='text'
                    placeholder='상세내역'

                    value={description || ''}
                    onChange={(e) => setCertificate({ ...certificate, description: e.target.value })}

                />
            </Form.Group>

            <Form.Group controlId='formWhenDate'>
                <DatePicker

                    selected={whenDate || ''} dateFormat='yyyy/MM/dd'
                    onChange={date => setWhenDate(date)}

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
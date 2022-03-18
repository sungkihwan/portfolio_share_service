import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function CertificateAddForm({ setCertificates, portfolioOwnerId, setIsAdding }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [whenDate, setWhenDate] = useState(new Date());


    const dateToString = whenDate.toISOString().substring(0, 10);

    /*    console.log(dateToString); */

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user_id = portfolioOwnerId;

        await Api.post('certificate/create', {
            user_id: portfolioOwnerId,
            title,
            description,
            when_date: dateToString,
        });

        const res = await Api.get('certificatelist', user_id);
        setCertificates(res.data);
        setIsAdding(false);
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="자격증 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicWhenDate" className="mt-3">
                <DatePicker
                    selected={whenDate} dateFormat='yyyy/MM/dd'
                    onChange={(date) => setWhenDate(date)}
                />
            </Form.Group>


            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button variant="secondary" onClick={() => setIsAdding(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default CertificateAddForm;
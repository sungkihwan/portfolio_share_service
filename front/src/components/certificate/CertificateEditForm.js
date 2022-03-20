import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Api from '../../api';

function CertificateEditForm({ certificate, setCertificates, setIsEditing }) {
  console.log('Edit_setCertificates', setCertificates);

  /*  console.log('certificates', certificate); */
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [whenDate, setWhenDate] = useState(new Date());

  const dateToString = whenDate.toISOString().substring(0, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = certificate.user_id;

    await Api.put(`certificates/${certificate.id}`, {
      user_id,
      title,
      description,
      when_date: dateToString,
    });

    const res = await Api.get('certificatelist', user_id);

    setCertificates(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formTitle'>
        <Form.Control
          type='text'
          placeholder='자격증 제목'
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formDescription' className='mt-3'>
        <Form.Control
          type='text'
          placeholder='상세내역'
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formWhenDate' className='mt-3'>
        <DatePicker
          selected={whenDate || ''}
          dateFormat='yyyy/MM/dd'
          onChange={(date) => setWhenDate(date)}
        />
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center mb-4'>
        <Col>
          <Button variant='primary' type='submit'>
            확인
          </Button>
          <Button variant='secondary' onClick={(e) => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;

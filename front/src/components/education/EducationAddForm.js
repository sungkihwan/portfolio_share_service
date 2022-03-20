import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

const EducationAddForm = ({ portfolioOwnerId, setEducations, setIsAdding }) => {
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [position, setPosition] = useState('재학중');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;

    await Api.post('education/create', {
      user_id: portfolioOwnerId,
      school,
      major,
      position,
    });

    const res = await Api.get('educationlist', user_id);
    setEducations(res.data);
    setIsAdding(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formBasicSchool'>
        <Form.Control
          type='text'
          placeholder='학교 이름'
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicMajor' className='mt-3'>
        <Form.Control
          type='text'
          placeholder='전공'
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicRadio' className='mt-3'>
        <div key={`inline-radio`} className='mb-3'>
          <Form.Check
            inline
            label='재학중'
            id={`inline-radio-1`}
            type='radio'
            name='position'
            value='재학중'
            checked={position === '재학중'}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label='학사졸업'
            id={`inline-radio-2`}
            type='radio'
            name='position'
            value='학사졸업'
            checked={position === '학사졸업'}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label='석사졸업'
            id={`inline-radio-3`}
            type='radio'
            name='position'
            value='석사졸업'
            checked={position === '석사졸업'}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Form.Check
            inline
            label='박사졸업'
            id={`inline-radio-4`}
            type='radio'
            name='position'
            value='박사졸업'
            checked={position === '박사졸업'}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Col sm={{ span: 20 }}>
          <Button variant='primary' type='submit' className='me-3'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EducationAddForm;

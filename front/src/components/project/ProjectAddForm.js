import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

const ProjectAddForm = ({ portfolioOwnerId, setProjects, setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    const fromDateToString = fromDate.toISOString().substring(0, 10);
    const toDateToString = toDate.toISOString().substring(0, 10);

    await Api.post('project/create', {
      user_id: portfolioOwnerId,
      title,
      description,
      from_date: fromDateToString,
      to_date: toDateToString,
    });

    const res = await Api.get('projectlist', user_id);
    setProjects(res.data);
    setIsAdding(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formBasicTitle'>
        <Form.Control
          type='text'
          placeholder='프로젝트 제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicDescription' className='mt-3'>
        <Form.Control
          type='text'
          placeholder='상세내역'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formBasicDatepicker' className='mt-3 row'>
        <div className='col-auto'>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </div>
        <div className='col-auto'>
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
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

export default ProjectAddForm;

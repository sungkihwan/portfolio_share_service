import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

const ProjectAddForm = ({ portfolioOwnerId, setProjects, setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from_date, setFrom_date] = useState(new Date());
  const [to_date, setTo_date] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    const from_dateToString = from_date.toISOString().substring(0, 10);
    const to_dateToString = to_date.toISOString().substring(0, 10);

    await Api.post('project/create', {
      user_id: portfolioOwnerId,
      title,
      description,
      from_date: from_dateToString,
      to_date: to_dateToString,
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
            selected={from_date}
            onChange={(date) => setFrom_date(date)}
          />
        </div>
        <div className='col-auto'>
          <DatePicker
            selected={to_date}
            onChange={(date) => setTo_date(date)}
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

export default ProjectAddForm;

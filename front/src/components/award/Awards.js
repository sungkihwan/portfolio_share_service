import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import * as Api from '../../api';
import Award from './Award';
import AwardAddForm from './AwardAddForm';

function Awards({ portfolioOwnerId, isEditable }) {
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    Api.get('awardlist', portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);

  useEffect(() => {
    if (isDeleted) {
      Api.get(`awardlist/${portfolioOwnerId}`).then((res) => setAwards(res.data));
      setIsDeleted(false);
    }
  }, [isDeleted]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        <Card.Text>
          {awards.map((award) => (
            <Award
              key={award.id}
              award={award}
              setAwards={setAwards}
              isEditable={isEditable}
              setIsDeleted={setIsDeleted}
            />
          ))}
        </Card.Text>
        {isEditable && (
          <Row className='mt-3 text-center mb-4'>
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}

        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;

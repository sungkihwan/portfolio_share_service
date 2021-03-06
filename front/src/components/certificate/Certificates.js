import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import * as Api from '../../api';
import Certificate from './Certificate';
import CertificateAddForm from './CertificateAddForm';

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    Api.get('certificatelist', portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  useEffect(() => {
    if (isDeleted) {
      Api.get(`certificatelist/${portfolioOwnerId}`).then((res) => setCertificates(res.data));
      setIsDeleted(false);
    }
  }, [isDeleted]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          {certificates.map((certificate) => (
            <Certificate
              key={certificate.id}
              certificate={certificate}
              setCertificates={setCertificates}
              isEditable={isEditable}
              setIsDeleted={setIsDeleted}
            />
          ))}

          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}

          {isAdding && (
            <CertificateAddForm
              portfolioOwnerId={portfolioOwnerId}
              setCertificates={setCertificates}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificates;

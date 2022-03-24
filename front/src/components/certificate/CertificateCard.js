import { Card, Row, Button, Col } from 'react-bootstrap';
import * as Api from '../../api';

function CertificateCard({ certificate, setIsEditing, isEditable, setIsDeleted }) {

  const handleDelete = async function (e) {
    e.preventDefault();
    if (window.confirm('삭제하시겠습니까?')) {
      Api.delete(`certificates/${certificate.id}`).then(res => {
        console.log(res.data);
        if (res.data) {
          setIsDeleted(true);
          alert('삭제되었습니다.');
        }
      })
    };
  };

  return (
    <Card.Text>
      <Row className='align-items-center'>
        <Col>
          <span>{certificate?.title}</span>
          <br />
          <span className='text-muted'>{certificate?.description}</span>
          <br />
          <span className='text-muted'>{certificate?.when_date}</span>
        </Col>
        {isEditable && (
          <Col xs lg='1'>
            <Button
              variant='outline-info'
              size='sm'
              className='mr-3'
              onClick={() => setIsEditing((prev) => !prev)}
            >
              편집
            </Button>
          </Col>
        )}
        <Col xs lg='1'>
          <Button
            variant='outline-danger'
            size='sm'
            className='mr-3'
            onClick={handleDelete}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
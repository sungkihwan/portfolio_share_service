import { Card, Row, Button, Col } from 'react-bootstrap';
import * as Api from '../../api';

function AwardCard({ award, setIsEditing, isEditable, setIsDeleted }) {
  const handleDelete = async function (e) {
    e.preventDefault();
    if (window.confirm('삭제하시겠습니까?')) {
      Api.delete(`awards/${award.id}`).then(res => {
        console.log(res.data);

      });
      setIsDeleted(true);
    };
  };


  return (
    <Card.Text>
      <Row className='align-items-center'>
        <Col>
          <span>{award?.title}</span>
          <br />
          <span className='text-muted'>{award?.description}</span>
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

export default AwardCard;

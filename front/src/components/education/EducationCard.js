import { Card, Button, Row, Col } from 'react-bootstrap';
import * as Api from '../../api';
function EducationCard({
  education,
  isEditable,
  setIsEditing,
  portfolioOwnerId,
  setEducations,
}) {
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    try {
      if (window.confirm('삭제하시겠습니까?')) {
        await Api.delete('educations', education.id);

        const res = await Api.get('educationlist', user_id);
        if (res.data) {
          setEducations(res.data);
          alert('삭제되었습니다.');
        }
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card.Text>
      <Row className='align-items-center'>
        <Col>
          <span>{education.school}</span>
          <br />
          <span className='text-muted'>
            {education.major} ({education.position})
          </span>
        </Col>
        {isEditable && (
          <Col xs lg='1'>
            <Button
              variant='outline-info'
              size='sm'
              onClick={() => setIsEditing((prev) => !prev)}
              className='mr-3'
            >
              편집
            </Button>
          </Col>
        )}
        {isEditable && (
          <Col xs lg='1'>
            <Button
              variant='outline-danger'
              size='sm'
              onClick={handleClick}
              className='mr-3'
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;

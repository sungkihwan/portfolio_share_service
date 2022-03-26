import { Card, Button, Row, Col } from 'react-bootstrap';
import * as Api from '../../api';
function ProjectCard({
  project,
  isEditable,
  setIsEditing,
  portfolioOwnerId,
  setProjects,
}) {
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    try {
      if (window.confirm('삭제하시겠습니까?')) {
        await Api.delete('projects', project.id);

        const res = await Api.get('projectlist', user_id);
        if (res.data) {
          setProjects(res.data);
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
          <span>{project.title}</span>
          <br />
          <span className='text-muted'>{project.description}</span>
          <br />
          <span className='text-muted'>
            {project.from_date} ~ {project.to_date}
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

export default ProjectCard;

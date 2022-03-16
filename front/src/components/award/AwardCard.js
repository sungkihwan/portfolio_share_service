import { Card, Row, Button, Col } from "react-bootstrap";

function AwardCard({ award, setIsEditing, isEditable }) {
    return (
        <Card class="Text">
            <Row className="align-items-center">
                <Col>
                    <h3>수상이력</h3>
                    <br />
                    <span>{award?.title}</span>
                    <span className='text-muted'>{award?.description}</span>
                </Col>
                {isEditable && (
                    <Button variant="outline-info"
                        size="sm" onClick={() => setIsEditing(true)}>편집</Button>

                )}
            </Row>
        </Card>

    );

}

export default AwardCard;
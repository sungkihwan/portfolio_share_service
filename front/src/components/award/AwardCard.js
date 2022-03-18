import { Card, Row, Button, Col } from "react-bootstrap";

function AwardCard({ award, setIsEditing, isEditable }) {

    return (
        <div className="card w-100">
            <div className="card-body">
                <Row className="align-items-center">
                    <Col>
                        <span>{award?.title}</span><br />
                        <span className='text-muted'>{award?.description}</span>
                    </Col>
                    {isEditable && (
                        <Col xs lg="1">
                            <Button variant="outline-info"
                                size="sm" className="mr-3" onClick={() => setIsEditing((prev) => !prev)}>편집</Button>
                        </Col>
                    )}
                </Row>
            </div>
        </div>

    );

}

export default AwardCard;
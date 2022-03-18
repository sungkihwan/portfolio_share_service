import { Card, Row, Button, Col } from "react-bootstrap";


function CertificateCard({ certificate, setIsEditing, isEditable }) {


    /*   console.log('certificate', certificate); */

    return (
        <Card>
            <Card.Body>
                <Row className="align-items-center">
                    <Col>
                        <span>{certificate?.title}</span><br />
                        <span className='text-muted'>{certificate?.description}</span><br />
                        <span className='text-muted'>{certificate?.when_date}</span>
                    </Col>
                    {isEditable && (
                        <Col xs lg="1">
                            <Button variant="outline-info"
                                size="sm" className="mr-3" onClick={() => setIsEditing((prev) => !prev)}>편집</Button>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>

    );

}

export default CertificateCard;
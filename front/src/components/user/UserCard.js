import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork, portfolioOwnerId }) {
  const navigate = useNavigate();

  async function userDelete() {
    const user_id = portfolioOwnerId;

    if (window.confirm('회원 탈퇴를 진행합니다.\n정말 탈퇴하시겠습니까?')) {
      await Api.delete(`user/delete/${user_id}`)
        .then((res) => {
          console.log(res);
        })
        .then(
          alert("탈퇴 완료되었습니다."))
        .then(
          navigate('/login')
        );


    } else return;
  };


  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                개인 정보 수정
              </Button>
              <Button
                variant="outline-danger"
                className="mt-2"
                size="sm"
                onClick={userDelete}
              >
                회원 탈퇴
              </Button>

            </Row>

          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
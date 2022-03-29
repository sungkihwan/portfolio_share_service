import React, { useEffect, useContext, useState } from "react";
import { renderMatches, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";


function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist")
      .then((res) => {
        setUsers(res.data);
      });
  }, [userState, navigate]);



  const searchText = (e) => {
    setFilter(e.target.value);
  }


  let dataSearch = users.filter(item => {
    return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(filter.toString().toLowerCase()))
  });

  return (
    <>
      <Container fluid>
        <nav className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand">네트워크</a>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="검색" aria-label="Search" value={filter} onChange={searchText.bind(this)} />
              <button className="btn btn-outline-primary" type="button"
                onClick={() => setFilter('')}>Reset</button>
            </form>
          </div>
        </nav>

        <Row xs="auto" className="jusify-content-center">
          {dataSearch.map((user) => (
            <UserCard key={user.id} user={user} isNetwork />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Network;

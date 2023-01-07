import React from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";

function Home() {
  return(
      <React.Fragment>
          <Helmet title="Home" />
          <Row>
              <Col span={6} className="gutter-row">
                  <h3>Menu</h3>
                  <Link to="/messaging">Messaging</Link>
                  <Link to="/signin">Signin</Link>
                  <Link to="/signup">Singup</Link>
              </Col>
          </Row>
      </React.Fragment>
  );
}

export default Home;
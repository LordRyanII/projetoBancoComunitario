import React from 'react';
import { Row, Col } from 'reactstrap';
import './index.css';

interface HeaderProps {
    userName: string;
  }
  
  const Header: React.FC<HeaderProps> = ({ userName }) => {
    return (
      <>
        <header>
          <Row>
            <Col md={12}>
              <h1 className="display-4">Olá {userName}!</h1>
              <p>V1.0</p>
            </Col>
          </Row>
        </header>
        <br />
      </>
    );
  };
  
  export default Header;

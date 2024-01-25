import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import imgBanco from './img/cascata-logo.jpg'

const NotFoundPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs={12} md={6} className="text-center">
          <Image src={imgBanco} alt="Logo" fluid />
          <h1 className="mt-4">Erro 404 - Página não encontrada</h1>
          <p>Huuuummmmm. O Banco Cascata não encontrou essa página, tem certeza que você digitou corretamente?</p>
          <Link to="/login" className="btn btn-primary mt-3">
            Você pode voltar ao login por aqui:)
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;

import { Container, Row, Col } from 'react-bootstrap';
import { FaCog, FaMicrophoneAlt, FaNewspaper } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './index.css'; // Importa o arquivo CSS

const QuadradosComponente = () => {
    return (
        <Container fluid className="p-3">
            <div className="container-options1">
                <Row>
                    <Col xs className="col-style">
                        <div className="icon">
                            <FaCog />
                        </div>
                        <div className="text">Configurações</div>
                    </Col>
                    <Col className="col-style">
                        <div className="icon">
                            <FaMicrophoneAlt />
                        </div>
                        <div className="text">Palestras</div>
                    </Col>
                    <Col className="col-style">
                        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="icon">
                                <FaNewspaper />
                            </div>
                            <div className="text">

                                Acesso a timeline
                            </div>
                        </NavLink>

                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default QuadradosComponente;

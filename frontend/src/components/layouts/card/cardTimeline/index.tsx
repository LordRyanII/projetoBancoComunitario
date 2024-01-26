import { Navbar, Nav, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaCoffee } from "react-icons/fa";
import './styles.css';
import imgNatal from './img/postagem.jpg';

const CardTimeline = () => {
    return (
        <>
            <Navbar bg="success" variant="dark" expand="md" className="justify-content-between" style={{ padding: '10px' }}>
                <Navbar.Brand href="#home">Comunidade Cascata</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Ações</Nav.Link>
                        <Nav.Link href="#pricing">Eventos</Nav.Link>
                        <Nav.Link href="#features">História</Nav.Link>
                        <Nav.Link href="#pricing">Projetos</Nav.Link>
                    </Nav>
                    <div className="login-buttons">
                        <Button variant="outline-info" className="mr-2" style={{ marginRight: '8px' }}>
                            <NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</NavLink>
                        </Button>

                        <Button variant="outline-info" style={{ marginLeft: '8px' }}>
                            <NavLink to="/form/cadastrouser" style={{ textDecoration: 'none', color: 'inherit' }}>Cadastro</NavLink>
                        </Button>
                    </div>

                </Navbar.Collapse>
            </Navbar>

            <Card bg="light" text="dark" className="text-center">
                <Card.Body>
                    <Card.Title>Bem-vindo à nossa timeline!</Card.Title>
                    <Card.Text>
                        Aqui é onde compartilhamos as últimas notícias e atualizações. Desde 2016 promovendo ações coletivas.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <br />
            <h1 style={{ margin: 'auto', textAlign: 'center' }} >Últimas noticías <FaCoffee /></h1>
            <br />
            <br />
            <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={imgNatal} />
                <Card.Body>
                    <Card.Title>Natal solidário</Card.Title>
                    <Card.Text>
                        Contemple essa bela arte feita pela minha namorada :)
                    </Card.Text>
                    <Button variant="primary">Veja a matéria completa</Button>
                </Card.Body>
            </Card>
            <br />
            <br />
        </>
    )
};

export default CardTimeline
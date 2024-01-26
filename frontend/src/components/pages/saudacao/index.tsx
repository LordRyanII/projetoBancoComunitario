import { Navbar, Nav, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './styles.css';
import imgNatal from './img/postagem.jpg';

const InterfaceSaudacao = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md" className="justify-content-between" style={{ padding: '10px' }}>
                <Navbar.Brand href="#home">Comunidade Cascata</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Ações</Nav.Link>
                        <Nav.Link href="#pricing">Eventos</Nav.Link>
                    </Nav>
                    <div className="login-buttons">
                        <Button variant="outline-info" className="mr-2">
                            <NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</NavLink>
                        </Button>
                        <Button variant="outline-success">
                            <NavLink to="/form/cadastrouser" style={{ textDecoration: 'none', color: 'inherit' }}>Cadastro</NavLink>
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>

            <Card bg="light" text="dark" className="text-center">
                <Card.Body>
                    <Card.Title>Bem-vindo à nossa timeline!</Card.Title>
                    <Card.Text>
                        Aqui é onde compartilhamos as últimas notícias e atualizações. Faça login ou cadastre-se e faça parte do nosso banco comunitário, ajude a comunidade!
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Img variant="top" src={imgNatal} alt="Imagem da Comunidade" />
                <Card.Text>
                    Contemple essa bela arte feita pela minha namorada :)
                </Card.Text>
            </Card>
        </>
    );
}

export default InterfaceSaudacao;

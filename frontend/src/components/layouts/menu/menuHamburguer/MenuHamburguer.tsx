import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaRegUserCircle, FaCog, FaDatabase, FaNewspaper } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './index.css';


const MenuHamburguer = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Menu
            </Button>

            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="start"
                style={{ maxWidth: '80%', width: '300px', backgroundColor: 'green' }}
            >

                <Offcanvas.Header closeButton style={{ backgroundColor: 'white' }}>
                    <Offcanvas.Title style={{ margin: 'auto' }}>
                        <FaRegUserCircle style={{ width: '80px', height: '80px', textAlign: 'center' }} />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body id='tagButton'>
                    <div className="button-area">
                        <div className="content" style={{ color: 'white' }}>
                            <NavLink to='/timeline' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <FaNewspaper /> Timeline
                            </NavLink>
                        </div>
                    </div>
                    <br />
                    <div className="button-area">
                        <div className="content" style={{ color: 'white' }}>
                            <FaCog /> Configurações
                        </div>
                    </div>
                    <br />
                    <div className="button-area">
                        <div className="content" style={{ color: 'white' }}>
                            <FaDatabase /> Ajuste de cadastro
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MenuHamburguer;

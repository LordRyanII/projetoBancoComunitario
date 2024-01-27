import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardTitle } from 'reactstrap';
import { FaRegCalendarAlt, FaPhoneAlt, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Header from '../../header';
import getDados from '../../../../services/Api/getDados';
import QuadradosComponente from './cardAcessoRapido';
import './index.css';

const ContentCard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<any | null>(null);
    const [isCalendarioOpen, setIsCalendarioOpen] = useState(false);
    const [isAjudaOpen, setIsAjudaOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataFromApi = await getDados();
                setUserData(userDataFromApi.data);
            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
        setSelectedHistoryItem(null);
        setIsCalendarioOpen(false);
        setIsAjudaOpen(false);
    };

    const openHistoryItem = (historicoItem: any) => {
        setSelectedHistoryItem(historicoItem);
        setIsCalendarioOpen(false);
        setIsAjudaOpen(false);
    };

    const toggleCalendario = () => {
        setIsCalendarioOpen(!isCalendarioOpen);
        setIsHistoryOpen(false);
        setIsAjudaOpen(false);
    };

    const toggleAjuda = () => {
        setIsAjudaOpen(!isAjudaOpen);
        setIsHistoryOpen(false);
        setIsCalendarioOpen(false);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <Container fluid className="p-3">
            <Header userName={userData?.nome || 'Usuário'} />
            <Row className="justify-content-center">
                <Col md={3} className="mb-3">
                    <Card
                        body
                        className={`text-white bg-success ${isHistoryOpen ? 'open' : ''}`}
                        onClick={toggleHistory}
                    >
                        <CardTitle tag="h5">
                            <FaChartLine /> Histórico
                        </CardTitle>
                        {isHistoryOpen ? (
                            userData?.historico.map((historicoItem: any) => (
                                <div key={historicoItem._id} onClick={() => openHistoryItem(historicoItem)}>
                                    <p>Data: {historicoItem.dataHistorico}</p>
                                    <p>Descrição: {historicoItem.descricao} {historicoItem.descricao === 'Entrada' ? <FaArrowUp /> : <FaArrowDown />}</p>
                                    <p>Valor: {historicoItem.valor}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <div>Clique aqui para exibir o histórico</div>
                        )}
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card
                        body
                        className={`text-white bg-success ${isCalendarioOpen ? 'open' : ''}`}
                        onClick={toggleCalendario}
                    >
                        <CardTitle tag="h5">
                            <FaRegCalendarAlt /> Calendário de Trocas
                        </CardTitle>
                        {isCalendarioOpen && (
                            <div>
                                <p>Por enquanto não há datas disponíveis, volte mais tarde!</p>
                            </div>
                        )}
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card
                        body
                        className={`text-white bg-success ${isAjudaOpen ? 'open' : ''}`}
                        onClick={toggleAjuda}
                    >
                        <CardTitle tag="h5">
                            <FaPhoneAlt /> Ajuda
                        </CardTitle>
                        {isAjudaOpen && (
                            <div>
                                <br />
                                <h6>Policia, ligue: 190</h6>
                                <h6>Samu, ligue: 192</h6>
                                <h6>Bombeiros, ligue: 193</h6>
                            </div>
                        )}
                    </Card>
                </Col>
                <QuadradosComponente />
            </Row>

        </Container>
    );
}

export default ContentCard;

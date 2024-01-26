import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardText, CardTitle } from 'reactstrap';
import { FaMoneyBillWave, FaRegCalendarAlt, FaPhoneAlt, FaChartLine, FaArrowUp,FaArrowDown   } from 'react-icons/fa';
import Header from '../../header';
import getDados from '../../../../services/Api/getDados';
import './index.css'



const ContentCard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Chame a função getDados para obter dados reais do usuário
                const userDataFromApi = await getDados();

                setUserData(userDataFromApi.data); // Ajuste conforme a estrutura dos dados reais
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
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <Container fluid className="p-3">
            <Header userName={userData?.nome || 'Usuário'} />
            <Row className="justify-content-center">
                <Col md={3} className="mb-3">
                    <Card body className="text-white bg-success">
                        <CardTitle tag="h5">
                            <FaMoneyBillWave /> Conta
                        </CardTitle>
                        <CardText>
                            Saldo em antenas: A${userData?.historico.length > 0 ? userData.historico[0].valor : 'N/A'}
                        </CardText>
                    </Card>
                </Col>
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
                                <div key={historicoItem._id}>
                                    <p>Data: {historicoItem.dataHistorico}</p>
                                    <p>Descrição: {historicoItem.descricao} {historicoItem.descricao === 'Entrada' ? <FaArrowUp/> : <FaArrowDown/>}</p>
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
                    <Card body className="text-white bg-success">
                        <CardTitle tag="h5">
                            <FaRegCalendarAlt /> Acesso ao calendário de trocas
                        </CardTitle>
                        <CardText>{userData?.calendario}</CardText>
                    </Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card body className="text-white bg-success">
                        <CardTitle tag="h5">
                            <FaPhoneAlt /> Ajuda
                        </CardTitle>
                        <CardText>{userData?.ajuda}</CardText>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ContentCard;

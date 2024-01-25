import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { registerUser } from '../../../services/Api/PostDataUser';
import { useNavigate } from 'react-router-dom';
import MessageModal from '../../layouts/modal/index';

interface Endereco {
  cep: string;
  logradouro: string;
  rua: string;
  numero: string;
  bairro: string;
}

interface Usuario {
  nome: string;
  sobrenome: string;
  data: string;
  genero: string;
  etnia: string;
  celular: string;
  senha: string;
  endereco: Endereco;
  whatsapp: boolean;
  empregado: boolean;
  empresario: boolean;
}

const isValidNumberInput = (input: string) => /^\d+$/.test(input);

const RegisterSection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [, setModalMessage] = useState('');
  const [, setModalType] = useState<'success' | 'error'>('success');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [data, setData] = useState('');
  const [genero, setGenero] = useState('');
  const [etnia, setEtnia] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [tipoLogradouro, setTipoLogradouro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [empregado, setEmpregado] = useState(false);
  const [empresario, setEmpresario] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const openModal = (title: string, message: string, type: 'success' | 'error') => {
      setModalMessage(message);
      setModalType(type);
      setMessageTitle(title);
      setMessageContent(message);
      setMessageType(type);
      setShowModal(true);
    };

    const camposEmBranco: string[] = [];
    const camposObrigatorios = [
      'nome', 'sobrenome', 'data', 'genero', 'etnia', 'celular', 'senha',
      'cep', 'tipoLogradouro', 'rua', 'numero', 'bairro'
    ];

    camposObrigatorios.forEach((campo) => {
      const valorCampo = eval(campo);
      if (
        !valorCampo ||
        (campo === 'etnia' && valorCampo === 'Selecione uma opção') ||
        (campo === 'tipoLogradouro' && (valorCampo === '' || valorCampo === 'Selecione uma opção'))
      ) {
        camposEmBranco.push(campo.charAt(0).toUpperCase() + campo.slice(1));
      }
    });

    if (whatsapp && celular === '') {
      camposEmBranco.push('Celular (WhatsApp)');
    }

    if (empregado && empresario) {
      camposEmBranco.push('Empregado e Empresário');
    }

    if (camposEmBranco.length > 0) {
      return openModal('Erro', `Por favor, preencha os seguintes campos obrigatórios: ${camposEmBranco.join(', ')}`, 'error');
    }

    const usuario: Usuario = {
      nome,
      sobrenome,
      data,
      genero,
      etnia,
      celular,
      senha,
      endereco: {
        cep,
        logradouro: tipoLogradouro === '' ? 'Outros' : tipoLogradouro,
        rua,
        numero,
        bairro,
      },
      whatsapp,
      empregado,
      empresario,
    };

    if (!isValidNumberInput(cep) || !isValidNumberInput(numero)) {
      return openModal('Erro', 'Campos numéricos devem conter apenas números.', 'error');
    }

    try {
      const response = await registerUser(usuario);
      if (response.status === 201 || response.data?.Status === 'Ok' || response.status === '201') {
        setMessageTitle('Sucesso');
        setMessageContent(response.data.mensagem);
        setMessageType('success');
        setShowMessageModal(true);

        navigate('/login');
      };
      console.log('passou aqui, react', response)
      const errorMessage = response.data.mensagem || 'Erro desconhecido ao cadastrar o usuário';
      openModal('Erro', errorMessage, 'error');


    } catch (error: any) {
      const errorMessage = error.mensagem || 'Erro desconhecido ao cadastrar o usuário';
      openModal('Erro', errorMessage, 'error');
    }
  };


  return (
    <section className="vh-90 bg-dark">
      <div className="container h-90">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Criar uma conta</h2>

                <form onSubmit={handleRegister}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="nome">Como posso te chamar?</label>
                    <input type="text" id="nome" className="form-control form-control-lg" onChange={(e) => setNome(e.target.value)} />
                  </div>


                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="sobrenome">Qual o seu sobrenome?</label>
                    <input type="text" id="sobrenome" className="form-control form-control-lg" onChange={(e) => setSobrenome(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="data">Qual a sua data de nascimento</label>
                    <input type="text" id="data" className="form-control form-control-lg" onChange={(e) => setData(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="genero">Qual o seu gênero?</label>
                    <Form.Select aria-label="Default select example" value={genero} onChange={(e) => setGenero(e.target.value)} required>
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Prefiro não opinar">Prefiro não opinar</option>
                    </Form.Select>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="etnia">Como você se declara?</label>
                    <Form.Select aria-label="Default select example" value={etnia} onChange={(e) => setEtnia(e.target.value)} required>
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="Branca">Branca</option>
                      <option value="Preta">Preta</option>
                      <option value="Pardo">Pardo</option>
                      <option value="Indígena">Indígena</option>
                    </Form.Select>
                  </div>


                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="celular">Seu número de celular</label>
                    <input type="tel" id="celular" className="form-control form-control-lg" onChange={(e) => setCelular(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="senha">Digite uma sua senha (mínimo de 8 caracteres, adicione caracteres especiais)</label>
                    <input type="password" id="senha" className="form-control form-control-lg" onChange={(e) => setSenha(e.target.value)} />
                  </div>

                  <hr />

                  <fieldset>
                    <legend className="mb-0">Preencha as informações de endereço:</legend>
                  </fieldset>

                  <br />

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="rua">Qual o seu endereço (ex: R. Francisca azevedo...)</label>
                    <input type="text" id="rua" className="form-control form-control-lg" onChange={(e) => setRua(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="cep">Digite o seu cep</label>
                    <input type="text" id="cep" className="form-control form-control-lg" onChange={(e) => setCep(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="tipoLogradouro">Tipo de logradouro
                    </label>
                    <Form.Select aria-label="Default select example" value={tipoLogradouro} onChange={(e) => setTipoLogradouro(e.target.value)}>
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Esquina">Esquina</option>
                      <option value="Outro">Outro</option>
                    </Form.Select>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="numero">Digite o número do seu endereço</label>
                    <input type="text" id="numero" className="form-control form-control-lg" onChange={(e) => setNumero(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="bairro">Digite o nome do seu bairro</label>
                    <input type="text" id="bairro" className="form-control form-control-lg" onChange={(e) => setBairro(e.target.value)} />
                  </div>

                  <hr />

                  <fieldset>
                    <legend className="mb-0">Informações adicionais</legend>
                  </fieldset>

                  <br />

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="whatsapp">O número de celular cadastrado, possui WhatsApp?</label>
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="whatsappSim"
                        label="Sim"
                        checked={whatsapp}
                        onChange={() => setWhatsapp(true)}
                      />
                      <Form.Check
                        type="checkbox"
                        id="whatsappNao"
                        label="Não"
                        checked={!whatsapp}
                        onChange={() => setWhatsapp(false)}
                      />
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="empregado">Atualmente você está empregado?</label><br />
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="empregadoSim"
                        label="Sim"
                        checked={empregado}
                        onChange={() => {
                          setEmpregado(true);
                          setEmpresario(false);
                        }}
                      />
                      <Form.Check
                        type="checkbox"
                        id="empregadoNao"
                        label="Não"
                        checked={!empregado}
                        onChange={() => setEmpregado(false)}
                      />
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="empresario">Você possui algum negócio na comunidade Cascata?</label><br />
                    <div>
                      <Form.Check
                        type="checkbox"
                        id="empresarioSim"
                        label="Sim"
                        checked={empresario}
                        onChange={() => {
                          setEmpresario(true);
                          setEmpregado(false);
                        }}
                      />
                      <Form.Check
                        type="checkbox"
                        id="empresarioNao"
                        label="Não"
                        checked={!empresario}
                        onChange={() => setEmpresario(false)}
                      />
                    </div>
                  </div>

                  <br />
                  <br />

                  <div className="d-flex justify-content-center">
                    <Button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                      Registrar-se
                    </Button>
                  </div>
                </form>



                <p className="text-center text-muted mt-5 mb-0">Você já tem uma conta? <a href="#!" className="fw-bold text-body"><u>Faça login por aqui! ;)</u></a></p>
                <p className="text-center text-muted mt-5 mb-0">Algum problema ou dificuldade? <a href="#!" className="fw-bold text-body"><u>Entre em contato conosco</u></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageModal
        show={showModal || showMessageModal}
        handleClose={() => {
          setShowModal(false);
          setShowMessageModal(false);
        }}
        title={messageTitle}
        message={messageContent}
        type={messageType}
      />

    </section >
  )
}

export default RegisterSection;

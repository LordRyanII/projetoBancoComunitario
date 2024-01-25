import { useState } from 'react';
import { loginAuth } from '../../../services/Api/authService';
import { useNavigate } from 'react-router-dom'; // Adicionando useNavigate
import MessageModal from '../../layouts/modal/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import imgBanco from './img/cascata-logo.jpg';
import getDados from '../../../services/Api/getDados';

const Login = () => {
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | any>('');
  const [isLoading, setIsLoading] = useState(false); // Adicionando o estado de carregamento

  const navigate = useNavigate(); // Adicionando useNavigate

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true); 
  
    try {
      const resultadoAutenticacao = await loginAuth({ celular, senha });
  
      setMessageTitle('Sucesso');
      setMessageContent(resultadoAutenticacao.Descricao);
      setMessageType('success');
      setShowMessageModal(true);
  
      // Chame a função para obter dados do usuário após o login
      const userData = await getDados();
      console.log('Dados do usuário:', userData);
  
      // Redirecione para a página Home ou faça a navegação como desejado
      navigate('/home'); // Corrigindo a navegação
    } catch (error: any) {
      console.error('Erro durante a autenticação:', error.mensagem);
      setMessageTitle('Erro');
      setMessageContent(error.response?.data?.mensagem || 'Erro desconhecido.');
      setMessageType('error');
      setShowMessageModal(true);
    } finally {
      setIsLoading(false); // Corrigindo o nome do estado para setIsLoading
    }
  
    // Limpar os campos após o envio
    setCelular('');
    setSenha('');
  };

  const handleMessageClose = () => {
    setShowMessageModal(false);
  };

  return (
    <div className="Login-user">
      <section className="bg-success min-vh-100 p-2 p-md-5 p-xl-5">
        <div className="container h-100">
          <div className="row justify-content-center h-100">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-12 col-md-6">
                    <img
                      className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src={imgBanco}
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-5">
                              <h4 className="text-center">
                                Seja bem-vindo, faça login para continuar!
                              </h4>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleLoginSubmit}>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  className="form-control"
                                  name="number"
                                  id="number"
                                  placeholder="Digite o seu número de celular"
                                  value={celular}
                                  onChange={(e) => setCelular(e.target.value)}
                                  required
                                />
                                <label htmlFor="number" className="form-label">
                                  Número de celular
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  value={senha}
                                  onChange={(e) => setSenha(e.target.value)}
                                  placeholder="Password"
                                  required
                                />
                                <label htmlFor="password" className="form-label">
                                  Senha
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="d-grid">
                                <button
                                  className="btn btn-dark btn-lg" id='btn-submit'
                                  type="submit"
                                  disabled={isLoading} 
                                >
                                  {isLoading ? 'Carregando...' : 'Acessar o banco'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                              <a
                                href="form/cadastrouser"
                                className="link-secondary text-decoration-none"
                              >
                                Cadastrar-se ^^)
                              </a>
                              <a
                                href="/form/recuperaracesso"
                                className="link-secondary text-decoration-none"
                              >
                                Esqueci a minha senha :/
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MessageModal
        show={showMessageModal}
        handleClose={handleMessageClose}
        title={messageTitle}
        message={messageContent}
        type={messageType}
      />
    </div>
  );
};

export default Login;
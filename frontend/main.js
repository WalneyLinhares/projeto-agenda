import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap';
import Cadastro from './modules/Cadastro'
import Login from './modules/Login'
import Contato from "./modules/Contato";

const cadastro = new Cadastro('.form-cadastro');
const login = new Login('.form-login');
const contato = new Contato('.form-contato');
const contatoEdit = new Contato('.form-contato-edit');

cadastro.init();
login.init();
contato.init();
contatoEdit.init();

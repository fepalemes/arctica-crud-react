import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Visualizar extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      listagem: {},
      key: ''
    };
  }

   // Definição da collection 
  componentDidMount() {
    const ref = firebase.firestore().collection('alunos_arctica').doc(this.props.match.params.id);
    // get do objeto
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          listagem: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
         // apresentação de erro caso não seja possível visualizar o cadastro
        console.log("Aluno não encontrado!");
      }
    });
  }

  // ação de delete
  delete(id) {
    firebase.firestore().collection('alunos_arctica').doc(id).delete().then(() => {
      // apresentação da mensagem caso o cadastro seja deletado com sucesso
      console.log("Cadastro do aluno deletado com sucesso!");
      this.props.history.push("/")
    }).catch((error) => {
      // apresentação da mensagem de erro caso o cadastro não seja deletado com sucesso
      console.error("Erro ao deletar o aluno: ", error);
    });
  }

  // realiza o render
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title" align="center">
              Visualizar cadastro do aluno
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>RA do aluno:</dt>
              <dd>{this.state.listagem.ra_aluno}</dd>
              <dt>Nome do aluno:</dt>
              <dd>{this.state.listagem.nome_aluno}</dd>
              <dt>Série do aluno:</dt>
              <dd>{this.state.listagem.serie_aluno}</dd>
            </dl>
            <Link to="/" class="btn btn-primary">Voltar</Link>&nbsp;
            <Link to={`/editar/${this.state.key}`} class="btn btn-success">Editar aluno</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Deletar aluno</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Visualizar;
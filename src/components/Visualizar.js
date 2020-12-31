import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Visualizar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listagem: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('alunos_arctica').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          listagem: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("Aluno não encontrado!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('alunos_arctica').doc(id).delete().then(() => {
      console.log("Cadastro do aluno deletado com sucesso!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Erro ao deletar o aluno: ", error);
    });
  }

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
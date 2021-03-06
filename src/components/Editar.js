import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Editar extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      ra_aluno: '',
      nome_aluno: '',
      serie_aluno: ''
    };
  }

  // Definição da collection 
  componentDidMount() {
    const ref = firebase.firestore().collection('alunos_arctica').doc(this.props.match.params.id);
    // get do objeto
    ref.get().then((doc) => {
      if (doc.exists) {
        const listagem = doc.data();
        this.setState({
          key: doc.id,
          ra_aluno: listagem.ra_aluno,
          nome_aluno: listagem.nome_aluno,
          serie_aluno: listagem.serie_aluno
        });
      } else {
        // apresentação de erro caso não seja possível editar o cadastro
        console.log("Aluno não encontrado!");
      }
    });
  }
  // pega o state de mudança do campo do form
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ listagem: state });
  }
  // ação do submit do form
  onSubmit = (e) => {
    e.preventDefault();

    const { ra_aluno, nome_aluno, serie_aluno } = this.state;
    // declara o que foi digitado para poder editar o objeto retornado do get
    const updateRef = firebase.firestore().collection('alunos_arctica').doc(this.state.key);
    updateRef.set({
      ra_aluno,
      nome_aluno,
      serie_aluno
    }).then((docRef) => {
      this.setState({
        key: '',
        ra_aluno: '',
        nome_aluno: '',
        serie_aluno: ''
      });
      this.props.history.push("/visualizar/" + this.props.match.params.id)
    })
      // apresentação de erro caso não seja possível editar o cadastro
      .catch((error) => {
        console.error("Erro ao editar o cadastro do aluno: ", error);
      });
  }
  // realiza o render
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title" align="center">
              Editar aluno
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="ra_aluno">RA do aluno</label>
                <input type="text" class="form-control" name="ra_aluno" value={this.state.ra_aluno} onChange={this.onChange} placeholder="RA do aluno" />
              </div>
              <div class="form-group">
                <label for="nome_aluno">Nome do aluno</label>
                <input type="text" class="form-control" name="nome_aluno" value={this.state.nome_aluno} onChange={this.onChange} placeholder="Nome do Aluno" />
              </div>
              <div class="form-group">
                <label for="serie_aluno">Série do aluno:</label>
                <input type="text" class="form-control" name="serie_aluno" value={this.state.serie_aluno} onChange={this.onChange} placeholder="Série do aluno" />
              </div>
              <Link to={`/visualizar/${this.state.key}`} class="btn btn-primary">Voltar</Link>&nbsp;
              <button type="submit" class="btn btn-success">Atualizar dados do aluno</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Editar;
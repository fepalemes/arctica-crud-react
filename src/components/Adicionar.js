import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Adicionar extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('alunos_arctica');
    this.state = {
      ra_aluno: '',
      nome_aluno: '',
      serie_aluno: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { ra_aluno, nome_aluno, serie_aluno } = this.state;

    this.ref.add({
      ra_aluno,
      nome_aluno,
      serie_aluno
    }).then((docRef) => {
      this.setState({
        ra_aluno: '',
        nome_aluno: '',
        serie_aluno: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Erro ao adicionar o cadastro do aluno: ", error);
    });
  }

  render() {
    const { ra_aluno, nome_aluno, serie_aluno } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title" align="center">
              Adicionar aluno
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="ra_aluno">RA do aluno</label>
                <input type="text" class="form-control" name="ra_aluno" value={ra_aluno} onChange={this.onChange} placeholder="RA do aluno" />
              </div>
              <div class="form-group">
                <label for="nome_aluno">Nome do aluno</label>

                <input type="text" class="form-control" name="nome_aluno" value={nome_aluno} onChange={this.onChange} placeholder="Nome do aluno" />
              </div>
              <div class="form-group">
                <label for="serie_aluno">Série do aluno:</label>
                <input type="text" class="form-control" name="serie_aluno" value={serie_aluno} onChange={this.onChange} placeholder="Série do aluno" />
              </div>
              <Link to="/" class="btn btn-primary">Voltar</Link>&nbsp;
              <button type="submit" class="btn btn-success">Adicionar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Adicionar;
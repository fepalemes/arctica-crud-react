import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    // consulta na collection alunos_arctica do Google Firestore ordenado por nome do aluno (ASC)
    this.ref = firebase.firestore().collection('alunos_arctica').orderBy("nome_aluno");
    this.unsubscribe = null;
    this.state = {
      listagem_alunos: []
    };
  }

  // snapshot da consulta
  onCollectionUpdate = (querySnapshot) => {
    const listagem_alunos = [];
    querySnapshot.forEach((doc) => {
      //objetos de consulta
      const { ra_aluno, nome_aluno, serie_aluno } = doc.data();
      listagem_alunos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        ra_aluno,
        nome_aluno,
        serie_aluno,
      });
    });
    // define o state da listagem
    this.setState({
      listagem_alunos
   });
  }
  // realiza a montagem da listagem - DOM
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  // realiza o render
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title" align="center">
              CRUD alunos - Arctica
            </h3>
          </div>
          <div class="panel-body">
          <div class="row">
            <h4><Link to="/adicionar" class="btn btn-primary">Adicionar aluno</Link></h4>
          </div>
          <div>
            <h4 align="center">Listagem de alunos - por ordem alfabética</h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>RA</th>
                  <th>Nome do aluno</th>
                  <th>Série</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listagem_alunos.map(listagem =>
                  <tr>
                    <td><Link to={`/visualizar/${listagem.key}`}>{listagem.ra_aluno}</Link></td>
                    <td>{listagem.nome_aluno}</td>
                    <td>{listagem.serie_aluno}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
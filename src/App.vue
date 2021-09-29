<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">


      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }} 
        </li>
      </ul>

      <form @submit.prevent="salvar">
     
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="produto.nameProduct">
          <label>Quantidade</label>
          <input type="number" placeholder="QTD" v-model="produto.quantityProduct">
          <label>Valor</label>
          <input type="text" placeholder="Valor" v-model="produto.valueProduct">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>
         
          <tr v-for="produto of produtos" :key="produto.id">

            <td>{{ produto.nameProduct }}</td>
            <td>{{ produto.quantityProduct }}</td>
            <td>{{ produto.valueProduct }}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(produto)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

  import Produto from './services/produtos'
  export default {

    data(){
      return {
        produto: {
          id:'',
          nameProduct:'',
          quantityProduct: '',
          valueProduct: '',
        },
        produtos: [],
        errors:[]
      }
    },


    mounted() {
      this.listar()
    },

    methods: {

      listar(){
        Produto.listar().then(resp => {
          this.produtos = resp.data
        }) 
      },

      salvar(){

        if(!this.produto.id){
          Produto.salvar(this.produto).then(() => {
          this.produto = {}
          alert("Salvo com sucesso!")
          this.listar();
          this.errors = {}
          }).catch(e => {
            this.errors = e.response.data.errors
          })
        }else{
          Produto.atualizar(this.produto).then(() => {
          this.produto = {}
          alert("Atualizado com sucesso!")
          this.listar();
          this.errors = []
          }).catch(e => {
            this.errors = e.response.data.errors
          })
        }


       
      },

      editar(prod){
        this.produto = prod;
      },

      remover(prod){

        if(confirm('Deseja excluir o produto ?')){
            Produto.deletar(prod).then(() =>{
            this.listar();
            this.errors = []
          }).catch(e => {
            this.errors = e.response.data.errors
          })
        }



      
      }





    }

  }
</script>

<style>

</style>

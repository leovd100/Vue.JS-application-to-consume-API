import { http } from './config'

export default {
    listar:() => {
        return http.get('products')
    },
    
    salvar:(prod) => {
        return http.post('product',prod)
    },

    atualizar:(prod)=> {
        return http.put('product',prod);
    },

    deletar:(prod)=>{
        return http.delete('product',{ data: prod});
    }
    
}
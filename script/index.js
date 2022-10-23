class Produto{
    constructor(nome, valor, pagantes=0){
        this.nome = nome;
        this.valor = valor;
        this.pagantes = pagantes;
    }
}

let produtos = []
let pagantes = []

//---------------------------------------------Fonções de Produtos--------------------------------------------

function listarProdutos(){
    const listaDeProdutos = document.getElementById('lista-produtos');
    listaDeProdutos.innerHTML = '';

    for(var i = 0; i < produtos.length; i++){
        
        let tagBtn = `<button class="excluir" onClick="excluirProduto(${i})">X</button>`;

        listaDeProdutos.innerHTML += `<li class="li-produtos">
        <p class="listados"> #${i} - ${produtos[i].nome.toUpperCase()}:</p>
        <p class="listados">R$: ${produtos[i].valor}</p> ${tagBtn}</li>`;
    }

    const valorTotal = calcTotalProduto(produtos);

    const textoValorTotal = document.getElementById('valor-total-conta');
    textoValorTotal.innerHTML = `VALOR TOTAL DA CONTA: R$ ${valorTotal}`

    if(pagantes.length > 0){
        listarPagantes()
    }
}

function adicionaProduto(){
    const nomeProduto = document.getElementById('nome-produto');
    const qtdProduto = document.getElementById('qtd-produto');
    const valorProduto = document.getElementById('valor-produto');

    if(nomeProduto.value == '' || valorProduto.value == ''){
        alert('Informe o Produto com seu Valor!')
    }
    else{ 
        const quantidade = parseFloat(qtdProduto.value)
        
        for(var i = 0; i < quantidade; i++){
            let novoProduto = new Produto(nomeProduto.value, valorProduto.value);
            produtos.push(novoProduto);
        }

        listarProdutos();

        nomeProduto.value = '';
        qtdProduto.value = 1;
        valorProduto.value = ''
    }
}

function excluirProduto(indice){
    produtos.splice(indice, 1);
    listarProdutos();

    if(pagantes.length > 0){
        listarPagantes();
    }
}

function calcTotalProduto(lista){
    let valorTotal = 0;

    for(var i = 0; i< lista.length; i++){
        valorTotal += parseFloat(lista[i].valor)
    }

    return valorTotal
}

//------------------------------------------Funções de Pagantes---------------------------------------------

function listarPagantes(){
    const listaDePagantes = document.getElementById('lista-pagantes');
    listaDePagantes.innerHTML = '';

    for(var i = 0; i < pagantes.length; i++){
        
        let tagBtn = `<button class="excluir" onClick="excluirPagante(pagantes, ${i})">X</button>`;

        listaDePagantes.innerHTML += `<li class="li-pagantes">${pagantes[i].toUpperCase()} ${tagBtn}
        <ul class="lista-a-pagar" id="lista-a-pagar-${i}"></ul>
        <p id="valor-a-pagar-${i}">Valor a pagar: R$ 0</p></li>`;

    }
    adicionaListaAPagar()

}

function adicionaPagante(){
    const nomePagante = document.getElementById('nome-pagante');

    if(produtos.length < 1){
        alert('Informe pelo menos um produto antes de informar uma pessoa!')
    }
    else if(nomePagante.value == ''){
        alert('Informe o nome da Pessoa que irá pagar!')
    }
    else{ 
        pagantes.push(nomePagante.value)

        for(var i = 0; i < produtos.length; i++){
            produtos[i].pagantes = 0;
        }

        listarPagantes();

        nomePagante.value = '';
    }
}

function excluirPagante(lista, indice){
    for(var i = 0; i < produtos.length; i++){
        produtos[i].pagantes = 0;
    }
    lista.splice(indice, 1);
    listarPagantes();
    const textoValorTotalPago = document.getElementById('valor-total-pago');
    textoValorTotalPago.innerHTML = `VALOR TOTAL PAGO: R$ 0`;
    const textoValorAPagar = document.getElementById('valor-a-pagar');
    textoValorAPagar.innerHTML = `FALTA PAGAR: R$ 0`;
}

function adicionaListaAPagar(){
    for(var i = 0; i < pagantes.length; i++){
        const listaProdutos = document.getElementById(`lista-a-pagar-${i}`)

        for(var x = 0; x < produtos.length; x++){
            listaProdutos.innerHTML += `<li class="item-lista-a-pagar"><label>
            <input class="checkbox-item"
            type="checkbox"
            onclick="selecionaProduto(${i}, ${x})"
            id="produto-${i}-${x}"> #${x} - ${produtos[x].nome.toUpperCase()} </label></li>`
        }
    }
}

function selecionaProduto(idPagante, idProduto){
    const inputCheckBox = document.getElementById(`produto-${idPagante}-${idProduto}`)
    if (inputCheckBox.checked){
        produtos[idProduto].pagantes++;
        calculaValor();

    }
    else{
        produtos[idProduto].pagantes--;
        calculaValor();

    }

}

function calculaValor(){
    let valorTotalPago = 0;
    for(var i = 0; i < pagantes.length; i++){
        let valor = 0;
        for(var x = 0; x < produtos.length; x++){
            const Checkbox = document.getElementById(`produto-${i}-${x}`)
            if(Checkbox.checked){
                valor += produtos[x].valor / produtos[x].pagantes;
                valorTotalPago += produtos[x].valor / produtos[x].pagantes;
            }
        }
        const textoValorPagante = document.getElementById(`valor-a-pagar-${i}`);
        textoValorPagante.innerHTML = `Valor a pagar: R$ ${valor}`
    }
    const textoValorTotalPago = document.getElementById('valor-total-pago');
    textoValorTotalPago.innerHTML = `VALOR TOTAL PAGO: R$ ${valorTotalPago}`;

    let valorTotalConta = 0;

    for(var i = 0; i < produtos.length; i++){
        valorTotalConta += parseFloat(produtos[i].valor);
    }

    const textoValorAPagar = document.getElementById('valor-a-pagar');
    textoValorAPagar.innerHTML = `FALTA PAGAR: R$ ${valorTotalConta - valorTotalPago}`

}

//----------------------------------------------Aplicações--------------------------------------------------
const addProdutos = document.querySelector('#btn-add-produto');
addProdutos.addEventListener('click', () => adicionaProduto())

const addPagantes = document.querySelector('#btn-add-pagante');
addPagantes.addEventListener('click', () => adicionaPagante())
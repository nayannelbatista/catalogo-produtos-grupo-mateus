console.log("Javascript is running!");
const API = "https://dummyjson.com/products";

class Produto {
  nome;
  preco;

  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  formatar() {
    return `${this.nome} - R$ ${this.preco}`;
  }

  validar() {
    if (!this.nome) {
      return 'Preencha o nome do produto';
    }
    if (Number.isNaN(this.preco) || this.preco <= 0) {
      return 'Informe um preço maior que zero.';
    }
    return '';
  }

  paraAPI() {
    return {
      title: this.nome,
      price: this.preco,
    };
  }
}

const botao = document.querySelector("#buscar");
const mensagem = document.querySelector("#mensagem");
const lista = document.querySelector("#lista");

async function buscarProdutos() {
  mensagem.textContent = "Carregando...";
  botao.disabled = true;
  try {
    const resposta = await fetch(API + "?limit=3&select=title,price");
    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }
    const dados = await resposta.json();
    lista.textContent = '';

    for (const dadosProduto of dados.products) {
      const produto = new Produto(dadosProduto.title, dadosProduto.price);
      const item = document.createElement("li");
      item.textContent = produto.formatar();
      lista.appendChild(item);
    }
    mensagem.textContent = 'Consulta concluída com sucesso!';
  } catch (erro) {
    mensagem.textContent = `Erro ao buscar produtos: ${erro.message}`;
  } finally {
    botao.disabled = false;
  }
}
botao.addEventListener('click', buscarProdutos);

const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const botaoSalvar = document.querySelector("#salvar");
const resultado = document.querySelector("#resultado");

async function salvarProduto(evento) {
  evento.preventDefault();
  if (botaoSalvar.disabled) {
    return;
  }
  const nome = campoNome.value.trim();
  const preco = Number(campoPreco.value);
  campoNome.value = nome;

  const produto = new Produto(nome, preco);
  const erroValidacao = produto.validar();

  if (erroValidacao) {
    resultado.textContent = erroValidacao;
    return;
  }

  botaoSalvar.disabled = true;
  resultado.textContent = 'Enviando dados...';

  try {
    const resposta = await fetch(API + '/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(produto.paraAPI()),
    });
    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }
    const dados = await resposta.json();
    resultado.textContent = 'Simulação concluida com sucesso! Produto cadastrado: ' +
     dados.title + ' - R$ ' + dados.price;
    formulario.reset();
    campoNome.focus();
  } catch (erro) {
    resultado.textContent = `Erro ao enviar dados: ${erro.message}`;
  } finally {
    botaoSalvar.disabled = false;
  }
}
formulario.addEventListener('submit', salvarProduto);
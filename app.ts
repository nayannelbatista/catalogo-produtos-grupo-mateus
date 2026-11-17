import { Produto, type DadosProduto } from './Produto.js';

const API = 'https://dummyjson.com/products';

enum EstadoConsulta {
  Carregando,
  Concluida,
  Erro,
}

const botao = document.getElementById('buscar') as HTMLButtonElement;
const mensagem = document.getElementById('mensagem') as HTMLElement;
const lista = document.getElementById('lista') as HTMLElement;

const formulario = document.getElementById('formulario') as HTMLFormElement;
const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoPreco = document.getElementById('preco') as HTMLInputElement;
const botaoSalvar = document.getElementById('salvar') as HTMLButtonElement;
const resultado = document.getElementById('resultado') as HTMLElement;

function mostrarMensagemConsulta(estado: EstadoConsulta): void {
  if (estado === EstadoConsulta.Carregando) {
    mensagem.textContent = 'Carregando...';
  } else if (estado === EstadoConsulta.Concluida) {
    mensagem.textContent = 'Consulta concluída com sucesso!';
  } else {
    mensagem.textContent = 'Erro ao buscar produtos.';
  }
}

async function buscarProdutos(): Promise<void> {
  mostrarMensagemConsulta(EstadoConsulta.Carregando);
  botao.disabled = true;

  try {
    const resposta = await fetch(API + '?limit=6&select=title,price');

    if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
    }

    const dados: { products: DadosProduto[] } = await resposta.json();
    lista.textContent = '';
    
    const produtos: Produto[] = [];

    for (const dadosProduto of dados.products) {
      produtos.push(new Produto(dadosProduto.title, dadosProduto.price));
    }


    for (const produto of produtos) {
      const item = document.createElement('li');
      item.textContent = produto.formatar();
      lista.appendChild(item);
    }

    mostrarMensagemConsulta(EstadoConsulta.Concluida);
  } catch {
    mostrarMensagemConsulta(EstadoConsulta.Erro);
  } finally {
    botao.disabled = false;
  }
}

botao.addEventListener('click', buscarProdutos);

async function salvarProduto(evento: Event): Promise<void> {
  evento.preventDefault();

  const nome: string = campoNome.value.trim();
  const preco: number = Number(campoPreco.value);

  const produto = new Produto(nome, preco);
  const erroValidacao = produto.validar();

  if (erroValidacao !== '') {
    resultado.textContent = erroValidacao;
    return;
  }

  botaoSalvar.disabled = true;
  resultado.textContent = 'Enviando dados...';

  try {
    const resposta = await fetch(API + '/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto.paraAPI()),
    });

    if (!resposta.ok) {
      throw new Error('Falha no envio');
    }

    const dados: DadosProduto = await resposta.json();

    resultado.textContent =
      'Simulação concluída com sucesso! Produto cadastrado: ' +
      dados.title +
      ' - R$ ' +
      dados.price;

    formulario.reset();
    campoNome.focus();
  } catch(erro) {
    if (erro instanceof Error) {
    resultado.textContent = `Erro ao enviar dados: ${erro.message}`;
  } else {
    resultado.textContent = 'Erro desconhecido ao enviar dados.';
  }
  } finally {
    botaoSalvar.disabled = false;
  }
}

formulario.addEventListener('submit', salvarProduto);
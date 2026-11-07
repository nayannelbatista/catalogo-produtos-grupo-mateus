# Aula 3 — 05/11 - Introdução à Programação Orientada a Objetos (POO)

Projeto desenvolvido na aula de Front-end do Grupo Mateus, em 05/11, dando continuidade ao catálogo de produtos implementado nas aulas anteriores.

Nesta etapa, o código foi adaptado para utilizar conceitos iniciais de Programação Orientada a Objetos (POO), com a criação de uma classe para representar os produtos.

## Objetivo

Compreender os conceitos iniciais de Programação Orientada a Objetos e aplicá-los na organização do código existente, utilizando classes e objetos para representar os dados e comportamentos de um produto.

## Conceitos trabalhados

- **Programação Orientada a Objetos (POO):** paradigma de programação baseado na organização do código por meio de objetos.
- **Classe:** estrutura que funciona como um modelo para a criação de objetos.
- **Objeto:** instância de uma classe, com características e comportamentos.
- **Atributos ou propriedades:** dados que representam as características de um objeto.
- **Métodos:** funções definidas dentro de uma classe, responsáveis por seus comportamentos.
- **Construtor:** método especial executado durante a criação de um objeto.
- **`this`:** referência ao próprio objeto, permitindo acessar seus atributos e métodos.
- **Abstração:** representação das características e comportamentos relevantes de um elemento dentro de determinado contexto.
- **Instanciação:** processo de criação de um objeto a partir de uma classe, utilizando `new`.
- **Notação de ponto:** forma de acessar propriedades e métodos de objetos.

## Implementação

### 1. Criação da classe Produto

Foi criada a classe `Produto`, responsável por representar os produtos utilizados no projeto.

```javascript
class Produto {
  nome;
  preco;

  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}
```

A classe possui dois atributos:

- `nome`: armazena o nome do produto.
- `preco`: armazena o preço do produto.

O construtor recebe os valores durante a criação do objeto e utiliza `this` para atribuí-los aos respectivos atributos.

As declarações de `nome` e `preco` antes do construtor representam campos públicos da classe. Em JavaScript, essas declarações são opcionais nesse exemplo, mas ajudam a visualizar a estrutura do objeto.

### 2. Criação dos métodos

Foram implementados três métodos na classe `Produto`.

**formatar()**

```javascript
formatar() {
  return `${this.nome} - R$ ${this.preco}`;
}
```

Retorna uma representação textual do produto, combinando seu nome e preço.

**validar()**

```javascript
validar() {
  if (!this.nome) {
    return "Preencha o nome do produto";
  }

  if (Number.isNaN(this.preco) || this.preco <= 0) {
    return "Informe um preço maior que zero.";
  }

  return "";
}
```

Realiza a validação dos dados do produto, verificando se o nome foi informado e se o preço é um número válido e maior que zero.

O método retorna uma mensagem quando encontra algum problema ou uma string vazia quando não há erros de validação.

**paraAPI()**

```javascript
paraAPI() {
  return {
    title: this.nome,
    price: this.preco,
  };
}
```

Prepara os dados do produto no formato esperado pela API DummyJSON, convertendo os atributos `nome` e `preco` para as propriedades `title` e `price`.

### 3. Instanciação de objetos

A criação de objetos é realizada utilizando a palavra-chave `new`:

```javascript
const produto = new Produto("Caderno", 25.90);
```

Nesse exemplo, um novo objeto da classe `Produto` é criado, recebendo os valores que serão utilizados na inicialização de seus atributos.

É possível criar diferentes objetos a partir da mesma classe, cada um com seus próprios valores.

### 4. Utilização da classe na consulta de produtos (GET)

A função `buscarProdutos()` foi adaptada para criar objetos da classe `Produto` a partir dos dados recebidos da API.

```javascript
for (const dadosProduto of dados.products) {
  const produto = new Produto(
    dadosProduto.title,
    dadosProduto.price
  );

  const item = document.createElement("li");
  item.textContent = produto.formatar();
  lista.appendChild(item);
}
```

Cada produto retornado pela API passa a ser representado por uma instância da classe.

O método `formatar()` é utilizado para apresentar os dados na lista exibida na página.

### 5. Utilização da classe no envio de produtos (POST)

Na função `salvarProduto()`, os dados informados pelo usuário são utilizados para criar uma instância da classe `Produto`:

```javascript
const produto = new Produto(nome, preco);
```

Antes do envio, o método `validar()` é chamado:

```javascript
const erroValidacao = produto.validar();

if (erroValidacao) {
  resultado.textContent = erroValidacao;
  return;
}
```

Caso os dados sejam válidos, o método `paraAPI()` prepara o objeto para o envio:

```javascript
body: JSON.stringify(produto.paraAPI())
```

Dessa forma, a classe concentra a representação dos dados e alguns comportamentos relacionados ao produto, enquanto as funções continuam responsáveis pela interação com a interface e pela comunicação com a API.

## Exercício de reflexão — Conta Bancária

Como exercício de aplicação dos conceitos apresentados, foi proposta a criação de uma classe `ContaBancaria`.

A proposta é identificar quais características e comportamentos poderiam ser representados nessa classe, refletindo sobre:

- Quais seriam seus atributos?
- O que seria recebido pelo construtor?
- Quais métodos poderiam representar os comportamentos de uma conta bancária?
- Como criar objetos a partir dessa classe?

O exercício foi proposto para reflexão e aplicação dos conceitos de POO, não fazendo parte da implementação atual do projeto.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- API DummyJSON

## Como executar

1. Abra a pasta do projeto no VS Code.
2. Abra o arquivo `index.html` utilizando o Live Server.
3. Mantenha conexão com a internet para acessar a API.
4. Utilize os botões de consulta e envio para testar as funcionalidades.

O projeto não exige backend próprio, framework ou instalação de dependências com npm.

## Observações

- A consulta de produtos continua utilizando o método HTTP GET.
- O envio de produtos utiliza o método HTTP POST.
- A API DummyJSON simula o cadastro, mas não salva o produto permanentemente.
- A classe `Produto` foi introduzida para organizar os dados e comportamentos relacionados aos produtos.
- A implementação não utiliza herança ou outros recursos avançados de POO nesta etapa.
- O exercício da classe `ContaBancaria` não foi implementado.
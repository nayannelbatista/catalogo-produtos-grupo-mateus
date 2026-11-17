export type DadosProduto = {
  title: string;
  price: number;
};

export class Produto {
  nome: string;
  preco: number;

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }

  formatar(): string {
    return `${this.nome} - R$ ${this.preco}`;
  }

  validar(): string {
    if (this.nome.trim() === "") {
      return "Preencha o nome do produto";
    }
    if (Number.isNaN(this.preco) || this.preco <= 0) {
      return "Informe um preço maior que zero.";
    }
    return "";
  }

  paraAPI(): DadosProduto {
    return {
      title: this.nome,
      price: this.preco,
    };
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.css']
})
export class TabuleiroComponent {
  public tabuleiro: boolean[][] = [];
  celulasVivas: (number | undefined)[] = [];

  //intervalo
  private intervalId: any;

  //ver se esta rodando
  rodando: boolean = false;

  //iterar as rodadas
  rodadas: number = 0;


  ngOnInit() {
    // Inicialize o tabuleiro com os valores desejados
    this.inicializarTabuleiro();
  }
  
  inicializarTabuleiro() {
    for (let i = 0; i < 10; i++) {
      this.tabuleiro[i] = [];
      for (let j = 0; j < 10; j++) {
        this.tabuleiro[i][j] = false;
      }
    }
  }

  selecionarCelula(linha: number, coluna: number) {
    this.tabuleiro[linha][coluna] = !this.tabuleiro[linha][coluna];

    console.log(this.tabuleiro[linha][coluna]);
  }

  // regras

  // - Qualquer espaço vazio com exatamente três vizinhos vivos se torna uma célula viva. Ex:
  // - Qualquer célula viva com menos de dois vizinhos vivos morre de solidão. Ex:
  // - Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação. Ex:
  // - Qualquer célula viva com dois ou três vizinhos vivos continua viva para a próxima
  // geração. Ex:


  iniciarJogo() {
    console.log("iniciado");
    
    this.intervalId = setInterval(() => {
      this.atualizarStatus();
    }, 500);
  }

  pausarJogo() {
    clearInterval(this.intervalId);
  }

  public resetarJogo() {
    this.pausarJogo();
    this.inicializarTabuleiro();

    this.rodando = false;
    this.rodadas = 0;

  }


  private atualizarStatus() {
    this.rodando = true;
    this.rodadas += 1;

    const nextGrid: boolean[][] = [];
    for (let i = 0; i < 10; i++) {
      nextGrid[i] = [];
      for (let j = 0; j < 10; j++) {
        const vizinhos = this.contarVizinhos(i, j);
        if (this.tabuleiro[i][j]) {
          if (vizinhos === 2 || vizinhos === 3) {
            nextGrid[i][j] = true;
          } else {
            nextGrid[i][j] = false;
          }
        } else {
          if (vizinhos === 3) {
            nextGrid[i][j] = true;
          } else {
            nextGrid[i][j] = false;
          }
        }
      }
    }

    this.tabuleiro = nextGrid;
  }

  private contarVizinhos(linha: number, coluna: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newlinha = linha + i;
        const newcoluna = coluna + j;
        if (newlinha >= 0 && newlinha < 10 && newcoluna >= 0 && newcoluna < 10) {
          if (this.tabuleiro[newlinha][newcoluna]) count++;
        }
      }
    }
    return count;
  }
}

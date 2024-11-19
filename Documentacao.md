
# Estrutura do codigo

## Elementos Globais
- frames: Contador de quadros, usado para controlar animações e eventos temporais.
- globais: Objeto que armazena os elementos dinâmicos do jogo, como pássaro, chão, canos e placar.
- telaAtiva: Referência à tela atual do jogo (menu inicial, jogo, ou game over).
- canvas e contexto: Referem-se ao elemento <canvas> e seu contexto de renderização 2D.

## Recursos Externos
Áudios:
- somDeHit: Som de colisão.
- somPulo: Som ao pular.
- somPlacar: Som ao pontuar.
 Sprites:
- sprites: Imagem que contém todos os gráficos do jogo.
## Componentes do Jogo
- **Plano de Fundo**:  Objeto estático que desenha o fundo do jogo no canvas.

- **Chão**:
  - Método criaChao(): Cria o objeto do chão com movimentação infinita.
  Propriedades:

            - Desenha uma faixa de chão no canvas e a move continuamente.
- **Flappy Bird**
  - Método criaFlappybird(): Cria o pássaro controlado pelo jogador.
  Propriedades:

        - pula(): Faz o pássaro subir e toca o som de pulo.

        - atualiza(): Atualiza a posição do pássaro, aplicando gravidade.

        - fazColissao(): Verifica colisões com o chão.
- **Canos**:
  - Método criaCanos(): Gera obstáculos que o jogador deve evitar.

  Propriedades:

        - pares: Array que armazena os canos gerados.
        - temcolissaocomflappy(): Verifica colisão entre o pássaro e os canos.
        - atualiza(): Move os canos e gera novos.
- **Placar**:
  - Método criaPlacar(): Cria o objeto responsável por pontuar.
   Propriedades:

        - desenha(): Exibe a pontuação atual.
        - atualiza(): Incrementa a pontuação ao passar canos.
 ## Telas do Jogo
1- **Tela Inicial**:

- Exibe o menu inicial com instruções.
- Transita para o jogo ao clicar.
2 - **Tela do Jogo**

- Contém os principais elementos: fundo, canos, chão, pássaro e placar.
- Atualiza os elementos e registra interações do jogador.
3- **Tela de Game Over**
- Mostra a pontuação final e a melhor pontuação armazenada no localStorage.
- Retorna ao menu inicial ao clicar.
## Funções Auxiliares
- mudaparaTela(novaTela): Alterna entre as telas.
- gerenciarPontuacao(novaPontuacao): Atualiza a melhor pontuação no localStorage.
- obterMelhorPontuacao(): Recupera a melhor pontuação armazenada.
## Fluxo do Jogo
Inicialização:
- Define a tela inicial como ativa.
- Chama loop() para iniciar o jogo.
- **loop()**:Atualiza e desenha a tela ativa. Usa requestAnimationFrame() para criar um ciclo contínuo de animação.
Eventos de Interação:
- Clique: Interage com a tela ativa (pular, iniciar jogo, etc.).
_Configurações Gráficas_
- Fonte: 'VT323', tamanho variável conforme a necessidade.
- Estilo de pontuação e textos: Centralizado, cor branca.

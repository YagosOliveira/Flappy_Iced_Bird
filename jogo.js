console.log('[Yago Dev] Flappy Iced Bird');

let frames = 0;
const somDeHit = new Audio();
somDeHit.src = './efeitos/hit.wav';
const somPulo = new Audio();
somPulo.src = './efeitos/pulo.wav';
const somPlacar = new Audio();
somPlacar.src = './efeitos/ponto.wav';

const sprites = new Image();
sprites.src = './sprite3.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//plano de fundo
const backgroud = {
    spriteX:486,
    spriteY:7,
    largura:400,
    altura:272,
    x:0,
    y: canvas.height - 360,
    desenha(){
        contexto.fillStyle = '#051642';
        contexto.fillRect(0, 0, canvas.width, canvas.height);


        contexto.drawImage(
        sprites,
        backgroud.spriteX,backgroud.spriteY,
        backgroud.largura,backgroud.altura,
        backgroud.x,backgroud.y,
        backgroud.largura,backgroud.altura,
    );
    contexto.drawImage(
        sprites,
        backgroud.spriteX,backgroud.spriteY,
        backgroud.largura,backgroud.altura,
        (backgroud.x + backgroud.largura),backgroud.y,
        backgroud.largura,backgroud.altura,
    );
  }
};

//chao
function criaChao(){
    const chao = {
        spriteX:64,
        spriteY:640,
        largura:340,
        altura:122,
        x:0,
        y: canvas.height - 90,
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,
                chao.largura,chao.altura,
                chao.x,chao.y,
                chao.largura,chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,
                chao.largura,chao.altura,
                (chao.x + chao.largura),chao.y,
                chao.largura,chao.altura,
            );
        },
        atualiza(){
            //console.log('mexer o chao');
            const movimentoDoChao = 1;
            const repeteEm = chao.largura;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;

        }
    }
    return chao;
}


function fazColissao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >=chaoY){
        return true;
    }
    return false;
}

function criaFlappybird(){
    const flappyBird = {
        spriteX: 65,
        spriteY: 0,
        largura: 36,
        altura: 26,
        x: 30,
        y: 140,
        velocidade: 0,
        gravidade: 0.07,
        pulo: 3 ,
        pula(){
            console.log('devo pular');
            flappyBird.velocidade = -flappyBird.pulo;
            somPulo.play();
        },
        atualiza(){
            if(fazColissao(flappyBird, globais.chao)){
                //console.log('fez colisao')
                somDeHit.play();
                gerenciarPontuacao(globais.placar.pontuacao);
                mudaparaTela(telas.GAMEOVER);
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            console.log(flappyBird.velocidade);
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos:[
            {spriteX:65, spriteY:0,},//asa pra cima
            {spriteX:65,spriteY:29,},//asa no meio
            {spriteX:65,spriteY:58,},//asa em baixo
        ],
        frameAtual:0,
        atualizaOframeAtual(){
            const intervaloDeFrames = 100;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            // console.log('passouOIntervalo', passouOIntervalo)

            if(passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        desenha(){
            flappyBird.atualizaOframeAtual();
            const { spriteX , spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
            sprites,
            spriteX, spriteY,//sprite x e y(referente a posição da sprite)
            flappyBird.largura,flappyBird.altura,//tamanho do recorte da sprite
            flappyBird.x,flappyBird.y,
            flappyBird.largura,flappyBird.altura,
            );
    
        }
    }
    return flappyBird;
}



//menu de inicio 
const menuinicial = {
    sx: 204,
    sy:0,
    largura: 190,
    altura: 163,
    x: (canvas.width / 2) - 190/2,
    y:50,
    desenha(){
        contexto.drawImage(
        sprites,
        menuinicial.sx, menuinicial.sy,//sprite x e y(referente a posição da sprite)
        menuinicial.largura,menuinicial.altura,//tamanho do recorte da sprite
        menuinicial.x,menuinicial.y,
        menuinicial.largura,menuinicial.altura,
        );

    }
}

//MENU GAME OVER 
const mensagemGameOver = {
    sx: 204,
    sy:165,
    largura: 255,
    altura: 220,
    x: (canvas.width / 2) - 245/2,
    y:50,
    desenha(){
        contexto.drawImage(
        sprites,
        mensagemGameOver.sx, mensagemGameOver.sy,//sprite x e y(referente a posição da sprite)
        mensagemGameOver.largura,mensagemGameOver.altura,//tamanho do recorte da sprite
        mensagemGameOver.x,mensagemGameOver.y,
        mensagemGameOver.largura,mensagemGameOver.altura,
        );

    }
}

//CANOS
function criaCanos() {
    const canos = {
      largura: 60,
      altura: 400,
      chao: {
        spriteX: 63,
        spriteY: 183,
      },
      ceu: {
        spriteX: 120,
        spriteY: 230,
      },
      espaco: 80,
      desenha(){
        canos.pares.forEach(function(par){
                const Yrandom = par.y;
                const espacamentoentreCanos = 140;
                const canoCeux = par.x;
                const canoCeuy = Yrandom;
                //cano ceu 
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX,canos.ceu.spriteY,
                canos.largura,canos.altura,
                canoCeux,canoCeuy,
                canos.largura, canos.altura,
            )

            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoentreCanos + Yrandom;
            //cano chao
            contexto.drawImage(
                sprites,
                canos.chao.spriteX,canos.chao.spriteY,
                canos.largura,canos.altura,
                canoChaoX,canoChaoY,
                canos.largura, canos.altura,
            )
            par.canoCeu = {
                x: canoCeux,
                y: canos.altura + canoCeuy
            }
            par.canoChao = {
                x:canoChaoX,
                y:canoChaoY
            }
        })
        
      },
      temcolissaocomflappy(par){
        const cabecaDoFlappy = globais.flappyBird.y + 15;
        const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
        if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
            //console.log('passarinho invadiu');
           if(cabecaDoFlappy <=par.canoCeu.y){
                gerenciarPontuacao(globais.placar.pontuacao);
                return true;
           }
           if(peDoFlappy>=par.canoChao.y){
                gerenciarPontuacao(globais.placar.pontuacao);
                return true;
           }
        }
        return false;
      },
      pares:[],
      atualiza(){
        const passou100Frames = frames % 100 === 0;
        if(passou100Frames){
           // console.log('passou 100 frames');
           canos.pares.push({
            x:canvas.width,
            y: -150 * (Math.random() + 1),
           });
        }
        canos.pares.forEach(function(par){
            par.x = par.x - 2;

            if(canos.temcolissaocomflappy(par)){
                console.log('voce perdeu');
                somDeHit.play();
                mudaparaTela(telas.GAMEOVER);
            }

            if(par.x  + canos.largura <=0){
                canos.pares.shift();
            }
        });
      }
    }
    return canos;
}

function criaPlacar(){
    const placar = {
        pontuacao: 0,
        desenha(){
            contexto.font = '35px VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
            placar.pontuacao
        },
        atualiza(){
            const intervaloDeFrames = 100;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1;
                //somPlacar.play();
            }
        }
    };
    return placar;
}

//PONTUACAO

function gerenciarPontuacao(novaPontuacao) {
    const pontuacaoAtual = Number(localStorage.getItem('melhorPontuacao')) || 0;

    if (novaPontuacao > pontuacaoAtual) {
        localStorage.setItem('melhorPontuacao', novaPontuacao);
        return novaPontuacao; // Nova melhor pontuação
    }
    return pontuacaoAtual; // Retorna a melhor pontuação anterior
}

function obterMelhorPontuacao() {
    return Number(localStorage.getItem('melhorPontuacao')) || 0;
}

function Criadopor() {
    contexto.font = '12px Montserrat';
    contexto.textAlign = 'right';
    contexto.fillStyle = 'white';
    contexto.fillText(
        'Desenvolvido por Yago Oliveira',
        canvas.width - 10, // Ajuste para margem direita
        canvas.height - 10 // Ajuste para margem inferior
    );
}

//telas
const globais = {};
let telaAtiva = {};
function mudaparaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
    
}
const telas = {
    INICIO:{
        inicializa(){
            globais.flappyBird = criaFlappybird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha(){
            backgroud.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            menuinicial.desenha();
        },
        click(){
            mudaparaTela(telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
            
        }
    }
}

telas.JOGO = {
    inicializa(){
        globais.placar = criaPlacar();
    },
    desenha(){
        backgroud.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
}

telas.GAMEOVER = {
    desenha(){
        mensagemGameOver.desenha();
        Criadopor();
        contexto.font = 'bold 20px VT323';
        contexto.textAlign = 'center';
        contexto.fillStyle = 'Black';
        contexto.fillText(
            `${globais.placar.pontuacao}`,
            (canvas.width / 2) + 85,
            mensagemGameOver.y + mensagemGameOver.altura - 120
        );
        contexto.fillText(
            `${obterMelhorPontuacao()}`,
            (canvas.width / 2) + 85,
            mensagemGameOver.y + mensagemGameOver.altura - 75);
    },
    atualiza(){

    }, 
    click(){
        mudaparaTela(telas.INICIO);
    }
}


function loop(){
    telaAtiva.desenha();
    telaAtiva.atualiza();
    frames = frames + 1;

    requestAnimationFrame(loop);
}

// Adicionando evento de teclado
window.addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada foi a barra de espaço
    if (event.code === 'Space') {
        if (telaAtiva.click) {
            telaAtiva.click();
        }
        event.preventDefault(); // Impede o comportamento padrão (como rolagem para baixo no navegador)
    }
});

// Mantendo o clique do mouse
window.addEventListener('click', function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

    mudaparaTela(telas.INICIO);
    loop();

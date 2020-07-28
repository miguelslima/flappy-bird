console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const background = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY, //Sprite X, Sprite Y
      background.largura, background.altura, // Tamanho do recorte na sprite
      background.x, background.y,
      background.largura, background.altura,
    );

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY, //Sprite X, Sprite Y
      background.largura, background.altura, // Tamanho do recorte na sprite
      (background.x + background.largura), background.y,
      background.largura, background.altura,
    );
  }  
}


const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, //Sprite X, Sprite Y
      chao.largura, chao.altura, // Tamanho do recorte na sprite
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY, //Sprite X, Sprite Y
      chao.largura, chao.altura, // Tamanho do recorte na sprite
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  }
}

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + 1;
  },
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, //Sprite X, Sprite Y
      flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  }
}

const messagemGetReady = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      messagemGetReady.spriteX, messagemGetReady.spriteY, //Sprite X, Sprite Y
      messagemGetReady.largura, messagemGetReady.altura, // Tamanho do recorte na sprite
      messagemGetReady.x, messagemGetReady.y,
      messagemGetReady.largura, messagemGetReady.altura,
    );
  }
}

//
// [TELAS]
//

let telaAtiva = {};

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;
}

const Telas = {
  INICIO: {
    desenha() {
      background.desenha();
      chao.desenha();
      messagemGetReady.desenha();
      flappyBird.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {

    }
  }
};

Telas.JOGO = {
  desenha() {
    background.desenha();
    chao.desenha();
    flappyBird.desenha();
  },
  atualiza () {
    flappyBird.atualiza();
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
})

mudaParaTela(Telas.INICIO);
loop();
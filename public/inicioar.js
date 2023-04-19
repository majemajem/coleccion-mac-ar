// detect click event
const oeEscuchame = document.querySelector('#oe-escuchame');
const segundaOpcion = document.querySelector('#segunda-opcion');
// falta implementar doble reconocimiento con .innerHTML
const afiches = document.querySelectorAll('.afiche');
const body = document.getElementsByTagName("BODY")[0];
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];
const enlacePdf = document.querySelector('.af-link');
const posicionesDeAnimacion = [
  {x: 0, y: 40, z: 0}, 
  {x: 0, y: -46, z: 0}, 
  {x: 39, y: 29, z: 0}, 
  {x: 0, y: -13, z: 0}, 
  {x: -10, y: -20, z: -13}, 
  {x: 0, y: 38, z: 0}, 
  {x: -14, y: 31, z: 10}, 
  {x: -32, y: -45, z: 13}, 
  {x: 26, y: 20, z: 0}, 
  {x: -40, y: -12, z: 20}, 
  {x: -35, y: -43, z: 0}
];
let animacioncita = [];

// INICIO
body.onload = inicioTransparente();
// oeEscuchame.flushToDOM(true);
// animacionInicial();
// animacionIdle();
afiches.forEach((afiche, i) => {
  let current = posicionesDeAnimacion[i];
    let durVaried = 1500 + i*50;
    let prueba = anime({
    targets: `#${afiche.id}`,
    rotation: [
      {value: `${current.x} ${current.y} ${current.z}`, duration: durVaried},
      {value: "0 0 0", duration: durVaried},
      {value: "0 0 0", duration: 1500}
    ],
    easing: 'easeInOutQuad',
    loop: true,
    autoplay: false
    });
    animacioncita.push(prueba);
});

console.log(animacioncita[1].autoplay);

oeEscuchame.addEventListener("targetFound", () => {
  animacionInicial();
  animacionIdle();
});

oeEscuchame.addEventListener("targetLost", () => {
  // inicioTransparente();
  antiAnimacion();
  // afiches.forEach((afiche) => {
  //   console.log(afiche.getAttribute('material.opacity'));
  // });
});

enlacePdf.addEventListener("click", () => {
  window.location.href = "https://drive.google.com/file/d/1Zcolrzta1z2mveggUa3XAAWd-iNR9HlI/view?usp=sharing";
});

enlacePdf.addEventListener("touchstart", () => {
  window.location.href = "https://drive.google.com/file/d/1Zcolrzta1z2mveggUa3XAAWd-iNR9HlI/view?usp=sharing";
});

// FUNCIONES
function inicioTransparente(){
  afiches.forEach((afiche) => {
    afiche.setAttribute('opacity', '0.0');
    afiche.setAttribute('visible', 'false');
  });
};

function animacionInicial() {
  afiches.forEach((afiche) => {
    afiche.setAttribute('visible', 'true');
    afiche.setAttribute('animation', {
      'property': 'opacity', 
      'from': 0.0,
      'to': 1.0,
      'easing': 'linear',
      'dur': 500,
      'loop': 1});
  });
};

function animacionIdle() {
  afiches.forEach((afiche, i) => {
    afiche.addEventListener('animationcomplete', () => {
      animacioncita[i].play();
    });
  });
};

function antiAnimacion() {
  afiches.forEach((afiche, i) => {
    afiche.setAttribute('animation', {
      'property': 'opacity', 
      'from': 1.0,
      'to': 0.0,
      'easing': 'linear',
      'dur': 500,
      'loop': 1});
    animacioncita[i].restart();
    animacioncita[i].pause();
    // afiche.setAttribute('rotation', '0 0 0');

  });
};

// so far no funciona
// function animacionCompleta(){
//   oeEscuchame.setAttribute('animation', {
//     'property': 'scale',
//     'from': {x: 0.5, y: 0.5, z: 0.5},
//     'to': {x: 1, y: 1, z: 1},
//     'easing': 'easeInQuad',
//     'dur': 5000,
//     'loop': 1
//   });
// };


// console.log(afiches);
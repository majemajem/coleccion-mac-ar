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
  {x: 0, y: 40, z: 0}, {x: 0, y: -46, z: 0}, 
  {x: 39, y: 29, z: 0}, {x: 0, y: -13, z: 0}, 
  {x: -10, y: -20, z: -13}, {x: 0, y: 38, z: 0}, 
  {x: -14, y: 31, z: 10}, {x: -32, y: -45, z: 13}, 
  {x: 26, y: 20, z: 0}, {x: -40, y: -12, z: 20}, 
  {x: -35, y: -43, z: 0}
];
let animacioncita = [];

const escalasPartida = [
  {height: 0.16, width: 0.148}, {height: 0.19, width: 0.11}, 
  {height: 0.12, width: 0.083}, {height: 0.14, width: 0.117}, 
  {height: 0.06, width: 0.079}, {height: 0.057, width: 0.093}, 
  {height: 0.107, width: 0.065}, {height: 0.243, width: 0.192}, 
  {height: 0.142, width: 0.098}, {height: 0.069, width: 0.116},
  {height: 0.059, width: 0.044}
];
const escalasLlegada = [
  {height: 0.5, width: 0.46}, {height: 0.59, width: 0.34}, 
  {height: 0.4, width: 0.26}, {height: 0.44, width: 0.36}, 
  {height: 0.2, width: 0.24}, {height: 0.17, width: 0.28}, 
  {height: 0.33, width: 0.2}, {height: 0.75, width: 0.59}, 
  {height: 0.44, width: 0.3}, {height: 0.21, width: 0.36},
  {height: 0.18, width: 0.13}
];
const posPartida = [
  "-0.045 0.41 -0.5", "0.08 0.44 -0.5", "-0.08 0.04 -0.5",
  "0.02 0.1 -0.5", "0.12 -0.02 -0.85", "0.125 0.06 -0.5",
  "-0.07 -0.2 -0.5", "0.055 -0.29 -0.5", "-0.085 -0.56 -0.5",
  "0.045 -0.6 -0.5", "0.125 -0.59 -0.5"
];
const posLlegada = [
  "-0.205 0.88 0", "0.2 0.925 0", "-0.31 0.29 0", 
  "0.005 0.4 0", "0.31 0.52 0", "0.33 0.33 0",
  "-0.28 -0.08 0", "0.12 -0.2 0", "-0.33 -0.47 0", 
  "0.1 -0.685 0", "0.35 -0.67 0"
];

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
  afiches.forEach((afiche, i) => {
    // afiche.setAttribute('opacity', '0.0');
    // afiche.setAttribute('visible', 'false');
    afiche.setAttribute('height', escalasPartida[i].height);
    afiche.setAttribute('width', escalasPartida[i].width);
    afiche.setAttribute('position', posPartida[i]);
  });
};

function animacionInicial() {
  afiches.forEach((afiche, i) => {
    afiche.setAttribute('visible', 'true');
    // afiche.setAttribute('animation', {
    //   'property': 'opacity', 
    //   'from': 0.0,
    //   'to': 1.0,
    //   'easing': 'linear',
    //   'dur': 500,
    //   'loop': 1});
    afiche.setAttribute('animation__2', {
      'property': 'position',
      'from': posPartida[i],
      'to': posLlegada[i],
      // 'startEvents': 'animationcomplete',
      'dur': 1200,
      'loop': 1,
      'easing': 'easeInOutCirc'
    });
    afiche.setAttribute('animation__height', {
      'property': 'height',
      'from': escalasPartida[i].height,
      'to': escalasLlegada[i].height,
      // 'startEvents': 'animationcomplete',
      'dur': 1200,
      'loop': 1,
      'easing': 'easeInOutCirc'
    });
    afiche.setAttribute('animation__width', {
      'property': 'width',
      'from': escalasPartida[i].width,
      'to': escalasLlegada[i].width,
      // 'startEvents': 'animationcomplete',
      'dur': 1200,
      'loop': 1,
      'easing': 'easeInOutCirc'
    })
  });
};

function animacionIdle() {
  afiches.forEach((afiche, i) => {
    afiche.addEventListener('animationcomplete__width', () => {
      animacioncita[i].play();
    });
  });
};

function antiAnimacion() {
  afiches.forEach((afiche, i) => {
    // afiche.removeAttribute('animation');
    afiche.removeAttribute('animation__2');
    afiche.removeAttribute('animation__height');
    afiche.removeAttribute('animation__width');
    afiche.setAttribute('height', escalasPartida[i].height);
    afiche.setAttribute('width', escalasPartida[i].width);
    afiche.setAttribute('position', posPartida[i]);
    // afiche.setAttribute('visible', 'false');
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
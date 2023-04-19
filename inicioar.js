// detect click event
const oeEscuchame = document.querySelector('#oe-escuchame');
const segundaOpcion = document.querySelector('#segunda-opcion');
// falta implementar doble reconocimiento con .innerHTML
const afiches = document.querySelectorAll('.afiche');
const body = document.getElementsByTagName("BODY")[0];
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];
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

// INICIO
body.onload = inicioTransparente();
oeEscuchame.flushToDOM(true);
animacionInicial();
animacionIdle();

oeEscuchame.addEventListener("targetFound", () => {
  animacionInicial();
  animacionCompleta();
});

oeEscuchame.addEventListener("targetLost", () => {
  inicioTransparente();
  antiAnimacion();
  afiches.forEach((afiche) => {
    console.log(afiche.getAttribute('material.opacity'));
  })
})

// FUNCIONES
function inicioTransparente(){
  afiches.forEach((afiche) => {
    afiche.setAttribute('opacity', '0.0');
    afiche.setAttribute('visible', 'false');
  });
};

function animacionIdle() {
  afiches.forEach((afiche, i) => {
    afiche.addEventListener('animationcomplete', () => {
      console.log("te escuché");
      let current = posicionesDeAnimacion[i];
      let durVaried = 1500 + i*50;
      anime({
      targets: `#${afiche.id}`,
      rotation: [
        {value: `${current.x} ${current.y} ${current.z}`, duration: durVaried},
        {value: "0 0 0", duration: durVaried},
        {value: "0 0 0", duration: 1500}
      ],
      easing: 'easeInOutQuad',
      loop: true
      });
      console.log(durVaried);
      console.log(`${current.x} ${current.y} ${current.z}`);
      // console.log(afiche.components.rotation.data);
    });
  });
};

function animacionInicial() {
  afiches.forEach((afiche, i) => {
    afiche.setAttribute('visible', 'true');
    afiche.setAttribute('animation__2', {
      'property': 'opacity', 
      'from': 0.0,
      'to': 1.0,
      'easing': 'linear',
      'dur': 500,
      'loop': 1});
    afiche.emit(`startanim001`, null, false);
  });
};

// CLICKS EN AFICHES -- MODIFICAR
// afiches.forEach((afiche, i) => {
//   let contador = 0;
//   let current = posicionesDeAnimacion[i];
//   afiche.addEventListener('click', () => {
//     if (contador == 0) {
//       afiche.setAttribute('animation__2', {'property': 'rotation',
//       'from': {x: 0, y: 0, z: 0},
//       'to': current,
//       'loop': 1,
//       'dur': 1000,
//       'easing': 'easeInOutQuad'
//       }
//     );
//     contador++;
//     } else if (contador == 1) {
//       afiche.setAttribute('animation__2', {'property': 'rotation',
//       'from': current,
//       'to': {x: 0, y: 0, z: 0},
//       'loop': 1,
//       'dur': 1000,
//       'easing': 'easeInOutQuad'
//       }
//     );
//       contador = 0;
//     }
//     console.log(contador);
//     console.log(afiche.components.rotation);
//   })
// });

function antiAnimacion() {
  afiches.forEach((afiche) => {
    afiche.setAttribute('animation', {
      'property': 'opacity', 
      'from': 1.0,
      'to': 0.0,
      'easing': 'linear',
      'dur': 500,
      'loop': 1});
  });
};


function animacionCompleta(){ // so far no funciona
  oeEscuchame.setAttribute('animation', {
    'property': 'scale',
    'from': {x: 0.5, y: 0.5, z: 0.5},
    'to': {x: 1, y: 1, z: 1},
    'easing': 'easeInQuad',
    'dur': 5000,
    'loop': 1
  });
};


// console.log(afiches);

// componente inútil ↓
AFRAME.registerComponent('model-opacity', {
  schema: {default: 1.0},
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    var data = this.data;
    if (!mesh) { console.log("csmr"); return;}
    mesh.traverse(function (node) {
      if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = data < 1.0;
        node.material.needsUpdate = true;
      }
    });
  }
});
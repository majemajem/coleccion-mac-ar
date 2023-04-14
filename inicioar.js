// detect click event
const oeEscuchame = document.querySelector('#oe-escuchame');
const segundaOpcion = document.querySelector('#segunda-opcion');
// falta implementar doble reconocimiento con .innerHTML
const afiches = document.querySelectorAll('.afiche');
const body = document.getElementsByTagName("BODY")[0];
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-image-system"];

// INICIO
body.onload = inicioTransparente();

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
    afiche.setAttribute('material.opacity', '0.0');
  });
};

function animacionInicial() {
  afiches.forEach((afiche) => {
    afiche.setAttribute('animation', {
      'property': 'material.opacity', 
      'from': 0.0,
      'to': 1.0,
      'easing': 'linear',
      'dur': 2500,
      'loop': 1});
  });
};

function antiAnimacion() {
  afiches.forEach((afiche) => {
    afiche.setAttribute('animation', {
      'property': 'material.opacity', 
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
    'dur': 2500,
    'loop': 1
  });
};

// CLICKS EN AFICHES -- MODIFICAR
afiches.forEach((afiche) => {
  let contador = 0;
  afiche.addEventListener('click', () => {
    let beamos = afiche.getAttribute('id');
    if (contador == 0) {
      afiche.setAttribute('animation__2', {'property': 'rotation',
      'from': {x: 0, y: 0, z: 0},
      'to': {x: -32, y: -45, z: 13},
      'loop': 1,
      'dur': 1000,
      'easing': 'easeInOutQuad'
      }
    );
    contador++;
    } else if (contador == 1) {
      afiche.setAttribute('animation__2', {'property': 'rotation',
      'from': {x: -32, y: -45, z: 13},
      'to': {x: 0, y: 0, z: 0},
      'loop': 1,
      'dur': 1000,
      'easing': 'easeInOutQuad'
      }
    );
      contador = 0;
    }
    // console.log(contador);
  })
});

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
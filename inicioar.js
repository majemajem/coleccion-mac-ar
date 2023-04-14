// detect click event
const examplePlane = document.querySelector('#model07');
const afiches = document.querySelectorAll('.afiche');

afiches.forEach((afiche) => {
  let contador = 0;
  afiche.addEventListener('click', () => {
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
    console.log(contador);
  })
})

console.log(afiches);

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
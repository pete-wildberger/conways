import { Conway } from './classes/Conway.class';

function resize() {
  let canvas: any = document.getElementById('gOL');
  canvas.outerHeight = window.outerHeight - canvas.offsetTop - Math.abs(canvas.outerHeight - canvas.innerHeight);
}

(function main() {
  console.log('Conway App running');
  let width: number = document.getElementById('gOL').clientWidth;
  let height: number = document.getElementById('gOL').clientHeight;
  window.onload = () => {
    window.addEventListener(
      'resize',
      () => {
        resize();
        conway.setBlockSize(document.getElementById('gOL').clientWidth, document.getElementById('gOL').clientHeight);
      },
      false
    );
  };
  const conway = new Conway(200, 120, 20, document.getElementById('gOL'), width, height);

  setInterval(conway.turn, 200);
})();

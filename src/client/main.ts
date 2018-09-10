import { Conway } from './classes/Conway.class';

function resize() {
	let canvas: any = document.getElementById('gOL');
	canvas.outerHeight = window.outerHeight - canvas.offsetTop - Math.abs(canvas.outerHeight - canvas.innerHeight);
}

(function main() {
	window.onload = () => {
		window.addEventListener('resize', resize, false);
	};
	console.log('Conway App running');
	const conway = new Conway(100, 60, 10);
})();

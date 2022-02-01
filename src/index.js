import Template from '@templates/Template.js';
import '@styles/main.css';
import '@styles/vars.scss';

console.log('test');
console.log('Another test');

(async function App() {
	const main = null || document.getElementById('main');
	main.innerHTML = await Template();
})();

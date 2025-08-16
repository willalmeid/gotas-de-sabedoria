import { fetchQuotes } from './utils.js';

const randomQuoteBtn = document.getElementById('random-quote-btn');
const modal = document.getElementById('modal');
const modalContentText = document.getElementById('modal-content-card');
const closeModalBtn = document.getElementById('close-modal');

let quotesData = [];

function showRandomQuote() {
	if (quotesData.length > 0) {
		const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];

		// Crie o HTML do modal com um ID para o novo botão
		modalContentText.innerHTML = `
            <blockquote>
                "${randomQuote.text}"
            </blockquote>
            <cite>— ${randomQuote.author}</cite>
        `;
		modal.classList.remove('hidden');

		// Adicione o event listener ao novo botão APÓS ele ter sido criado
		const gerarOutraBtn = document.getElementById('gerar-outra-btn');
		gerarOutraBtn.addEventListener('click', showRandomQuote);
	}
}

// Event Listeners para elementos que já existem
if (randomQuoteBtn) randomQuoteBtn.addEventListener('click', showRandomQuote);
if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
if (modal)
	modal.addEventListener('click', e => {
		if (e.target === modal) {
			modal.classList.add('hidden');
		}
	});

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
	quotesData = await fetchQuotes();
});

import { fetchQuotes } from './utils.js';

const quotesGrid = document.getElementById('quotes-grid');
const filterNav = document.getElementById('filter-nav');
const searchInput = document.getElementById('search-input');

let quotesData = [];
let activeFilter = 'Todos';

function createQuoteCard(quote) {
	const card = document.createElement('div');
	card.className = 'quote-card';
	card.dataset.themes = quote.themes.join(',');
	card.dataset.text = `${quote.text} ${quote.author}`.toLowerCase();

	const themesHTML = quote.themes.map(theme => `<span class="theme-tag">${theme}</span>`).join(' ');

	card.innerHTML = `
        <div>
            <blockquote>
                ${quote.text}
            </blockquote>
            <cite>— ${quote.author}</cite>
        </div>
        <div class="theme-tags">
            ${themesHTML}
        </div>
    `;
	return card;
}

function renderQuotes(quotes) {
	quotesGrid.innerHTML = '';
	quotes.forEach((quote, index) => {
		const card = createQuoteCard(quote);
		quotesGrid.appendChild(card);
		setTimeout(() => card.classList.add('card-enter-active'), index * 50);
	});
}

function setupFilters() {
	const themes = new Set(quotesData.flatMap(q => q.themes));
	const allThemes = ['Todos', ...Array.from(themes).sort()];

	filterNav.innerHTML = '';
	allThemes.forEach(theme => {
		const button = document.createElement('button');
		button.textContent = theme;
		button.dataset.filter = theme;
		button.className = `filter-btn ${theme === 'Todos' ? 'active' : ''}`;
		button.onclick = () => filterQuotes(theme);
		filterNav.appendChild(button);
	});
}

function filterQuotes(theme) {
	activeFilter = theme;
	document.querySelectorAll('.filter-btn').forEach(btn => {
		const isSelected = btn.dataset.filter === theme;
		btn.classList.toggle('active', isSelected);
	});
	applyFilters();
}

function applyFilters() {
	const searchTerm = searchInput.value.toLowerCase();

	document.querySelectorAll('.quote-card').forEach(card => {
		const themes = card.dataset.themes.split(',');
		const text = card.dataset.text;

		const themeMatch = activeFilter === 'Todos' || themes.includes(activeFilter);
		const searchMatch = text.includes(searchTerm);

		if (themeMatch && searchMatch) {
			card.classList.remove('hidden');
		} else {
			card.classList.add('hidden');
		}
	});
}

// Event Listeners
searchInput.addEventListener('keyup', applyFilters);

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
	quotesData = await fetchQuotes();
	renderQuotes(quotesData);
	setupFilters();
});

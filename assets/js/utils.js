export async function fetchQuotes() {
	try {
		const response = await fetch('assets/data/quotes.json');
		if (!response.ok) {
			throw new Error('Erro ao carregar o arquivo quotes.json');
		}
		return await response.json();
	} catch (error) {
		console.error('Erro ao carregar as citações:', error);
		return [];
	}
}

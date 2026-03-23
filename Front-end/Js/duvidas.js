// script.js – Busca em tempo real nas perguntas frequentes
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('noResults');
    const searchTermSpan = document.getElementById('searchTerm');

    function filterFAQ() {
        const term = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        faqItems.forEach(item => {
            const summary = item.querySelector('summary').innerText.toLowerCase();
            const answer = item.querySelector('.answer').innerText.toLowerCase();
            const matches = term === '' || summary.includes(term) || answer.includes(term);
            
            if (matches) {
                item.style.display = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Mostra ou esconde mensagem de nenhum resultado
        if (visibleCount === 0 && term !== '') {
            searchTermSpan.textContent = term;
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }

    searchInput.addEventListener('input', filterFAQ);

    // Fecha todos os details ao buscar (opcional, para não poluir a visualização)
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() !== '') {
            faqItems.forEach(item => item.removeAttribute('open'));
        }
    });
});
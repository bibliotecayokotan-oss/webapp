const glossary = [
    { word: "Jkí'im", pronunciation: "hkí-im", meaning: "Agua", definition: "Líquido vital para la vida", category: "sustantivo", cultural_note: "El agua es sagrada" },
    { word: "Té'ts", pronunciation: "té-ts", meaning: "Corazón", definition: "Centro de las emociones", category: "sustantivo" },
    { word: "Kúl", pronunciation: "kúl", meaning: "Hablar", definition: "Expresar palabras", category: "verbo" },
    { word: "Xyum", pronunciation: "xyúm", meaning: "Dulce", definition: "Sabor agradable", category: "adjetivo" }
];

const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const filterButtons = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

searchInput.addEventListener('input', performSearch);
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.category;
        performSearch();
    });
});

function performSearch() {
    const query = searchInput.value.toLowerCase();
    let results = glossary.filter(item => {
        const matchesSearch = item.word.toLowerCase().includes(query) || item.meaning.toLowerCase().includes(query);
        const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
        return matchesSearch && matchesFilter;
    });
    displayResults(results);
}

function displayResults(results) {
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results"><p>😢 No encontramos palabras</p></div>';
        return;
    }
    resultsDiv.innerHTML = results.map(item => `
        <div class="word-card">
            <h3>${item.word}</h3>
            <div class="pronunciation">${item.pronunciation}</div>
            <p><strong>${item.meaning}</strong></p>
            <p>${item.definition}</p>
            ${item.cultural_note ? `<p style="color: #764ba2; font-size: 13px;">📜 ${item.cultural_note}</p>` : ''}
            <span class="category">${item.category}</span>
        </div>
    `).join('');
}

performSearch();
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log('SW Error:', err));
}
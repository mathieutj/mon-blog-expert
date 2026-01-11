document.addEventListener('DOMContentLoaded', () => {
    const postGrid = document.getElementById('post-grid');
    const filterBar = document.getElementById('filter-bar');

    function render() {
        // 1. Générer les filtres
        const categories = ['Tous', ...new Set(POSTS.map(p => p.category))];
        filterBar.innerHTML = categories.map((cat, i) => `
            <button class="filter-btn ${i === 0 ? 'active' : ''}" 
                    onclick="filterPosts('${cat}', this)">${cat}</button>
        `).join('');

        // 2. Générer les articles
        postGrid.innerHTML = POSTS.map(post => `
            <article class="post-card" data-category="${post.category}">
                <span class="category-badge">${post.category}</span>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <a href="articles/${post.slug}.html" class="read-more">Lire l'analyse →</a>
                    <small style="opacity:0.5">${post.date}</small>
                </div>
            </article>
        `).join('');
    }

    window.filterPosts = (category, btn) => {
        // Mise à jour visuelle boutons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtrage cartes
        document.querySelectorAll('.post-card').forEach(card => {
            if (category === 'Tous' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    render();
});

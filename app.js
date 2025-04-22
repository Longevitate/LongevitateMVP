// app.js


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('taxonomy.json');
    const taxonomy = await response.json();
  
    const influencerSelect = document.getElementById('influencerSelect');
    const locationInput = document.getElementById('locationInput');
    const resultsContainer = document.getElementById('resultsContainer');
  
    // Populate influencer dropdown
    taxonomy.forEach(entry => {
      const option = document.createElement('option');
      option.value = entry.influencer;
      option.textContent = entry.influencer;
      influencerSelect.appendChild(option);
    });
  
    // Search handler
    document.getElementById('searchButton').addEventListener('click', () => {
      const selectedInfluencer = influencerSelect.value;
      const userLocation = locationInput.value.trim();
      resultsContainer.innerHTML = '';
  
      const influencer = taxonomy.find(t => t.influencer === selectedInfluencer);
      if (!influencer) return;
  
      influencer.categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'provider-card';
  
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContent = category.name;
  
        const query = encodeURIComponent(`${category.search_keywords.join(' OR ')} near ${userLocation}`);
        const mapLink = document.createElement('a');
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
        mapLink.target = '_blank';
        mapLink.rel = 'noopener noreferrer';
        mapLink.className = 'provider-link';
        mapLink.textContent = 'Find Providers →';
  
        const referencesDiv = document.createElement('div');
        referencesDiv.className = 'references';
  
        category.references.forEach(ref => {
          const refBlock = document.createElement('div');
          refBlock.className = 'reference-block';
  
          const refLink = document.createElement('a');
          refLink.href = ref.url;
          refLink.target = '_blank';
          refLink.rel = 'noopener noreferrer';
          refLink.className = 'reference-link';
          refLink.innerHTML = `${ref.type === 'video' ? '🎥 ' : ''}${ref.title}`;
  
          const refSnippet = document.createElement('p');
          refSnippet.className = 'reference-snippet';
          refSnippet.textContent = ref.snippet;
  
          refBlock.appendChild(refLink);
          refBlock.appendChild(refSnippet);
          referencesDiv.appendChild(refBlock);
        });
  
        card.appendChild(title);
        card.appendChild(mapLink);
        card.appendChild(referencesDiv);
  
        resultsContainer.appendChild(card);
      });
    });
  });
  
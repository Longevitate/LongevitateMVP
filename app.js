// app.js - MVP logic for Longevitate.ai
let taxonomy = [];

// Load taxonomy.json and populate the influencer dropdown
async function loadTaxonomy() {
  taxonomy = await fetch('taxonomy.json').then(res => res.json());
  const select = document.getElementById('influencer');
  taxonomy.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.influencer;
    opt.textContent = item.influencer;
    select.appendChild(opt);
  });
}

// Create a provider card with inline citation and snippet
function createProviderCard(service, location) {
  const keywords = service.search_keywords.join(' OR ');
  const query = `${keywords} near ${location}`;
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  let citationHTML = '';
  let snippetHTML = '';
  if (service.references && service.references.length) {
    const ref = service.references[0];
    citationHTML = `
      <p class="provider-citation">Source: <a href="${ref.url}" target="_blank" class="reference-link">${ref.title}</a></p>
    `;
    if (ref.snippet) {
      snippetHTML = `
        <p class="provider-snippet text-sm text-gray-400 mb-2">${ref.snippet}</p>
      `;
    }
  }

  return `
    <div class="provider-card">
      <h2 class="provider-title">${service.name}</h2>
      ${citationHTML}
      ${snippetHTML}
      <a href="${url}" target="_blank" class="provider-link">Find Providers</a>
    </div>
  `;
}

// Search for providers based on influencer and location
async function searchProviders() {
  const influencer = document.getElementById('influencer').value;
  const location = document.getElementById('location').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const selected = taxonomy.find(x => x.influencer === influencer);
  if (!selected || !location) return;

  selected.categories.forEach(service => {
    const cardHTML = createProviderCard(service, location);
    resultsDiv.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// Event listeners
window.onload = loadTaxonomy;
document.getElementById('searchButton').addEventListener('click', searchProviders);

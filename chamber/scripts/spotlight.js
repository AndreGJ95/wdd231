const memberDataUrl = 'data/members.json';
const spotlightContainer = document.querySelector('#spotlight-container');

async function fetchSpotlights() {
  try {
    const response = await fetch(memberDataUrl);
    if (response.ok) {
      const members = await response.json();
      displaySpotlights(members);
    } else {
      console.error('Failed to load members JSON');
    }
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displaySpotlights(members) {
  const qualifiedMembers = members.filter(member => 
    member.membershipLevel === 'Gold' || 
    member.membershipLevel === 'Silver' || 
    member.membershipLevel === 2 || 
    member.membershipLevel === 3
  );

  const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
  const selectedMembers = shuffled.slice(0, 3);

  if (!spotlightContainer) return;
  spotlightContainer.innerHTML = '';

  selectedMembers.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="${member.image}" alt="Logo de ${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p class="membership-badge"><strong>Nivel:</strong> ${member.membershipLevel}</p>
      <p><strong>Dirección:</strong> ${member.address}</p>
      <p><strong>Teléfono:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Sitio Web</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

fetchSpotlights();
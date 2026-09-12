const jsonPath = 'data/members.json';
const container = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');

const getMembershipLabel = (level) => {
  switch (level) {
    case 3: return 'Gold Member';
    case 2: return 'Silver Member';
    default: return 'Member';
  }
};

async function fetchMembers() {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    container.innerHTML = `<p class="error">Failed to load business directory. ${error.message}</p>`;
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach((member) => {
    const card = document.createElement('section');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="100">
      <div class="member-details">
        <h3>${member.name}</h3>
        <p class="category">${member.category}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        <span class="badge membership-${member.membership}">${getMembershipLabel(member.membership)}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Layout Toggle Controls
gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
  gridBtn.classList.add('active-view');
  listBtn.classList.remove('active-view');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
  listBtn.classList.add('active-view');
  gridBtn.classList.remove('active-view');
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('#menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

menuToggle.addEventListener('click', () => {
  primaryNav.classList.toggle('open');
});

// Footer Info
document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

fetchMembers();
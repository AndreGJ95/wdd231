import { items } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
  
  const messageBanner = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("chamberLastVisit");
  const currentVisit = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;

  if (!lastVisit) {
    messageBanner.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDiff = currentVisit - parseInt(lastVisit, 10);
    const daysDiff = Math.floor(timeDiff / msInDay);

    if (daysDiff < 1) {
      messageBanner.textContent = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      messageBanner.textContent = "You last visited 1 day ago.";
    } else {
      messageBanner.textContent = `You last visited ${daysDiff} days ago.`;
    }
  }

  
  localStorage.setItem("chamberLastVisit", currentVisit.toString());

  
  const cardsContainer = document.getElementById("cards-container");

  function displayCards(data) {
    cardsContainer.innerHTML = "";
    data.forEach((item) => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.photo}" alt="${item.title}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button">Learn More</button>
      `;

      cardsContainer.appendChild(card);
    });
  }

  displayCards(items);

  
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      primaryNav.classList.toggle("open");
    });
  }
});
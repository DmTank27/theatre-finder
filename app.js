// Brisbane coordinates
const map = L.map('map').setView([-27.4698, 153.0251], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const theatreForm = document.getElementById('theatreForm');
const theatreList = document.getElementById('theatreList');

let markers = [];

let theatres = JSON.parse(localStorage.getItem('theatres')) || [
  {
    id: 1,
    name: "Queensland Performing Arts Centre",
    address: "South Brisbane",
    description: "Major performing arts venue.",
    lat: -27.4748,
    lng: 153.0170
  },
  {
    id: 2,
    name: "Twelfth Night Theatre",
    address: "Bowen Hills",
    description: "Community theatre venue.",
    lat: -27.4456,
    lng: 153.0367
  }
];

function saveToStorage() {
  localStorage.setItem('theatres', JSON.stringify(theatres));
}

function openModal(editData = null) {

  modal.classList.remove('hidden');

  if (editData) {
    document.getElementById('modalTitle').textContent = 'Edit Theatre';

    document.getElementById('theatreId').value = editData.id;
    document.getElementById('name').value = editData.name;
    document.getElementById('address').value = editData.address;
    document.getElementById('description').value = editData.description;
    document.getElementById('lat').value = editData.lat;
    document.getElementById('lng').value = editData.lng;

  } else {

    document.getElementById('modalTitle').textContent = 'Add Theatre';
    theatreForm.reset();
    document.getElementById('theatreId').value = '';
  }
}

function closeModal() {
  modal.classList.add('hidden');
}

addBtn.addEventListener('click', () => openModal());

cancelBtn.addEventListener('click', closeModal);

function clearMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
}

function renderTheatres() {

  clearMarkers();

  theatreList.innerHTML = '';

  theatres.forEach(theatre => {

    // Marker
    const marker = L.marker([theatre.lat, theatre.lng]).addTo(map);

    marker.bindPopup(`
      <div class="popup-title">${theatre.name}</div>
      <p><strong>Address:</strong> ${theatre.address}</p>
      <p>${theatre.description}</p>
    `);

    markers.push(marker);

    // Sidebar card
    const card = document.createElement('div');
    card.className = 'theatre-card';

    card.innerHTML = `
      <h3>${theatre.name}</h3>
      <p>${theatre.address}</p>

      <div class="card-buttons">
        <button class="edit-btn">
          Edit
        </button>

        <button class="delete-btn">
          Delete
        </button>
      </div>
    `;

    card.addEventListener('click', (e) => {

      if (
        e.target.classList.contains('edit-btn') ||
        e.target.classList.contains('delete-btn')
      ) {
        return;
      }

      map.setView([theatre.lat, theatre.lng], 15);

      marker.openPopup();
    });

    // Edit
    card.querySelector('.edit-btn')
      .addEventListener('click', () => {
        openModal(theatre);
      });

    // Delete
    card.querySelector('.delete-btn')
      .addEventListener('click', () => {

        const confirmed = confirm(
          `Delete "${theatre.name}"?`
        );

        if (!confirmed) return;

        theatres = theatres.filter(t => t.id !== theatre.id);

        saveToStorage();

        renderTheatres();
      });

    theatreList.appendChild(card);
  });
}

theatreForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const id = document.getElementById('theatreId').value;

  const theatreData = {
    id: id ? Number(id) : Date.now(),
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    description: document.getElementById('description').value,
    lat: parseFloat(document.getElementById('lat').value),
    lng: parseFloat(document.getElementById('lng').value)
  };

  if (id) {

    theatres = theatres.map(t =>
      t.id === Number(id)
        ? theatreData
        : t
    );

  } else {

    theatres.push(theatreData);
  }

  saveToStorage();

  renderTheatres();

  closeModal();
});

renderTheatres();
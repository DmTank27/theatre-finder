# theatre-finder

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Brisbane Theatre Map</title>

  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />

  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <aside class="sidebar">
    <div class="sidebar-header">
      <h1>🎭 Brisbane Theatres</h1>

      <button id="addBtn">
        + Add Theatre
      </button>
    </div>

    <div id="theatreList"></div>
  </aside>

  <main id="map"></main>

  <!-- Modal -->
  <div class="modal hidden" id="modal">
    <div class="modal-content">

      <h2 id="modalTitle">Add Theatre</h2>

      <form id="theatreForm">

        <input type="hidden" id="theatreId" />

        <label>
          Theatre Name
          <input type="text" id="name" required />
        </label>

        <label>
          Address
          <input type="text" id="address" required />
        </label>

        <label>
          Description
          <textarea id="description"></textarea>
        </label>

        <label>
          Latitude
          <input type="number" step="any" id="lat" required />
        </label>

        <label>
          Longitude
          <input type="number" step="any" id="lng" required />
        </label>

        <div class="modal-buttons">
          <button type="submit" class="save-btn">
            Save
          </button>

          <button type="button" id="cancelBtn" class="cancel-btn">
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="app.js"></script>

</body>
</html>
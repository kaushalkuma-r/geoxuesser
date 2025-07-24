let actualLocation;
let guessLatLng = null;
let guessMarker = null;
let miniMap;
let panorama;
let miniMapClicked = false;

let totalRounds = 5;
let currentRound = 0;
let totalScore = 0;

function initGame() {
  document.getElementById("start-game").addEventListener("click", () => {
    totalRounds = parseInt(document.getElementById("round-input").value);
    if (totalRounds <= 0 || isNaN(totalRounds)) totalRounds = 5;

    document.getElementById("landing").style.display = "none";
    document.getElementById("game").style.display = "block";

    setupMiniMap();
    startNewRound();
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    location.reload(); // Simple reset
  });
}

function setupMiniMap() {
  const miniMapDiv = document.getElementById("mini-map");
  const guessBtn = document.getElementById("guess-button");

  miniMap = new google.maps.Map(miniMapDiv, {
    center: { lat: 20, lng: 0 },
    zoom: 1,
    disableDefaultUI: true,
  });

  miniMapDiv.addEventListener("click", () => {
    if (!miniMapClicked) {
      miniMapDiv.classList.add("expanded");
      guessBtn.style.display = "block";
      miniMapClicked = true;
      google.maps.event.trigger(miniMap, "resize");
    }
  });

  miniMap.addListener("click", (event) => {
    guessLatLng = event.latLng;
    if (guessMarker) guessMarker.setMap(null);

    guessMarker = new google.maps.Marker({
      position: guessLatLng,
      map: miniMap,
      title: "Your Guess",
    });
  });

  guessBtn.addEventListener("click", makeGuess);
}

function getRandomLocation() {
  while (true) {
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    const inChina = lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135;
    if (!inChina) return { lat, lng };
  }
}

function startNewRound() {
  if (currentRound >= totalRounds) {
    showFinalScore();
    return;
  }

  actualLocation = getRandomLocation();
  const svService = new google.maps.StreetViewService();
  const svRadius = 1000;

  svService.getPanorama(
    { location: actualLocation, radius: svRadius },
    (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
        panorama = new google.maps.StreetViewPanorama(
          document.getElementById("street-view"),
          {
            pano: data.location.pano,
            visible: true,
            addressControl: false,
            fullscreenControl: false,
            linksControl: true,
            panControl: true,
            enableCloseButton: false,
          }
        );
      } else {
        // Retry with another location
        startNewRound();
      }
    }
  );
}

function makeGuess() {
  if (!guessLatLng) {
    alert("Please select a location on the mini-map.");
    return;
  }

  const distance = haversineDistance(
    [actualLocation.lat, actualLocation.lng],
    [guessLatLng.lat(), guessLatLng.lng()]
  );

  const roundScore = Math.max(0, Math.round(5000 - distance * 0.5));
  totalScore += roundScore;
  currentRound++;

  // alert(`You were ${distance.toFixed(2)} km away! Score this round: ${roundScore}`);

  document.getElementById("round-num").textContent = currentRound;
  document.getElementById("score").textContent = totalScore;

  // Reset mini-map and guess
  if (guessMarker) guessMarker.setMap(null);
  guessMarker = null;
  guessLatLng = null;

  const miniMapDiv = document.getElementById("mini-map");
  miniMapDiv.classList.remove("expanded");
  document.getElementById("guess-button").style.display = "none";
  miniMap.setCenter({ lat: 20, lng: 0 });
  miniMap.setZoom(1);
  miniMapClicked = false;

  startNewRound();
}

function showFinalScore() {
  document.getElementById("game").style.display = "none";
  document.getElementById("final-score").textContent = totalScore;
  document.getElementById("final-result").style.display = "block";
}

function haversineDistance(coords1, coords2) {
  const R = 6371;
  const dLat = toRad(coords2[0] - coords1[0]);
  const dLon = toRad(coords2[1] - coords1[1]);
  const lat1 = toRad(coords1[0]);
  const lat2 = toRad(coords2[0]);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

# 📜 GeoXuesser - A GeoGuessr-Style Street View Game

GeoXuesser is a web-based geography guessing game inspired by GeoGuessr. Players are shown a random Google Street View location and must guess where they are on the map. The closer the guess, the higher the score — up to 5000 points per round.

## 🎮 How to Play

1. Select how many rounds you'd like to play on the landing screen.
2. A random Street View location (excluding China) is shown.
3. Navigate and explore using Street View (pan, zoom, and move like Google Maps).
4. Make a guess on the minimap.
5. After guessing, the game shows the actual location and scores your guess.
6. Repeat until all rounds are complete.
7. View your total score at the end of the game!

## 🧠 Features

* 🌍 Randomized Street View locations (excluding China)
* 🗺️ Interactive minimap for guessing
* 🧽 Full Street View navigation enabled
* 🎯 Score calculated out of 5000 based on guess accuracy
* ♻️ Supports multiple rounds with round tracking
* ✅ Clean UI without browser notifications or popups

## 🚀 Tech Stack

* HTML5 + CSS3
* JavaScript (Vanilla)
* Google Maps JavaScript API (with Street View & Geocoding)

## 🛠️ Setup Instructions

1. **Clone this repository**

```bash
git clone https://github.com/kaushalkuma-r/geoxuesser.git
cd geoxuesser
```

2. **Add your Google Maps API key**

Edit `index.html` and replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"></script>
```

3. **Start a local server**

You can use any local server. For example, with Python:

```bash
# Python 3
python3 -m http.server
```

Then visit: [http://localhost:8000](http://localhost:8000)

## 📸 Screenshots

| Landing Page                        | Game Interface                |
| ----------------------------------- | ----------------------------- |
| ![Landing](screenshots/landing.png) | ![Game](screenshots/game.png) |

## 📄 License

MIT License © 2025 [Kaushal Kumar](https://github.com/kaushalkuma-r)

---

Feel free to contribute or report issues via [GitHub Issues](https://github.com/kaushalkuma-r/geoxuesser/issues)


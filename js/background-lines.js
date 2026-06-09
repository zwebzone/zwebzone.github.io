(function () {
  var lineCount = 14;
  var starCount = 9;
  var moonCount = 1;
  var sunCount = 1;
  var layer = document.createElement("div");
  layer.className = "background-lines";
  layer.setAttribute("aria-hidden", "true");

  function randomShapeStyle(svg) {
    var size = 18 + Math.random() * 34;
    var rotation = -18 + Math.random() * 36;
    var opacity = 0.34 + Math.random() * 0.24;

    svg.style.left = Math.random() * 90 + "%";
    svg.style.top = Math.random() * 92 + "%";
    svg.style.width = size.toFixed(1) + "px";
    svg.style.height = size.toFixed(1) + "px";
    svg.style.opacity = opacity.toFixed(2);
    svg.style.transform = "rotate(" + rotation.toFixed(1) + "deg)";
  }

  function starPoints() {
    var points = [];
    var center = 50;
    var outerRadius = 45;
    var innerRadius = 27;

    for (var index = 0; index < 10; index += 1) {
      var angle = -Math.PI / 2 + index * Math.PI / 5;
      var radius = index % 2 === 0 ? outerRadius : innerRadius;
      points.push({
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius
      });
    }

    return points;
  }

  function roundedStarPath(points) {
    var path = "";
    var corner = 5.4;

    points.forEach(function (point, index) {
      var prev = points[(index - 1 + points.length) % points.length];
      var next = points[(index + 1) % points.length];
      var prevDistance = Math.hypot(point.x - prev.x, point.y - prev.y);
      var nextDistance = Math.hypot(point.x - next.x, point.y - next.y);
      var start = {
        x: point.x + (prev.x - point.x) * (corner / prevDistance),
        y: point.y + (prev.y - point.y) * (corner / prevDistance)
      };
      var end = {
        x: point.x + (next.x - point.x) * (corner / nextDistance),
        y: point.y + (next.y - point.y) * (corner / nextDistance)
      };

      if (index === 0) {
        path += "M " + start.x.toFixed(2) + " " + start.y.toFixed(2) + " ";
      } else {
        path += "L " + start.x.toFixed(2) + " " + start.y.toFixed(2) + " ";
      }

      path += "Q " + point.x.toFixed(2) + " " + point.y.toFixed(2) + " " + end.x.toFixed(2) + " " + end.y.toFixed(2) + " ";
    });

    return path + "Z";
  }

  for (var index = 0; index < lineCount; index += 1) {
    var line = document.createElement("span");
    var length = 80 + Math.random() * 240;
    var opacity = 0.35 + Math.random() * 0.45;
    var rotation = -28 + Math.random() * 56;

    line.className = "background-line";
    line.style.left = Math.random() * 92 + "%";
    line.style.top = Math.random() * 96 + "%";
    line.style.width = length + "px";
    line.style.opacity = opacity.toFixed(2);
    line.style.transform = "rotate(" + rotation.toFixed(1) + "deg)";
    layer.appendChild(line);
  }

  for (var starIndex = 0; starIndex < starCount; starIndex += 1) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("viewBox", "0 0 100 100");
    svg.classList.add("background-star");
    randomShapeStyle(svg);

    path.setAttribute("d", roundedStarPath(starPoints()));
    svg.appendChild(path);
    layer.appendChild(svg);
  }

  for (var moonIndex = 0; moonIndex < moonCount; moonIndex += 1) {
    var moon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var moonPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

    moon.setAttribute("viewBox", "0 0 100 100");
    moon.classList.add("background-star", "background-moon");
    randomShapeStyle(moon);
    moonPath.setAttribute("d", "M 67 13 C 48 17 34 34 34 54 C 34 73 48 88 66 91 C 57 96 46 96 36 92 C 18 85 7 67 11 48 C 15 27 33 12 54 10 C 59 10 63 11 67 13 Z");
    moon.appendChild(moonPath);
    layer.appendChild(moon);
  }

  for (var sunIndex = 0; sunIndex < sunCount; sunIndex += 1) {
    var sun = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var sunPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

    sun.setAttribute("viewBox", "0 0 100 100");
    sun.classList.add("background-star", "background-sun");
    randomShapeStyle(sun);
    sunPath.setAttribute("d", "M 50 5 Q 55 22 61 31 Q 72 26 89 20 Q 80 36 73 47 Q 84 54 96 64 Q 78 65 67 63 Q 64 75 61 94 Q 51 79 45 69 Q 34 76 18 84 Q 25 67 31 56 Q 20 48 5 38 Q 23 36 35 38 Q 39 25 50 5 Z");
    sun.appendChild(sunPath);
    layer.appendChild(sun);
  }

  document.body.prepend(layer);
})();

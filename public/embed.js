/**
 * Immobilien-Rechner — Embed Script
 * https://immobilien-rechner.net
 *
 * Nutzung:
 * <div id="immo-rechner" data-tool="rendite-rechner" data-key="IHR-API-KEY"></div>
 * <script src="https://immobilien-rechner.net/embed.js"></script>
 */
(function () {
  "use strict";

  var BASE_URL = "https://immobilien-rechner.net";

  // Im Entwicklungsmodus die aktuelle Domain nutzen
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    BASE_URL = window.location.origin;
  }

  function init() {
    // Alle Elemente mit id="immo-rechner" oder data-immo-rechner finden
    var containers = document.querySelectorAll(
      "#immo-rechner, [data-immo-rechner]"
    );

    if (containers.length === 0) return;

    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];

      // Nur einmal initialisieren
      if (container.getAttribute("data-initialized") === "true") continue;
      container.setAttribute("data-initialized", "true");

      var tool = container.getAttribute("data-tool");
      var key = container.getAttribute("data-key");

      if (!tool || !key) {
        container.innerHTML =
          '<p style="color: #ef4444; font-size: 14px; padding: 16px;">Immobilien-Rechner: data-tool und data-key Attribute sind erforderlich.</p>';
        continue;
      }

      createEmbed(container, tool, key);
    }
  }

  function createEmbed(container, tool, key) {
    // iFrame erstellen
    var iframe = document.createElement("iframe");
    iframe.src = BASE_URL + "/embed/" + encodeURIComponent(tool) + "?key=" + encodeURIComponent(key);
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.style.minHeight = "400px";
    iframe.style.height = "700px";
    iframe.style.borderRadius = "8px";
    iframe.style.display = "block";
    iframe.style.overflow = "hidden";
    iframe.style.transition = "height 0.2s ease";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("title", "Immobilien-Rechner");
    iframe.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-forms allow-popups"
    );

    // iFrame in den Container einfügen
    container.innerHTML = "";
    container.appendChild(iframe);

    // Auf Höhen-Änderungen vom iFrame reagieren (postMessage)
    window.addEventListener("message", function (event) {
      if (
        event.data &&
        event.data.type === "immo-rechner-resize" &&
        event.source === iframe.contentWindow
      ) {
        var newHeight = event.data.height;
        if (newHeight && newHeight > 0) {
          iframe.style.height = newHeight + 20 + "px";
        }
      }
    });
  }

  // Script initialisieren
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

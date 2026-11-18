(function () {
  "use strict";
  var C = window.FRENEL;
  var importo = C.importoPredefinito;

  var elImporti = document.getElementById("importi");
  var elLibero = document.getElementById("libero");
  var elLiberoBox = document.getElementById("libero-box");
  var elErrore = document.getElementById("errore");
  var elPannello = document.getElementById("pannello-satispay");
  var elImportoSatispay = document.getElementById("importo-satispay");

  // Messaggio della serata: solo nel giorno indicato (ora di Roma)
  var oggi = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  var serata = (C.serate || []).filter(function (s) { return s.data === oggi; })[0];
  if (serata) {
    var elSerata = document.getElementById("serata");
    elSerata.textContent = serata.testo;
    elSerata.hidden = false;
  }

  // Link social
  document.querySelectorAll("[data-social]").forEach(function (a) {
    a.href = C.social[a.getAttribute("data-social")];
  });

  function formatta(n) {
    return n.toLocaleString("it-IT", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €";
  }

  function aggiornaPreset() {
    elImporti.querySelectorAll(".importo").forEach(function (b) {
      b.setAttribute("aria-pressed", String(Number(b.value) === importo && !elLibero.value));
    });
    elLiberoBox.classList.toggle("attivo", !!elLibero.value);
    elImportoSatispay.textContent = importo ? formatta(importo) : "l'importo che preferisci";
  }

  C.importi.forEach(function (n) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "importo";
    b.value = n;
    b.textContent = n + " €";
    b.addEventListener("click", function () {
      elLibero.value = "";
      importo = n;
      elErrore.hidden = true;
      aggiornaPreset();
    });
    elImporti.appendChild(b);
  });

  elLibero.addEventListener("input", function () {
    // solo cifre e un separatore decimale (virgola o punto)
    var pulito = elLibero.value.replace(/[^0-9.,]/g, "").replace(/[.,](?=.*[.,])/g, "");
    if (pulito !== elLibero.value) elLibero.value = pulito;
    var v = parseFloat(pulito.replace(",", "."));
    importo = v > 0 ? Math.round(v * 100) / 100 : null;
    if (!elLibero.value) importo = C.importoPredefinito;
    elErrore.hidden = true;
    aggiornaPreset();
  });

  function valido() {
    if (!importo || importo < 1) {
      elErrore.textContent = "Inserisci un importo di almeno 1 €.";
      elErrore.hidden = false;
      elLibero.focus();
      return false;
    }
    return true;
  }

  // Pagamento PayPal standard (non "donazione"): il conto Frenél non è abilitato alle donazioni.
  function linkPaypal(carta) {
    var p = new URLSearchParams({
      cmd: "_xclick",
      business: C.paypal.email,
      item_name: C.paypal.causale,
      amount: importo.toFixed(2),
      currency_code: "EUR",
      quantity: "1",
      no_shipping: "1",
      no_note: "1",
      lc: "IT",
      rm: "1",
      return: C.baseUrl + "grazie.html",
      cancel_return: C.baseUrl,
    });
    // Per la carta, chiede a PayPal di aprire direttamente il modulo di pagamento con carta
    if (carta) p.set("landing_page", "billing");
    return "https://www.paypal.com/cgi-bin/webscr?" + p.toString();
  }

  document.querySelectorAll("[data-paypal]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (!valido()) return;
      window.location.href = linkPaypal(b.getAttribute("data-paypal") === "carta");
    });
  });

  document.getElementById("btn-satispay").addEventListener("click", function () {
    if (!valido()) return;
    elPannello.hidden = false;
    elPannello.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.getElementById("apri-satispay").href = C.satispay.link;

  aggiornaPreset();
})();

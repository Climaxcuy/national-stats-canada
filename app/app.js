/* Canada in Numbers — app.js
   Shared page behaviour: active nav link, sortable tables, live table
   filters, tabs and the province share/density computations. No network. */

(function () {
  "use strict";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ---- Active navigation link ---------------------------------------- */
  var here = location.pathname.split("/").pop() || "index.html";
  $all(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });

  /* ---- Sortable tables -------------------------------------------------
     Any <table data-sortable> with <th data-key="name|number"> becomes
     clickable to sort. Numeric columns carry data-type="number". */
  $all("table[data-sortable]").forEach(function (table) {
    var tbody = table.querySelector("tbody");
    var dir = {};
    $all("th[data-key]", table).forEach(function (th) {
      th.tabIndex = 0;
      th.setAttribute("role", "button");
      th.setAttribute("aria-sort", "none");
      var run = function () {
        var key = th.getAttribute("data-key");
        var numeric = th.getAttribute("data-type") === "number";
        dir[key] = dir[key] === "asc" ? "desc" : "asc";
        var rows = $all("tr", tbody);
        rows.sort(function (a, b) {
          var av = a.querySelector('[data-' + key + ']').getAttribute("data-" + key);
          var bv = b.querySelector('[data-' + key + ']').getAttribute("data-" + key);
          var cmp = numeric ? Number(av) - Number(bv) : String(av).localeCompare(String(bv));
          return dir[key] === "asc" ? cmp : -cmp;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
        $all("th[data-key]", table).forEach(function (o) { o.setAttribute("aria-sort", "none"); });
        th.setAttribute("aria-sort", dir[key] === "asc" ? "ascending" : "descending");
      };
      th.addEventListener("click", run);
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); run(); }
      });
    });
  });

  /* ---- Live table filter ------------------------------------------------
     <input data-filter-table="#id"> filters rows by their text content. */
  $all("[data-filter-table]").forEach(function (input) {
    var table = $(input.getAttribute("data-filter-table"));
    if (!table) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      $all("tbody tr", table).forEach(function (row) {
        var hit = row.textContent.toLowerCase().indexOf(q) !== -1;
        row.style.display = hit ? "" : "none";
        if (hit) shown += 1;
      });
      var empty = $(".table-empty", table.parentNode);
      if (empty) empty.style.display = shown === 0 ? "" : "none";
    });
  });

  /* ---- Tabs -------------------------------------------------------------
     <div data-tabs> with buttons [data-tab] and panels [data-panel]. */
  $all("[data-tabs]").forEach(function (wrap) {
    var buttons = $all("[data-tab]", wrap);
    var panels = $all("[data-panel]", wrap);
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-tab");
        buttons.forEach(function (b) { b.classList.toggle("on", b === btn); });
        panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== name; });
      });
    });
  });

  /* ---- Province table builder (population + regions pages) ------------- */
  function provinceRows() {
    var total = PROVINCES.reduce(function (s, p) { return s + p.population; }, 0);
    return PROVINCES.map(function (p) {
      var share = (p.population / total) * 100;
      var density = p.population / p.areaKm2;
      return '<tr>' +
        '<td data-name="' + p.name + '"><strong>' + p.name + '</strong> <span class="code">' + p.code + "</span></td>" +
        '<td data-capital="' + p.capital + '">' + p.capital + "</td>" +
        '<td data-population="' + p.population + '" class="num">' + p.population.toLocaleString("en-CA") + "</td>" +
        '<td data-share="' + share.toFixed(2) + '" class="num">' + share.toFixed(1) + "%</td>" +
        '<td data-density="' + density.toFixed(2) + '" class="num">' + density.toFixed(1) + "</td>" +
        '<td data-joined="' + p.joined + '" class="num">' + p.joined + "</td>" +
        '<td data-driver="' + p.driver + '">' + p.driver + "</td></tr>";
    }).join("");
  }

  var provBody = $("#province-rows");
  if (provBody) provBody.innerHTML = provinceRows();

  /* ---- Climate table builder (regions page) ---------------------------- */
  var climBody = $("#climate-rows");
  if (climBody) {
    climBody.innerHTML = CLIMATE.map(function (c) {
      return "<tr>" +
        '<td data-city="' + c.city + '"><strong>' + c.city + "</strong></td>" +
        '<td data-province="' + c.province + '">' + c.province + "</td>" +
        '<td data-jan="' + c.jan + '" class="num">' + (c.jan > 0 ? "+" : "") + c.jan.toFixed(1) + "°C</td>" +
        '<td data-jul="' + c.jul + '" class="num">' + (c.jul > 0 ? "+" : "") + c.jul.toFixed(1) + "°C</td>" +
        '<td data-annual="' + c.annual + '" class="num">' + (c.annual > 0 ? "+" : "") + c.annual.toFixed(1) + "°C</td>" +
        '<td data-precip="' + c.precipMm + '" class="num">' + c.precipMm.toLocaleString("en-CA") + " mm</td>" +
        '<td data-note="' + c.note + '">' + c.note + "</td></tr>";
    }).join("");
  }

  /* ---- Export groups table (economy page) ------------------------------ */
  var expBody = $("#export-rows");
  if (expBody) {
    expBody.innerHTML = EXPORT_GROUPS.map(function (g) {
      return "<tr>" +
        '<td data-group="' + g.group + '"><strong>' + g.group + "</strong></td>" +
        '<td data-value="' + g.value + '" class="num">C$' + g.value.toFixed(1) + "B</td>" +
        '<td data-note="' + g.note + '">' + g.note + "</td></tr>";
    }).join("");
  }

  /* ---- Age structure donut data hook (population page) ----------------- */
  window.CANADA_DATA = {
    headline: HEADLINE,
    populationSeries: POPULATION_SERIES,
    provinces: PROVINCES,
    gdpSeries: GDP_SERIES,
    gdpGrowth: GDP_GROWTH_SERIES,
    exportGroups: EXPORT_GROUPS,
    tradePartners: TRADE_PARTNERS,
    energyMix: ENERGY_MIX,
    climate: CLIMATE,
    ageStructure: AGE_STRUCTURE,
    sources: SOURCES,
    methodology: METHODOLOGY,
  };
})();

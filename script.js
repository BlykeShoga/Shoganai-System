function safe(val, fallback = "") {
  return val ?? fallback;
}

function md(text) {
  try {
    return text ? marked.parse(text) : "";
  } catch {
    return text || "";
  }
}

fetch("data/system.json")
.then(res => {
  if (!res.ok) throw new Error("JSON not found");
  return res.json();
})
.then(data => {

  const system = data?.system || {};
  const members = Array.isArray(data?.members) ? data.members : [];

  const app = document.getElementById("alters");

  // ================= SYSTEM =================
  const systemView = document.createElement("div");
  systemView.className = "system";

  systemView.innerHTML = `
    <div class="system-banner" style="background:${system.color || '#222'}"></div>

    <div class="system-header">
      <img src="${safe(system.avatarUrl)}" class="system-avatar">
      <div class="system-text">
        <h1>${safe(system.name, "Unnamed System")}</h1>
        <div class="system-desc">${md(system.desc)}</div>
      </div>
    </div>
  `;

  app.appendChild(systemView);

  // ================= GRID =================
  const grid = document.createElement("div");
  grid.className = "grid";

  members.forEach(m => {

    const card = document.createElement("div");
    card.className = "card";

    const name = safe(m.displayName || m.name, "Unnamed");
    const avatar = safe(m.avatarUrl, "https://via.placeholder.com/80");

    // tags (grezzi ma visibili)
    const tags = (m.tagIds || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join("");

    // custom fields (OurCana)
    const custom = m.customFields
      ? Object.entries(m.customFields)
          .map(([k,v]) => `
            <div class="field">
              <span>${k}</span>
              <span>${v}</span>
            </div>
          `).join("")
      : "<i>No custom fields</i>";

    // immagini nel markdown già supportate da marked

    card.innerHTML = `
      <div class="top">
        <img src="${avatar}" class="avatar">

        <div class="meta">
          <h2 style="color:${m.color || '#fff'}">${name}</h2>
          <div class="pronouns">${safe(m.pronouns, "N/A")}</div>
          <div class="tags">${tags}</div>
        </div>
      </div>

      <button class="toggle">Toggle details</button>

      <div class="details hidden">
        <div class="desc">${md(m.desc)}</div>

        <div class="custom">
          ${custom}
        </div>
      </div>
    `;

    const btn = card.querySelector(".toggle");
    const details = card.querySelector(".details");

    btn.onclick = () => {
      details.classList.toggle("hidden");
    };

    grid.appendChild(card);
  });

  app.appendChild(grid);

})
.catch(err => {
  console.error(err);
  document.getElementById("alters").innerHTML =
    "<p style='color:red'>Failed to load system.json</p>";
});

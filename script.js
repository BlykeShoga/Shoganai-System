function safe(v, fallback = "") {
  return v ?? fallback;
}

function renderMD(text) {
  try {
    return text ? marked.parse(text) : "";
  } catch {
    return text || "";
  }
}

/* ================= TAG MAP (MODIFICALA TU) ================= */
const TAG_MAP = {
  "tag_group_630cfcd28b30cf2e99e07eca": "Protector",
  "tag_group_635122c7726f890700afe0e4": "Host",
  "tag_group_61717575578376a8e43d7263": "System",
  "tag_group_653e8a4ec732374beadf715d": "Gatekeeper"
};

fetch("data/system.json")
.then(res => {
  if (!res.ok) throw new Error("JSON not found");
  return res.json();
})
.then(data => {

  const system = data?.system || {};
  const members = Array.isArray(data?.members) ? data.members : [];

  const app = document.getElementById("alters");

  /* ================= SYSTEM HEADER ================= */
  const systemEl = document.createElement("div");
  systemEl.className = "system";

  systemEl.innerHTML = `
    <div class="system-banner" style="background:${system.color || '#222'}"></div>

    <div class="system-header">
      <img src="${safe(system.avatarUrl)}" class="system-avatar">

      <div>
        <h1>${safe(system.name, "Unnamed System")}</h1>
        <div class="system-desc">${renderMD(system.desc)}</div>
      </div>
    </div>
  `;

  app.appendChild(systemEl);

  /* ================= GRID ================= */
  const grid = document.createElement("div");
  grid.className = "grid";

  members.forEach(m => {

    const card = document.createElement("div");
    card.className = "card";

    const name = safe(m.displayName || m.name, "Unnamed");
    const avatar = safe(m.avatarUrl, "https://via.placeholder.com/80");
    const pronouns = safe(m.pronouns, "N/A");

    /* ===== TAGS (MAPPED) ===== */
    const tags = (m.tagIds || [])
      .map(t => TAG_MAP[t] || t) // fallback ID
      .map(t => `<span class="tag">${t}</span>`)
      .join("");

    /* ===== CUSTOM FIELDS ===== */
    const custom = m.customFields
      ? Object.entries(m.customFields)
          .map(([k,v]) => `
            <div class="field">
              <span>${k}</span>
              <span>${v}</span>
            </div>
          `).join("")
      : "<i>No extra fields</i>";

    card.innerHTML = `
      <div class="top">
        <img src="${avatar}" class="avatar">

        <div>
          <h2 style="color:${m.color || '#fff'}">${name}</h2>
          <div class="pronouns">${pronouns}</div>
          <div class="tags">${tags}</div>
        </div>
      </div>

      <div class="desc">
        ${renderMD(m.desc)}
      </div>

      <div class="custom">
        ${custom}
      </div>
    `;

    grid.appendChild(card);
  });

  app.appendChild(grid);

})
.catch(err => {
  console.error(err);
  document.getElementById("alters").innerHTML =
    "<p style='color:red'>Failed to load system.json</p>";
});

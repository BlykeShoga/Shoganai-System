
let TAG_MAP = {};

// ================= LOAD TAGS =================
fetch("data/tags.json")
  .then(r => r.json())
  .then(tags => {
    TAG_MAP = tags || {};

    // ================= LOAD SYSTEM =================
    return fetch("data/system.json");
  })
  .then(r => r.json())
  .then(data => {

    const system = data?.system || {};
    const members = data?.members || [];

    const app = document.getElementById("alters");

    // ================= SYSTEM HEADER =================
    const systemEl = document.createElement("div");
    systemEl.className = "system";

    systemEl.innerHTML = `
      <div class="system-banner" style="background:${system.color || '#222'}"></div>

      <div class="system-header">
        <img src="${system.avatarUrl || ''}" class="system-avatar">

        <div>
          <h1>${system.name || "Unnamed System"}</h1>
          <div class="system-desc">
            ${system.desc ? marked.parse(system.desc) : ""}
          </div>
        </div>
      </div>
    `;

    app.appendChild(systemEl);

    // ================= GRID =================
    const grid = document.createElement("div");
    grid.className = "grid";

    members.forEach(m => {

      const card = document.createElement("div");
      card.className = "card";

      const name = m.displayName || m.name || "Unnamed";
      const avatar = m.avatarUrl || "https://via.placeholder.com/80";
      const pronouns = m.pronouns || "N/A";

      // ================= TAG SYSTEM INTELLIGENTE =================
      const tags = (m.tagIds || [])
        .map(id => {

          const t = TAG_MAP[id];

          // se il tag esiste nel mapping
          if (t) {
            return `
              <span class="tag" style="background:${t.color || '#333'}">
                ${t.emoji || ""} ${t.name}
              </span>
            `;
          }

          // fallback (tag grezzo)
          return `<span class="tag">${id.slice(-6)}</span>`;
        })
        .join("");

      // ================= CUSTOM FIELDS =================
      const custom = m.customFields
        ? Object.entries(m.customFields)
            .map(([k,v]) => `
              <div class="field">
                <span>${k}</span>
                <span>${v}</span>
              </div>
            `).join("")
        : "<i>No extra fields</i>";

      // ================= CARD =================
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
          ${m.desc ? marked.parse(m.desc) : ""}
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
      "<p style='color:red'>Error loading system</p>";
  });

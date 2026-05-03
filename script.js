fetch("data/system.json")
.then(res => res.json())
.then(data => {

  const system = data.system;
  const members = data.members;

  const container = document.getElementById("alters");

  // HEADER SISTEMA
  const header = document.createElement("div");
  header.className = "system-header";

  header.innerHTML = `
    <div class="system-banner" style="background:${system.color || "#444"}"></div>
    <div class="system-info">
      <img src="${system.avatarUrl}" class="system-avatar">
      <div>
        <h1>${system.name}</h1>
        <p>${marked.parse(system.desc || "")}</p>
      </div>
    </div>
  `;

  container.appendChild(header);

  // GRID ALTERS
  const grid = document.createElement("div");
  grid.className = "alter-grid";

  members.forEach(member => {

    const card = document.createElement("div");
    card.className = "alter-card";

    const name = member.displayName || member.name;

    card.innerHTML = `
      <div class="alter-top">
        <img src="${member.avatarUrl || 'https://via.placeholder.com/80'}" class="alter-avatar">
        <div>
          <h2 style="color:${member.color || '#fff'}">${name}</h2>
          <div class="pronouns">${member.pronouns || "N/A"}</div>
        </div>
      </div>

      <div class="alter-desc">
        ${marked.parse(member.desc || "")}
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);

});

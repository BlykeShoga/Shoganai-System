fetch("data/system.json")
.then(res => res.json())
.then(data => {

  const system = data.system;
  const members = data.members;

  const container = document.getElementById("alters");

  // ===== SYSTEM HEADER =====
  const header = document.createElement("div");
  header.className = "system-header";

  header.innerHTML = `
    <div class="system-banner" style="background:${system.color || "#444"}"></div>
    <div class="system-info">
      <img src="${system.avatarUrl}" class="system-avatar">
      <div>
        <h1>${system.name}</h1>
        <div class="system-desc">${marked.parse(system.desc || "")}</div>
      </div>
    </div>
  `;

  container.appendChild(header);

  // ===== GRID =====
  const grid = document.createElement("div");
  grid.className = "alter-grid";

  members.forEach(member => {

    const card = document.createElement("div");
    card.className = "alter-card";

    const name = member.displayName || member.name;

    // CUSTOM FIELDS (OurCana)
    let customFieldsHTML = "";
    if (member.customFields) {
      customFieldsHTML = Object.entries(member.customFields)
        .map(([key, value]) => `
          <div class="field">
            <span class="field-key">${key}</span>
            <span class="field-value">${value}</span>
          </div>
        `).join("");
    }

    // TAGS (se presenti come IDs)
    const tags = (member.tagIds || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join(" ");

    card.innerHTML = `
      <div class="alter-main">

        <img src="${member.avatarUrl || 'https://via.placeholder.com/80'}" class="alter-avatar">

        <div class="alter-core">
          <h2 style="color:${member.color || '#fff'}">${name}</h2>
          <div class="pronouns">${member.pronouns || "N/A"}</div>
          <div class="tags">${tags}</div>
        </div>

        <button class="toggle">▼</button>
      </div>

      <div class="alter-details hidden">

        <div class="desc">
          ${marked.parse(member.desc || "")}
        </div>

        <div class="custom-fields">
          ${customFieldsHTML || "<i>No extra fields</i>"}
        </div>

      </div>
    `;

    // toggle expand
    const btn = card.querySelector(".toggle");
    const details = card.querySelector(".alter-details");

    btn.addEventListener("click", () => {
      details.classList.toggle("hidden");
      btn.textContent = details.classList.contains("hidden") ? "▼" : "▲";
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
});
    // CUSTOM FIELDS (OurCana)
    let customFieldsHTML = "";
    if (member.customFields) {
      customFieldsHTML = Object.entries(member.customFields)
        .map(([key, value]) => `
          <div class="field">
            <span class="field-key">${key}</span>
            <span class="field-value">${value}</span>
          </div>
        `).join("");
    }

    // TAGS (se presenti come IDs)
    const tags = (member.tagIds || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join(" ");

    card.innerHTML = `
      <div class="alter-main">

        <img src="${member.avatarUrl || 'https://via.placeholder.com/80'}" class="alter-avatar">

        <div class="alter-core">
          <h2 style="color:${member.color || '#fff'}">${name}</h2>
          <div class="pronouns">${member.pronouns || "N/A"}</div>
          <div class="tags">${tags}</div>
        </div>

        <button class="toggle">▼</button>
      </div>

      <div class="alter-details hidden">

        <div class="desc">
          ${marked.parse(member.desc || "")}
        </div>

        <div class="custom-fields">
          ${customFieldsHTML || "<i>No extra fields</i>"}
        </div>

      </div>
    `;

    // toggle expand
    const btn = card.querySelector(".toggle");
    const details = card.querySelector(".alter-details");

    btn.addEventListener("click", () => {
      details.classList.toggle("hidden");
      btn.textContent = details.classList.contains("hidden") ? "▼" : "▲";
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
});
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

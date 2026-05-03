fetch("data/system.json")
  .then(res => {
    if (!res.ok) throw new Error("JSON not found or path wrong");
    return res.json();
  })
  .then(data => {

    console.log("Loaded data:", data);

    const container = document.getElementById("alters");

    const system = data?.system || {};
    const members = Array.isArray(data?.members) ? data.members : [];

    // ===== SYSTEM HEADER SAFE =====
    const header = document.createElement("div");
    header.className = "system-header";

    header.innerHTML = `
      <div class="system-banner" style="background:${system.color || "#444"}"></div>
      <div class="system-info">
        <img src="${system.avatarUrl || ""}" class="system-avatar">
        <div>
          <h1>${system.name || "Unnamed system"}</h1>
          <div class="system-desc">
            ${system.desc ? marked.parse(system.desc) : ""}
          </div>
        </div>
      </div>
    `;

    container.appendChild(header);

    // ===== GRID =====
    const grid = document.createElement("div");
    grid.className = "alter-grid";

    members.forEach(member => {

      try {
        const card = document.createElement("div");
        card.className = "alter-card";

        const name = member.displayName || member.name || "Unnamed";

        const avatar = member.avatarUrl || "https://via.placeholder.com/80";

        const pronouns = member.pronouns || "N/A";

        const desc = member.desc ? marked.parse(member.desc) : "";

        // custom fields safe
        const custom = member.customFields
          ? Object.entries(member.customFields).map(([k,v]) =>
              `<div><b>${k}:</b> ${v}</div>`
            ).join("")
          : "";

        card.innerHTML = `
          <div class="alter-main">
            <img src="${avatar}" class="alter-avatar">

            <div class="alter-core">
              <h2>${name}</h2>
              <div class="pronouns">${pronouns}</div>
            </div>
          </div>

          <div class="alter-details">
            <div class="desc">${desc}</div>
            <div class="custom">${custom}</div>
          </div>
        `;

        grid.appendChild(card);

      } catch (err) {
        console.error("Error rendering member:", member, err);
      }

    });

    container.appendChild(grid);

  })
  .catch(err => {
    console.error("SYSTEM LOAD ERROR:", err);
    document.getElementById("alters").innerHTML =
      "<p style='color:red'>Error loading system.json</p>";
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

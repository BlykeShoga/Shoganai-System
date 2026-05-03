fetch("data/system.json")
.then(res => res.json())
.then(data => {
const container = document.getElementById("alters");

```
data.members.forEach(member => {
  const div = document.createElement("div");
  div.className = "alter";

  // Nome
  const name = member.displayName || member.name;

  // Avatar (ora usa direttamente URL)
  const img = document.createElement("img");
  img.src = member.avatarUrl || "https://via.placeholder.com/80";

  // Descrizione (grezza per ora)
  const desc = member.desc || "";

  const info = document.createElement("div");
  info.innerHTML = `
    <h2>${name}</h2>
    <p>${desc}</p>
  `;

  div.appendChild(img);
  div.appendChild(info);
  container.appendChild(div);
});
```

});

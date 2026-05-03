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

  // Avatar
  const img = document.createElement("img");
  img.src = member.avatarUrl || "https://via.placeholder.com/80";

  // Markdown → HTML
  const desc = marked.parse(member.desc || "");

  const info = document.createElement("div");
  info.innerHTML = `
    <h2 style="color:${member.color || "#fff"}">${name}</h2>
    <p><strong>Pronouns:</strong> ${member.pronouns || "N/A"}</p>
    <div>${desc}</div>
  `;

  div.appendChild(img);
  div.appendChild(info);
  container.appendChild(div);
});
```

});

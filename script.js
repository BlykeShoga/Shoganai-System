fetch("data/system.json")
.then(res => res.json())
.then(data => {
const container = document.getElementById("alters");

```
data.alters.forEach(alter => {
  const div = document.createElement("div");
  div.className = "alter";

  const img = document.createElement("img");
  img.src = "data/avatars/" + alter.avatar;

  const info = document.createElement("div");
  info.innerHTML = `
    <h2>${alter.name}</h2>
    <p>${alter.description || ""}</p>
  `;

  div.appendChild(img);
  div.appendChild(info);
  container.appendChild(div);
});
```

});

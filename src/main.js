/*
1.26 Geslachten
Toon de personen uit geslachten.json. Toon per persoon de voornaam, de familienaam, het
geslacht en de foto. Toon het geslacht als een afbeelding: man.png, vrouw.png of x.png.
Als de gebruiker Mannen kiest, ziet hij enkel de mannen.
Als de gebruiker Vrouwen kiest, ziet hij enkel de vrouwen.
Als de gebruiker X kiest, ziet hij enkel de personen met geslacht X.
Als de gebruiker Allen kiest, ziet hij alle personen.
Bezorg je oplossing aan je coach.
Je vindt de afbeeldingen bij het takenmateriaal.
*/

window.onload = () => {
  const append_app = (parentE) => {
    // parentE > container
    const container = document.createElement("section");
    parentE.append(container);
    container.style.position = "relative";
    container.style.display = "grid";
    container.style.minHeight = "calc(100vh - 50px)";
    container.style.alignItems = "center";
    container.style.justifyItems = "center";
    // parentE > container > main
    const main = document.createElement("main");
    container.append(main);
    main.style.width = "90%";
    main.style.height = "90%";
    main.style.outline = "2px solid";
    main.style.borderRadius = "12px";
    main.style.display = "grid";
    main.style.gridTemplateRows = ".2fr 1fr";
    main.className = "main";
    // parentE > container > main > ul_mvx
    const ul_mvx = document.createElement("ul");
    main.append(ul_mvx);
    const array_buttons_mvx = geslachtOpties;
    array_buttons_mvx.forEach((geslachtString) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.append(a);
      ul_mvx.append(li);
      li.className = Object.keys(geslachtString)[0];
      li.style.listStyleType = "none";
      li.dataset.geslacht = Object.keys(geslachtString)[0];
      a.className = Object.keys(geslachtString)[0];
      a.href = "#";
      a.innerHTML = Object.values(geslachtString)[0];
      a.style.textDecoration = "none";
      a.dataset.geslacht = Object.keys(geslachtString)[0];
      li.onmouseover = function () {
        this.style.opacity = 0.3;
      };
      li.onmouseout = function () {
        this.style.opacity = 1;
      };
      li.addEventListener("click", function () {
        handleKeuzeGeslacht(this.dataset.geslacht);
      });
    });
    ul_mvx.style.alignSelf = "center";
    ul_mvx.style.display = "flex";
    ul_mvx.style.justifyContent = "space-evenly";
    ul_mvx.style.margin = "1.5rem";
    // parentE > container > main > article_personen
    const article_personen = document.createElement("article");
    main.append(article_personen);
    article_personen.className = "article_personen";
    article_personen.style.borderRadius = "0 0 12px 12px";
    article_personen.style.margin = "1.5rem";
    //return
    return container;
  };
  const handleKeuzeGeslacht = (geslachtKeuze) => {
    // display by chosen filter(gelsachtKeuze) using JSON data
    (async () => {
      fetch("./geslachten.json")
        .then((response) => response.json())
        .then((data) => {
          // Keuzevalidatie
          const val = [];
          geslachtOpties.forEach((optie) => {
            val.push(Object.keys(optie)[0]);
          });
          if (val.includes(geslachtKeuze)) {
            // 1. Krijg data vanuit JSON gefilterd op geslachtKeuze (filterOp..)
            // 2. Teken de gefilterde elementen in de container (toonOp...)
            geslachtKeuze === "all"
              ? toonOp(data)
              : toonOp(filterOp(data, geslachtKeuze));
          }
        })
        .catch((e) => console.error("Async error fetching JSON - " + e));
    })();
  };
  const toonOp = (array_filtered) => {
    if (array_filtered.length > 0) {
      if (
        document.getElementsByClassName("article_personen")[0].children.length >
        0
      ) {
        document
          .getElementsByClassName("article_personen")[0]
          .children[0].remove();
      }
      // article > ul_titels
      const parentE = app.querySelector(".article_personen");
      const wrapper = document.createElement("div");
      const ul_titels = document.createElement("ul");
      wrapper.append(ul_titels);
      parentE.append(wrapper);
      wrapper.className = "wrapper_json";
      ul_titels.className = "ul_titels";
      ul_titels.style.display = "grid";
      ul_titels.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
      ul_titels.style.justifyContent = "space-evenly";
      ul_titels.style.margin = "25px 0";
      // article > ul_titels > li_titel
      const json_keys = Object.keys(array_filtered[0]);
      for (const titel of json_keys) {
        const li_titel = document.createElement("li");
        const h3 = document.createElement("h3");
        li_titel.append(h3);
        ul_titels.append(li_titel);
        li_titel.style.listStyleType = "none";
        h3.innerHTML = titel;
        h3.style.textTransform = "capitalize";
        h3.style.textAlign = "center";
      }
      for (const json of array_filtered) {
        // article > ul_json
        const ul_json = document.createElement("ul");
        wrapper.append(ul_json);
        ul_json.style.display = "grid";
        ul_json.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        ul_json.style.justifyItems = "center";
        // article > ul_json > li_json
        for (const [key, value] of Object.entries(json)) {
          const li = document.createElement("li");
          ul_json.append(li);
          switch (key) {
            case "geslacht":
              const img_geslacht = document.createElement("img");
              img_geslacht.src = `./img/${value}.png`;
              img_geslacht.alt = "vrouw avatar";
              li.append(img_geslacht);
              break;
            case "foto":
              const img_avatar = document.createElement("img");
              img_avatar.src = `./img/${value}`;
              img_avatar.alt = "vrouw avatar";
              li.append(img_avatar);
              break;

            default:
              li.innerHTML = value;
              break;
          }
          li.style.listStyleType = "none";
        }
      }
    }
  };
  const filterOp = (array_json, geslacht) => {
    const result = array_json.filter(
      (jsonitem) => jsonitem.geslacht === geslacht
    );
    return result;
  };
  const geslachtOpties = [
    { man: "Mannen" },
    { vrouw: "Vrouwen" },
    { x: "X" },
    { all: "Allen" },
  ];
  const app = append_app(document.body);
};

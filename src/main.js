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
    container.style.justifyContent = "center";
    container.style.border = "6px solid";
    // parentE > container > main
    const main = document.createElement("main");
    container.append(main);
    main.style.position = "absolute";
    main.style.width = "65%";
    main.style.height = "90%";
    main.style.outline = "2px solid";
    main.style.left = "50%";
    main.style.transform = "translateX(-50%)";
    main.style.borderRadius = "12px";
    main.style.display = "grid";
    main.style.gridTemplateRows = ".2fr 1fr";
    // parentE > container > main > ul_mvx
    const ul_mvx = document.createElement("ul");
    main.append(ul_mvx);
    const array_buttons_mvx = geslachtOpties;
    array_buttons_mvx.forEach((geslachtString) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.append(a);
      ul_mvx.append(li);
      li.style.listStyleType = "none";
      li.dataset.geslacht = Object.keys(geslachtString)[0];
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
            switch (geslachtKeuze) {
              case "man":
                toonOpM(filterOpM(data));
                break;
              case "vrouw":
                toonOpV(filterOpV(data));
                break;
              case "x":
                toonOpX(filterOpX(data));
                break;
              case "all":
                toonOpAlle(filterOpAlle(data));
                break;
            }
          }
        })
        .catch((e) => console.error("Async error fetching JSON - " + e));
    })();
  };
  const filterOpM = (data) => {
    return data;
  };
  const filterOpV = (data) => {
    return data;
  };
  const filterOpX = (data) => {
    return data;
  };
  const filterOpAlle = (data) => {
    return data;
  };
  const toonOpM = (array) => {
    console.log(array[0]);
  };
  const toonOpV = (array) => {
    console.log(array[0]);
  };
  const toonOpX = (array) => {
    console.log(array[0]);
  };
  const toonOpAlle = (array) => {
    console.log(array[0]);
  };

  const geslachtOpties = [
    { man: "Mannen" },
    { vrouw: "Vrouwen" },
    { x: "X" },
    { all: "Allen" },
  ];
  const app = append_app(document.body);
};

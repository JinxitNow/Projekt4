const dyr = [
    {
      navn: "EUKALYPTUS",
      alder: "1 år",
      køn: "Han",
      art: "Dværgkanin Blanding",
      beskrivelse: "Mød Eukalyptus – den nuttede og energiske lille spirrevip! 🐰❤️\n\nEfter en svær start i livet søger Eukalyptus nu et kærligt hjem. Han er fuld af energi, nysgerrig og elsker at spæne rundt. Selvom han har mistet lidt tillid til mennesker, vil han blomstre med omsorg og tålmodighed.",
      ekstra: "✨ Neutraliseret, vaccineret, chippet og sundhedstjekket.\n🏡 Trives bedst som frikanin med masser af plads.",
      billeder: ["Images/kanin1-sandra.png", "Images/kanin2-sandra.png"]
    }
  ];

  const container = document.getElementById("card-container");
  dyr.forEach((kanin, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => visModal(index);
    card.innerHTML = `
      <img src="${kanin.billeder[0]}" alt="${kanin.navn}">
      <p>${kanin.navn}</p>
    `;
    container.appendChild(card);
  });

  function visModal(index) {
    const kanin = dyr[index];
    document.getElementById("navn").innerText = kanin.navn;
    document.getElementById("info-icons").innerHTML = `🐾 ${kanin.alder} &nbsp; ${kanin.køn === "Han" ? "♂" : "♀"} &nbsp; 🐇 ${kanin.art}`;
    document.getElementById("beskrivelse").innerText = kanin.beskrivelse;
    document.getElementById("ekstra").innerText = kanin.ekstra;
    document.getElementById("img1").src = kanin.billeder[0];
    document.getElementById("img2").src = kanin.billeder[1];
    document.getElementById("doner-btn").innerText = `GIV ${kanin.navn} FREDAGSSLIK`;
    document.getElementById("modal").style.display = "block";
  }

  function lukModal() {
    document.getElementById("modal").style.display = "none";
  }

  function givGodbid() {
    alert("Tak fordi du gav en godbid! 🥕");
  }
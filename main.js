document.addEventListener("DOMContentLoaded", function () {
  // Header - Justine
  function toggleMenu() {
    const nav = document.getElementById("myTopnav");
    nav.classList.toggle("responsive");

    const menuItems = [
      "DYR I NØD",
      "ADOPTION",
      "VI KÆMPER FOR",
      "BLIV MEDLEM",
      "BLIV FRIVILLIG",
    ];
    for (let i = 0; i < menuItems.length; i++) {
      console.log("Menu punkt: " + menuItems[i]);
    }
  }
  const dropdownLinks = document.querySelectorAll(".dropdown > a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelectorAll(".dropdown").forEach((drop) => {
        if (drop !== link.parentElement) {
          drop.classList.remove("open");
        }
      });

      const dropdown = link.parentElement;
      dropdown.classList.toggle("open");
    });
  });

  window.toggleMenu = toggleMenu;

  // Hero
  const copyHashtagBtn = document.getElementById('copyHashtagBtn');
  if (copyHashtagBtn) {
      copyHashtagBtn.addEventListener('click', function() {
          const hashtag = "#DyrenesFredagsslik";
          navigator.clipboard.writeText(hashtag).then(() => {
              const originalText = this.textContent;
              this.textContent = 'Kopieret!';
              setTimeout(() => {
                  this.textContent = originalText;
              }, 2000);
          }).catch(err => {
              console.error('Failed to copy text: ', err);
          });
      });
  }

  // Donation Modal - Jakob
  const openModalBtns = document.querySelectorAll(".openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOverlay = document.getElementById("modalOverlay");

  function openModal() {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeModalBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalOverlay.style.display === "flex") {
      closeModal();
    }
  });

  const radioGroups = {
    "payment-type": document.querySelectorAll(".payment-option"),
    amount: document.querySelectorAll(".amount-option"),
    "payment-method": document.querySelectorAll(".payment-method .radio-btn"),
  };

  for (const [groupName, elements] of Object.entries(radioGroups)) {
    elements.forEach((element) => {
      element.addEventListener("click", function () {
        const group =
          groupName === "payment-method"
            ? document.querySelectorAll(`[data-group="${groupName}"]`)
            : radioGroups[groupName];

        group.forEach((item) => {
          const radioBtn =
            groupName === "payment-method"
              ? item
              : item.querySelector(".radio-btn");
          radioBtn.classList.remove("selected");
        });

        const targetRadioBtn =
          groupName === "payment-method"
            ? this
            : this.querySelector(".radio-btn");
        targetRadioBtn.classList.add("selected");

        if (groupName === "amount") {
          document.querySelector(".input-field input").value = "";
        }
      });
    });
  }

  const checkboxOptions = document.querySelectorAll(".checkbox-option");
  checkboxOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const checkbox = this.querySelector(".checkbox");
      checkbox.classList.toggle("selected");
    });
  });

  const customAmountField = document.querySelector(".input-field input");
  customAmountField.addEventListener("focus", function () {
    const amountOptions = document.querySelectorAll(
      ".amount-option .radio-btn"
    );
    amountOptions.forEach((radio) => {
      radio.classList.remove("selected");
    });
  });


  const submitButton = document.querySelector(".submit-btn");
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const requiredFields = [
      document.getElementById("firstname"),
      document.getElementById("lastname"),
      document.getElementById("phone"),
      document.getElementById("email"),
    ];

    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        highlightInvalidField(field);
      } else {
        removeHighlight(field);
      }
    });

    const emailField = document.getElementById("email");
    if (emailField.value.trim() && !isValidEmail(emailField.value)) {
      isValid = false;
      highlightInvalidField(emailField);
    }
     // Helena starter her
    if (isValid) {
      const fullName = `${document.getElementById("firstname").value} ${
        document.getElementById("lastname").value
      }`;
      const amount =
        document
          .querySelector(".amount-option .radio-btn.selected")
          ?.closest(".amount-option")
          ?.querySelector(".option-label")?.textContent ||
        document.querySelector(".input-field input").value + " DKK";
      const paymentMethod =
        document
          .querySelector(".payment-method .radio-btn.selected")
          ?.closest(".payment-method-option")
          ?.querySelector(".option-label")?.textContent || "MobilePay";

      document.getElementById("type").textContent = "Månedlig støtte";
      document.getElementById("amount").textContent = amount;
      document.getElementById("person").textContent = fullName;
      document.getElementById("phone").textContent =
        document.getElementById("phone").value;
      document.getElementById("email").textContent =
        document.getElementById("email").value;
      document.getElementById("paid").textContent = paymentMethod;
     
      const messages = [
        "Tusind tak for din støtte!",
        "Ses vi næste fredag?",
        "Vi sætter stor pris på din donation!",
        "Tak fordi du støtter vores internatvenner!",
        "Så er der fredagsslik!",
      ];

      let i = 0;
      document.getElementById("confirmationText").textContent = messages[i];
      i++;

      const interval = setInterval(function () {
        document.getElementById("confirmationText").textContent = messages[i];
        i++;
        if (i >= messages.length) i = 0;
      }, 5000);
      
      document.getElementById("confirmationModal").classList.remove("hidden");
      closeModal(); 

      document
        .getElementById("closeBtn")
        .addEventListener("click", function () {
          document.getElementById("confirmationModal").classList.add("hidden");
          clearInterval(interval);
        });

      document.getElementById("copyBtn").addEventListener("click", function () {
        const link = document.getElementById("shareLink");
        link.select();
        link.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Link kopieret!");
      });
    }
  });
// Helena slutter her og Jakob Starter igen
  function highlightInvalidField(field) {
    const inputFieldContainer = field.closest(".input-field");
    inputFieldContainer.classList.add("invalid");
  }

  function removeHighlight(field) {
    const inputFieldContainer = field.closest(".input-field");
    inputFieldContainer.classList.remove("invalid");
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const allInputFields = document.querySelectorAll(".input-field input");
  allInputFields.forEach((input) => {
    input.addEventListener("input", function () {
      removeHighlight(this);
    });
  });

  const numberInput = document.querySelector(".input-field input");
  numberInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^\d]/g, "");
  });

  numberInput.addEventListener("keypress", function (e) {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  const firstNameInput = document.getElementById("firstname");
  const lastNameInput = document.getElementById("lastname");

  function restrictToLetters(input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(
        /[^a-zA-ZæøåÆØÅäöüÄÖÜßéèêëÉÈÊËàáâÀÁÂùúûÙÚÛçÇñÑ '\-]/g,
        ""
      );
    });

    input.addEventListener("keypress", function (e) {
      if (!/[a-zA-ZæøåÆØÅäöüÄÖÜßéèêëÉÈÊËàáâÀÁÂùúûÙÚÛçÇñÑ '\-]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  restrictToLetters(firstNameInput);
  restrictToLetters(lastNameInput);

  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 8);
  });

  phoneInput.addEventListener("keypress", function (e) {
    if (!/\d/.test(e.key) || phoneInput.value.length >= 10) {
      e.preventDefault();
    }
  });

  // Image Carousel -Anja
  let currentIndex = 0;
  const images = document.querySelectorAll(".carousel-image");
  const totalImages = images.length;
  const imagesPerPage = 4;
  const slideStep = 4;

  for (let i = 0; i < totalImages; i++) {
    console.log(images[i]);
  }

  function updateCarousel() {
    
    const offset = -currentIndex * (100 / imagesPerPage);
    document.querySelector(".carousel").style.transition = "transform 0.9s ease";
    document.querySelector(".carousel").style.transform = `translateX(${offset}%)`;
  }

  function nextImage() {
    if (currentIndex + imagesPerPage >= totalImages) {
      currentIndex = 0;
    } else if (currentIndex + slideStep + imagesPerPage > totalImages) {
      
      currentIndex = totalImages - imagesPerPage;
    } else {
      currentIndex += slideStep;
    }
    updateCarousel();
  }
  
  function previousImage() {
    if (currentIndex - slideStep < 0) {
      currentIndex = 0;
    } else {
      currentIndex -= slideStep;
    }
    updateCarousel();
  }

  const previousButton = document.querySelector(".previous");
  const nextButton = document.querySelector(".next");

  if (previousButton) {
    previousButton.addEventListener("click", previousImage);
  }

  if (nextButton) {
    nextButton.addEventListener("click", nextImage);
  }

  const carouselInterval = setInterval(nextImage, 5000);

  updateCarousel();

  // Animal Modal - Sandra
  const animalData = [
    {
      navn: "EUKALYPTUS",
      alder: "1 år",
      køn: "Han",
      art: "Dværgkanin Blanding",
      beskrivelse:
        "Mød Eukalyptus – den nuttede og energiske lille spirrevip! 🐰❤️\n\nEfter en svær start i livet søger Eukalyptus nu et kærligt hjem. Han er fuld af energi, nysgerrig og elsker at spæne rundt. Selvom han har mistet tillid til mennesker, vil han blomstre med omsorg og tålmodighed.",
      ekstra:
        "✨ Neutraliseret, vaccineret, chippet og sundhedstjekket.\n🏡 Trives bedst som frikanin med masser af plads.",
      billeder: ["Images/kanin1-sandra.png", "Images/kanin2-sandra.png"],
    },
    {
      navn: "MATHILDE",
      alder: "2 år",
      køn: "Hun",
      art: "Kat",
      beskrivelse:
        "Mathilde er en sød og rolig kat, der elsker at ligge i vindueskarmen og kigge ud på fuglene.",
      ekstra:
        "✨ Neutraliseret, vaccineret og chippet.\n🏡 Trives bedst i et roligt hjem uden små børn.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "MIA",
      alder: "3 år",
      køn: "Hun",
      art: "Kat",
      beskrivelse:
        "Mia er en aktiv og legesyg kat, der elsker at klatre og udforske nye steder.",
      ekstra:
        "✨ Neutraliseret, vaccineret og chippet.\n🏡 Trives i et hjem med masser af aktivitet.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "NETE",
      alder: "1 år",
      køn: "Hun",
      art: "Kat",
      beskrivelse:
        "Nete er en sky men kærlig kat, der har brug for tid til at vænne sig til nye mennesker.",
      ekstra:
        "✨ Neutraliseret, vaccineret og chippet.\n🏡 Trives bedst i et roligt hjem med tålmodige ejere.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "ROMEO",
      alder: "1 år",
      køn: "Han",
      art: "Undulat",
      beskrivelse:
        "Romeo er en farverig og livlig undulat, der kan fløjte små melodier.",
      ekstra:
        "✨ Sundhedstjekket.\n🏡 Trives bedst med daglig interaktion og stimulering.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "SWEETIE",
      alder: "2 år",
      køn: "Hun",
      art: "Dværgkanin Blanding",
      beskrivelse:
        "Sweetie er en social kanin, der elsker at få grøntsager og blive kløet bag ørerne.",
      ekstra: "✨ Sundhedstjekket.\n🏡 Trives bedst sammen med andre kaniner.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "COOKIE",
      alder: "4 år",
      køn: "Han",
      art: "Kat",
      beskrivelse:
        "Cookie er en aktiv og legesyg kat, der elsker at klatre og udforske nye steder.",
      ekstra:
        "✨ Sundhedstjekket.\n🏡 Trives bedst med daglig interaktion og stimulering.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "BELLATRIX",
      alder: "3 år",
      køn: "Hun",
      art: "Dværgkanin Blanding",
      beskrivelse:
        "Bellatrix er en social kanin, der elsker at få grøntsager og blive kløet bag ørerne.",
      ekstra:
        "✨ Sundhedstjekket.\n🏡 Trives bedst sammen med andre kaniner.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "KIM",
      alder: "5 år",
      køn: "Han",
      art: "Kat",
      beskrivelse:
        "Kim er en rolig og loyal kat, der elsker at ligge ved dine fødder og bare være sammen med dig.",
      ekstra:
        "✨ Neutraliseret, vaccineret og chippet.\n🏡 Trives i et roligt hjem med rutiner.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
    {
      navn: "ROLLO",
      alder: "2 år",
      køn: "Han",
      art: "Kanin",
      beskrivelse:
        "Rollo er en nysgerrig og venlig kanin, der elsker at hoppe frit omkring og udforske.",
      ekstra:
        "✨ Neutraliseret, vaccineret og sundhedstjekket.\n🏡 Trives bedst med god plads til at bevæge sig.",
      billeder: [
        "https://placehold.co/368x400",
        "https://placehold.co/368x400",
      ],
    },
  ];

  setupAnimalLinks();

  function setupAnimalLinks() {
    const animalLinks = document.querySelectorAll(".link-with-icon");

    animalLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const animalCard = this.closest(".animal-card");
        const animalNameElement = animalCard.querySelector(".animal-name");
        const animalName = animalNameElement.textContent;

        const animal = animalData.find(
          (animal) => animal.navn === animalName.toUpperCase()
        );

        if (animal) {
          showAnimalDetails(animal);
        } else {
          console.error(`Animal data not found for: ${animalName}`);
        }
      });
    });
  }

  function showAnimalDetails(animal) {
    document.getElementById("animalName").textContent = animal.navn;
    document.getElementById("animalInfo").textContent = `🐾 ${animal.alder} • ${
      animal.køn === "Han" ? "♂" : "♀"
    } • 🐇 ${animal.art}`;
    document.getElementById("animalDescription").textContent =
      animal.beskrivelse;
    document.getElementById("animalExtra").textContent = animal.ekstra;

    document.getElementById(
      "treatButton"
    ).textContent = `GIV ${animal.navn} FREDAGSSLIK`;

    if (animal.billeder && animal.billeder.length >= 2) {
      document.getElementById("animalImage1").src = animal.billeder[0];
      document.getElementById("animalImage2").src = animal.billeder[1];
    }

    const animalDetails = document.getElementById("animal-details");
    animalDetails.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  window.closeAnimalDetails = function () {
    document.getElementById("animal-details").style.display = "none";
    document.body.style.overflow = "auto";
  };

  window.givGodbid = function () {
    document.getElementById("animal-details").style.display = "none";
    document.body.style.overflow = "hidden";

    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = "flex";
};

  const closeAnimalDetailsBtn = document.querySelector(".animal-details-close");
  if (closeAnimalDetailsBtn) {
    closeAnimalDetailsBtn.addEventListener("click", window.closeAnimalDetails);
  }
});

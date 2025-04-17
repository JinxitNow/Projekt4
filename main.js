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

      // Show confirmation modal and hide donation modal
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

  // Image Carousel
  let currentIndex = 0;
  const images = document.querySelectorAll(".carousel-image");
  const totalImages = images.length;
  const imagesPerPage = 4;

  for (let i = 0; i < totalImages; i++) {
    console.log(images[i]);
  }

  function updateCarousel() {
    const offset = -currentIndex * (100 / imagesPerPage);
    document.querySelector(".carousel").style.transition =
      "transform 0.5s ease";
    document.querySelector(
      ".carousel"
    ).style.transform = `translateX(${offset}%)`;
  }

  function nextImage() {
    if (currentIndex < Math.ceil(totalImages / imagesPerPage) - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function previousImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = Math.floor(totalImages / imagesPerPage) - 1;
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
});

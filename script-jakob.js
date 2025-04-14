document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("openModalBtn");
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

  openModalBtn.addEventListener("click", openModal);
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
      alert("Tak for din støtte!");
      closeModal();
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

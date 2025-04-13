document.addEventListener("DOMContentLoaded", function () {
  // Handle radio button selections
  const radioGroups = {
    "payment-type": document.querySelectorAll(".payment-option"),
    amount: document.querySelectorAll(".amount-option"),
    "payment-method": document.querySelectorAll(".payment-method .radio-btn"),
  };

  // Set up radio button functionality for all groups
  for (const [groupName, elements] of Object.entries(radioGroups)) {
    elements.forEach((element) => {
      element.addEventListener("click", function () {
        // Find all radio buttons in this group and deselect them
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

        // Select the clicked radio button
        const targetRadioBtn =
          groupName === "payment-method"
            ? this
            : this.querySelector(".radio-btn");
        targetRadioBtn.classList.add("selected");

        // If we're handling amount selection, clear the custom amount field
        if (groupName === "amount") {
          document.querySelector(".input-field input").value = "";
        }
      });
    });
  }

  // Handle checkbox toggle functionality
  const checkboxOptions = document.querySelectorAll(".checkbox-option");
  checkboxOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const checkbox = this.querySelector(".checkbox");
      checkbox.classList.toggle("selected");
    });
  });

  // Custom amount field handling
  const customAmountField = document.querySelector(".input-field input");
  customAmountField.addEventListener("focus", function () {
    // Deselect all amount options when focusing on custom amount
    const amountOptions = document.querySelectorAll(
      ".amount-option .radio-btn"
    );
    amountOptions.forEach((radio) => {
      radio.classList.remove("selected");
    });
  });

  // Form submission
  const submitButton = document.querySelector(".submit-btn");
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    alert("Tak for din støtte!");
  });
});

const numberInput = document.querySelector(".input-field input");

// Allow only numbers by filtering input
numberInput.addEventListener("input", function (e) {
  // Remove any non-digit characters
  this.value = this.value.replace(/[^\d]/g, "");
});

// Prevent typing non-numeric characters
numberInput.addEventListener("keypress", function (e) {
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
});

// Get the name input fields
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");

// Function to allow only letters, spaces, and some special characters used in names
function restrictToLetters(input) {
  input.addEventListener("input", function () {
    // Replace anything that's not a letter, space, or common name characters
    // This allows for names like "O'Brien" or "García-López"
    this.value = this.value.replace(
      /[^a-zA-ZæøåÆØÅäöüÄÖÜßéèêëÉÈÊËàáâÀÁÂùúûÙÚÛçÇñÑ '\-]/g,
      ""
    );
  });

  input.addEventListener("keypress", function (e) {
    // Prevent typing non-letter characters (except allowed special chars)
    if (!/[a-zA-ZæøåÆØÅäöüÄÖÜßéèêëÉÈÊËàáâÀÁÂùúûÙÚÛçÇñÑ '\-]/.test(e.key)) {
      e.preventDefault();
    }
  });
}

// Apply the restriction to both name fields
restrictToLetters(firstNameInput);
restrictToLetters(lastNameInput);

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {
  // Remove anything that's not a digit and limit to 8 digits
  this.value = this.value.replace(/\D/g, "").slice(0, 8);
});

phoneInput.addEventListener("keypress", function (e) {
  // Allow only digits, and prevent input when 10 digits are entered
  if (!/\d/.test(e.key) || phoneInput.value.length >= 10) {
    e.preventDefault();
  }
});

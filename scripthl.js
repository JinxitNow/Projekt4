$(document).ready(function () {
  let interval = null;
  console.log("DOM er klar.");

  $('.submit-btn').on('click', function () {
    console.log("Submit-knap blev klikket.");

    const messages = [
      "Tusind tak for din støtte!",
      "Ses vi næste fredag?",
      "Vi sætter stor pris på din donation!",
      "Tak fordi du støtter vores internatvenner!",
      "Så er der fredagsslik!"
    ];

    const donation = {
      type: "Månedlig støtte",
      amount: 25, 
      person: firstname + lastname,
      phone: phone,
      email: email,
      paid: "Mobilepay"
    };

    console.log("Donationsdata:", donation);

    $('#type').text(donation.type);
    $('#amount').text(donation.amount + " DKK");
    $('#person').text(donation.person);
    $('#phone').text(donation.phone);
    $('#email').text(donation.email);
    $('#paid').text(donation.paid);

    $('#confirmationModal').removeClass('hidden');
    console.log("Bekræftelsesmodal vist.");

    if (interval !== null) {
      clearInterval(interval);
      console.log("Tidligere interval ryddet.");
    }

    let i = 0;
    $('#confirmationText').text(messages[i]);
    console.log("Første besked vist:", messages[i]);
    i++;

    interval = setInterval(function () {
      $('#confirmationText').text(messages[i]);
      console.log("Ny besked vist:", messages[i]);
      i++;
      if (i >= messages.length) i = 0;
    }, 5000);
  });

  $('#closeBtn').on('click', function () {
    $('#confirmationModal').addClass('hidden');
    console.log("Bekræftelsesmodal skjult.");
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
      console.log("Interval ryddet ved lukning.");
    }
  });

  $('#copyBtn').on('click', function () {
    const link = document.getElementById("shareLink");
    link.select();
    link.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Link kopieret!");
    console.log("Link kopieret:", link.value);
  });
});

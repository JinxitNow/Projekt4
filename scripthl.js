$(document).ready(function () {
    let interval = null;
  
    $('#stot-knap').on('click', function () {
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
        person: "Fornavn + Efternavn",
        phone: "Nummer",
        email: "Email",
        paid: "Mobilepay"
      };
  
      $('#type').text(donation.type);
      $('#amount').text(donation.amount + " DKK");
      $('#person').text(donation.person);
      $('#phone').text(donation.phone);
      $('#email').text(donation.email);
      $('#paid').text(donation.paid);
  
      $('#confirmationModal').removeClass('hidden');
  
      // Start tekstskift
      if (interval !== null) {
        clearInterval(interval);
      }
  
      let i = 0;
  $('#confirmationText').text(messages[i]);
  i++;
  
  interval = setInterval(function () {
    $('#confirmationText').text(messages[i]);
    i++;
    if (i >= messages.length) i = 0; // Reset når vi når slutningen
  }, 5000);
  
  
    $('#closeBtn').on('click', function () {
      $('#confirmationModal').addClass('hidden');
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
    });
  
    $('#copyBtn').on('click', function () {
      const link = document.getElementById("shareLink");
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand("copy");
      alert("Link kopieret!");
    });
  });})
  
// Confirmation lors de l’envoi du formulaire de preuve de paiement
document.addEventListener("DOMContentLoaded", function () {
  const proofForm = document.getElementById("proof");

  proofForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Optionnel : tu peux ici envoyer les infos vers un serveur avec fetch()

    alert("Merci ! Votre preuve de paiement a été envoyée. Nous vous répondrons sous peu.");
    proofForm.reset(); // Réinitialise le formulaire après envoi
  });
});

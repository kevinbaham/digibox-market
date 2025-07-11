// Auth check
if (location.pathname.includes("index.html")) {
  const user = JSON.parse(localStorage.getItem("digibox_user"));
  if (!user) {
    alert("Veuillez vous connecter.");
    window.location.href = "login.html";
  }
}

// CV TEMPLATES
const cvTemplates = {
  cv1: `<div style="max-width:700px;margin:auto;">
    <h1 contenteditable="true">Votre Nom</h1>
    <h3 contenteditable="true">Poste souhaité</h3>
    <p contenteditable="true">Résumé professionnel, vos atouts principaux...</p>
    <h2>Expériences</h2>
    <ul><li contenteditable="true">Poste chez Entreprise (2020-2023) - Missions...</li></ul>
    <h2>Formation</h2>
    <ul><li contenteditable="true">Diplôme Université, année</li></ul>
    <h2>Compétences</h2>
    <ul><li contenteditable="true">HTML / CSS</li><li contenteditable="true">JavaScript</li></ul>
  </div>`,
  cv2: `<div style="max-width:700px;margin:auto;">
    <h1 contenteditable="true">Votre Nom</h1>
    <h3 contenteditable="true">Modèle CV Pro</h3>
    <p contenteditable="true">Résumé professionnel, vos atouts principaux...</p>
    <h2>Expériences</h2>
    <ul><li contenteditable="true">Poste chez Entreprise (2019-2022) - Missions...</li></ul>
    <h2>Formation</h2>
    <ul><li contenteditable="true">Diplôme Université, année</li></ul>
    <h2>Compétences</h2>
    <ul><li contenteditable="true">Word / Excel</li><li contenteditable="true">Photoshop</li></ul>
  </div>`
};

let selectedCV = null;

window.loadCV = function(cvKey) {
  selectedCV = cvKey;
  document.getElementById('cv-editor').innerHTML = cvTemplates[cvKey];
  document.getElementById('cv-editor').classList.remove('hidden');
  document.getElementById('cv-actions').classList.remove('hidden');
  document.getElementById('facture').classList.add('hidden');
  window.scrollTo({ top: document.getElementById('cv-editor').offsetTop - 20, behavior: 'smooth' });
};

const btnDownload = document.getElementById("btn-download");
if (btnDownload) {
  btnDownload.onclick = function () {
    if (!selectedCV) return alert("Veuillez sélectionner un modèle.");

    document.getElementById('facture').innerHTML = `
      <h3>Facture</h3>
      <p>Produit : <b>${selectedCV === 'cv1' ? 'CV Canva Bleu Pro' : 'Modèle CV Pro'}</b></p>
      <p>Prix : <b>2000 FCFA</b></p>
      <button class="btn" id="btn-pay">Payer et télécharger</button>
    `;
    document.getElementById('facture').classList.remove('hidden');
    document.getElementById('btn-pay').onclick = lancerPaiement;
  };
}

function lancerPaiement() {
  const transaction_id = "TX" + Date.now();
  const email = JSON.parse(localStorage.getItem("digibox_user"))?.email || "client@example.com";

  CinetPay.setConfig({
    apikey: "VOTRE_API_KEY",
    site_id: "VOTRE_SITE_ID",
    notify_url: "https://votre-site.com/notify",
    mode: "PRODUCTION"
  });

  CinetPay.getCheckout({
    transaction_id,
    amount: 2000,
    currency: "XOF",
    channels: "ALL",
    description: "Achat: " + selectedCV,
    customer_email: email,
    metadata: { product: selectedCV }
  });

  CinetPay.waitResponse(function (data) {
    if (data.status === "ACCEPTED") {
      telechargerCV();
    } else {
      alert("Paiement échoué ❌");
    }
  });

  CinetPay.onError(() => alert("Erreur de paiement !"));
}

function telechargerCV() {
  const element = document.getElementById('cv-editor');
  html2pdf().set({
    margin: 0.5,
    filename: 'Mon-CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(element).save();
}

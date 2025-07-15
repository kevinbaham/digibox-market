document.addEventListener('DOMContentLoaded', () => {
  const champs = ['prenom', 'nom', 'email', 'telephone', 'objectif', 'experience', 'diplomes', 'competences', 'langues', 'reseaux'];
  const template = document.getElementById('template');

  // AUTO-SAVE & RESTORE
  champs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = localStorage.getItem(`cv_${id}`) || "";
    el.addEventListener('input', () => {
      localStorage.setItem(`cv_${id}`, el.value);
      previewCV();
    });
  });

  if (template) {
    template.value = localStorage.getItem('cv_template') || "moderne";
    template.addEventListener('change', () => {
      localStorage.setItem('cv_template', template.value);
      previewCV();
    });
  }

  previewCV();
  restoreSkills();
});

// AJOUTER DES COMPÉTENCES DYNAMIQUEMENT
function addSkill(){
  const ul = document.getElementById('skillsList');
  let li = document.createElement('li');
  li.contentEditable = true;
  li.innerText = "Nouvelle compétence";
  ul.appendChild(li);
  saveSkills();
}

function saveSkills() {
  const skills = [];
  document.querySelectorAll('#skillsList li').forEach(li => skills.push(li.innerText));
  localStorage.setItem('cv_skills', JSON.stringify(skills));
}

function restoreSkills() {
  const skillsData = JSON.parse(localStorage.getItem('cv_skills') || '[]');
  const ul = document.getElementById('skillsList');
  if (!ul) return;
  skillsData.forEach(skill => {
    let li = document.createElement('li');
    li.contentEditable = true;
    li.innerText = skill;
    ul.appendChild(li);
  });
}

// PHOTO DE PROFIL
function loadPhoto(event){
  let reader = new FileReader();
  reader.onload = () => {
    let img = document.getElementById('profilePic');
    img.src = reader.result;
    localStorage.setItem('cv_photo', reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
  let img = document.getElementById('profilePic');
  if (img) {
    const savedPhoto = localStorage.getItem('cv_photo');
    if (savedPhoto) img.src = savedPhoto;
  }
});

// PDF EXPORT
function generatePDF() {
  if (!localStorage.getItem("digibox_paid")) {
    alert("Veuillez payer avant de télécharger.");
    window.location.href = "../checkout.html";
    return;
  }
  html2pdf().from(document.getElementById('cv-preview')).save('CV.pdf');
}

// WORD EXPORT
function exportWord() {
  if (!localStorage.getItem("digibox_paid")) {
    alert("Veuillez payer avant de télécharger.");
    window.location.href = "../checkout.html";
    return;
  }
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                 "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                 "xmlns='http://www.w3.org/TR/REC-html40'>"+
                 "<head><meta charset='utf-8'><title>Export Word</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + document.getElementById("cv-preview").innerHTML + footer;
  let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  let fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = 'CV.doc';
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

// RESET FORM
function resetCV() {
  localStorage.clear();
  window.location.reload();
}

// ========================
// 1. CONFIGURACIÓN INICIAL
// ========================
const CV_URL = "https://drive.google.com/file/d/1G5i7OP_s-NBtuGpkSjjtjqsphWx6OBXP/view?usp=drive_link";

// ========================
// 2. MENÚ HAMBURGUESA
// ========================
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

// ========================
// 3. EFECTO MÁQUINA DE ESCRIBIR
// ========================
const fullName = "ANDREA\nVALENTINA\nGRANADOS\nGARCÍA";
const lines = fullName.split('\n');
let typewriterElement;
let currentLine = 0, currentChar = 0, isDeleting = false, waitTimeout = false;

function typeEffect() {
  if (!typewriterElement) return;
  if (waitTimeout) return;
  if (currentLine >= lines.length) {
    currentLine = 0;
    typewriterElement.innerHTML = '';
    currentChar = 0;
    isDeleting = false;
    setTimeout(typeEffect, 200);
    return;
  }
  const currentText = lines[currentLine];
  if (!isDeleting && currentChar <= currentText.length) {
    let displayText = currentText.substring(0, currentChar);
    if (currentLine > 0) displayText = lines.slice(0, currentLine).join('<br>') + '<br>' + displayText;
    typewriterElement.innerHTML = displayText;
    currentChar++;
    if (currentChar > currentText.length) {
      if (currentLine + 1 < lines.length) {
        currentLine++;
        currentChar = 0;
        setTimeout(typeEffect, 150);
      } else {
        waitTimeout = true;
        setTimeout(() => {
          waitTimeout = false;
          isDeleting = true;
          currentLine = lines.length - 1;
          currentChar = lines[currentLine].length;
          typeEffect();
        }, 2000);
      }
      return;
    }
    setTimeout(typeEffect, 70);
  } else if (isDeleting && currentChar >= 0) {
    let displayText = currentText.substring(0, currentChar);
    if (currentLine > 0) displayText = lines.slice(0, currentLine).join('<br>') + '<br>' + displayText;
    typewriterElement.innerHTML = displayText;
    currentChar--;
    if (currentChar < 0) {
      if (currentLine > 0) {
        currentLine--;
        currentChar = lines[currentLine].length;
        setTimeout(typeEffect, 50);
      } else {
        isDeleting = false;
        currentLine = 0;
        currentChar = 0;
        setTimeout(typeEffect, 200);
      }
      return;
    }
    setTimeout(typeEffect, 40);
  } else {
    setTimeout(typeEffect, 100);
  }
}

// ========================
// 4. HABILIDADES
// ========================
const skillsData = {
  es: [
    { title: "🎮 Desarrollo de Videojuegos", skills: ["Programación de gameplay", "C# / Unity", "Física y colisiones", "Sistemas interactivos", "Game design", "Diseño de niveles"] },
    { title: "🎨 Arte y Diseño Visual", skills: ["Modelado 3D", "Texturizado", "Animación", "Pixel art", "Ilustración digital", "Diseño de personajes", "Dirección de arte"] },
    { title: "📱 UX y Narrativa", skills: ["UI / UX", "Diseño de interfaces", "Experiencia de usuario", "Diseño narrativo", "Prototipado de interfaces", "Diseño de HUD"] },
    { title: "🛠️ Herramientas", skills: ["Unity", "Blender", "Git", "Visual Studio", "Photoshop", "Illustrator", "Figma", "After Effects"] }
  ],
  en: [
    { title: "🎮 Game Development", skills: ["Gameplay Programming", "C# / Unity", "Physics & Collisions", "Interactive Systems", "Game Design", "Level Design"] },
    { title: "🎨 Art & Visual Design", skills: ["3D Modeling", "Texturing", "Animation", "Pixel Art", "Digital Illustration", "Character Design", "Art Direction"] },
    { title: "📱 UX & Narrative", skills: ["UI / UX", "Interface Design", "User Experience", "Narrative Design", "Interface Prototyping", "HUD Design"] },
    { title: "🛠️ Tools", skills: ["Unity", "Blender", "Git", "Visual Studio", "Photoshop", "Illustrator", "Figma", "After Effects"] }
  ]
};

let currentLang = "es";

function buildSkills(lang) {
  const data = skillsData[lang];
  const grid = document.getElementById('constellationsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  data.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'skill-category-title';
    titleDiv.innerText = category.title;
    categoryDiv.appendChild(titleDiv);
    
    const skillsList = document.createElement('div');
    skillsList.className = 'skills-list';
    
    category.skills.forEach(skill => {
      const skillBadge = document.createElement('span');
      skillBadge.className = 'skill-badge';
      skillBadge.innerText = skill;
      skillsList.appendChild(skillBadge);
    });
    
    categoryDiv.appendChild(skillsList);
    grid.appendChild(categoryDiv);
  });
}

// ========================
// 5. IDIOMAS Y TRADUCCIONES
// ========================
const translations = {
  es: {
    navHome: "Inicio", navAbout: "Sobre mí", navSkills: "Habilidades", navProjects: "Proyectos", navContact: "Contacto", navCv: "📄 CV",
    aboutTitle: "Sobre Mí", 
    aboutText1: "Ayudo a construir experiencias interactivas donde el arte, el diseño y la programación funcionan como un solo sistema coherente. Soy desarrolladora en Unity con formación en Ingeniería Multimedia y tecnóloga en Desarrollo de Videojuegos y Entornos Interactivos. Me especializo en la integración de sistemas de gameplay en C#, diseño de interfaces y creación de contenido visual 2D/3D, combinando una visión técnica y artística del desarrollo.", 
    aboutText2: "He trabajado en entornos colaborativos como game jams y proyectos multidisciplinarios, asumiendo responsabilidades en programación de gameplay, diseño de niveles, dirección de arte y producción de assets visuales. Mi enfoque se centra en crear sistemas jugables sólidos, mantener coherencia visual y asegurar que el arte y la programación se integren sin fricciones técnicas. Busco integrarme a un equipo donde pueda aportar desde el primer día y contribuir a experiencias interactivas pulidas y visualmente atractivas.", 
    aboutContact: "Contáctame",
    skillsTitle: "Constelación de Habilidades", 
    skillsSubtitle: "Explora mis habilidades profesionales",
    projectsTitle: "Proyectos Interactivos", 
    projectsSub: "Gameplay, arte y narrativa en cada experiencia",
    proj1Desc: "Estrategia en tiempo real donde una joven bruja debe defender un pueblo de amenazas fantasmales tomando decisiones tácticas bajo recursos limitados.",
    proj2Desc: "Arcade de disparos rápido y colorido donde una niña usa burbujas para derribar payasos flotantes en un circo tan festivo como inquietante.",
    proj3Desc: "Aventura de exploración en laberinto donde cada partida cambia, desafiando al jugador a sobrevivir trampas y encontrar un tesoro ancestral.",
    proj4Desc: "Arcade de supervivencia minimalista donde una esfera luminosa debe esquivar enemigos y usar power-ups en una isla suspendida en el vacío.",
    proj5Desc: "Cinemática 3D narrativa que sigue el viaje de una pequeña criatura para restaurar la luz de un mundo que comienza a apagarse.",
    proj6Desc: "Plataformas 2D educativo donde una nutria recoge y clasifica residuos para restaurar el equilibrio del entorno natural.",
    caseStudyBtn: "Caso de Estudio →", 
    contactTitle: "Colaboremos", 
    contactSub: "¿Tienes un proyecto interactivo en mente? Hablemos sobre cómo integrar arte y código.", 
    nameLabel: "Nombre", 
    emailLabel: "Email", 
    msgLabel: "Mensaje", 
    submitBtn: "Enviar mensaje", 
    heroDescription: "Ingeniera Multimedia que desarrolla experiencias interactivas en Unity, combinando programación de gameplay en C# con creación de arte 2D/3D y diseño de UI para videojuegos."
  },
  en: {
    navHome: "Home", navAbout: "About", navSkills: "Skills", navProjects: "Projects", navContact: "Contact", navCv: "📄 CV",
    aboutTitle: "About Me", 
    aboutText1: "I help build interactive experiences where art, design and programming function as a single coherent system. I'm a Unity developer with a degree in Multimedia Engineering and a technologist in Video Game Development. I specialize in C# gameplay systems, interface design, and 2D/3D visual content, merging technical and artistic vision.", 
    aboutText2: "I've worked in game jams and multidisciplinary projects, taking on gameplay programming, level design, art direction and visual asset production. My focus is on building solid playable systems, maintaining visual consistency, and ensuring frictionless integration between art and code. I aim to join dynamic teams and contribute to polished, visually engaging interactive experiences.", 
    aboutContact: "Contact me",
    skillsTitle: "Skills Constellation", 
    skillsSubtitle: "Explore my professional skills",
    projectsTitle: "Interactive Projects", 
    projectsSub: "Gameplay, art and narrative in every experience",
    proj1Desc: "Real-time strategy where a young witch must defend a village from ghostly threats under limited resources.",
    proj2Desc: "Fast-paced colorful shooter where a girl uses bubbles to knock down floating clowns in a festive yet eerie circus.",
    proj3Desc: "Maze exploration adventure where each run changes, challenging the player to survive traps and find ancestral treasure.",
    proj4Desc: "Minimalist survival arcade where a glowing sphere must dodge enemies and use power-ups on a void island.",
    proj5Desc: "3D narrative cinematic following a small creature's journey to restore the light of a fading world.",
    proj6Desc: "Educational 2D platformer where an otter collects and sorts waste to restore the natural balance.",
    caseStudyBtn: "Case Study →", 
    contactTitle: "Let's collaborate", 
    contactSub: "Have an interactive project in mind? Let's talk about integrating art and code.", 
    nameLabel: "Name", 
    emailLabel: "Email", 
    msgLabel: "Message", 
    submitBtn: "Send message", 
    heroDescription: "Multimedia Engineer who develops interactive experiences in Unity, combining C# gameplay programming with 2D/3D art creation and UI design for video games."
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  
  document.querySelectorAll("[data-key]").forEach(el => { 
    const key = el.getAttribute("data-key"); 
    if (t[key]) el.innerText = t[key]; 
  });
  
  const aboutText1 = document.getElementById("aboutText1");
  const aboutText2 = document.getElementById("aboutText2");
  const aboutContact = document.getElementById("aboutContact");
  const heroDescription = document.getElementById("heroDescription");
  
  if (aboutText1) aboutText1.innerText = t.aboutText1;
  if (aboutText2) aboutText2.innerText = t.aboutText2;
  if (aboutContact) aboutContact.innerText = t.aboutContact;
  if (heroDescription) heroDescription.innerText = t.heroDescription;
  
  const skillsTitle = document.querySelector("#constellations .section-header h2");
  const skillsSubtitle = document.querySelector("#constellations .section-header p");
  const projectsTitle = document.querySelector("#projects .section-header h2");
  const projectsSub = document.querySelector("#projects .section-header p");
  const contactTitle = document.querySelector("#contact .section-header h2");
  const contactSub = document.querySelector("#contact .section-header p");
  
  if (skillsTitle) skillsTitle.innerText = t.skillsTitle;
  if (skillsSubtitle) skillsSubtitle.innerText = t.skillsSubtitle;
  if (projectsTitle) projectsTitle.innerText = t.projectsTitle;
  if (projectsSub) projectsSub.innerText = t.projectsSub;
  if (contactTitle) contactTitle.innerText = t.contactTitle;
  if (contactSub) contactSub.innerText = t.contactSub;
  
  const nameLabel = document.querySelector("label[data-key='nameLabel']");
  const emailLabel = document.querySelector("label[data-key='emailLabel']");
  const msgLabel = document.querySelector("label[data-key='msgLabel']");
  const submitBtn = document.getElementById("submitBtn");
  
  if (nameLabel) nameLabel.innerText = t.nameLabel;
  if (emailLabel) emailLabel.innerText = t.emailLabel;
  if (msgLabel) msgLabel.innerText = t.msgLabel;
  if (submitBtn) submitBtn.innerText = t.submitBtn;
  
  const projDescs = [t.proj1Desc, t.proj2Desc, t.proj3Desc, t.proj4Desc, t.proj5Desc, t.proj6Desc];
  document.querySelectorAll(".project-desc").forEach((desc, idx) => { 
    if(projDescs[idx]) desc.innerText = projDescs[idx]; 
  });
  
  document.querySelectorAll("[data-key='caseStudyBtn']").forEach(btn => { 
    btn.innerText = t.caseStudyBtn; 
  });
  
  document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtnDesktop = document.getElementById(lang === "es" ? "btnES" : "btnEN");
  if (activeBtnDesktop) activeBtnDesktop.classList.add("active");
  
  document.querySelectorAll(".lang-btn-mobile").forEach(btn => btn.classList.remove("active"));
  const activeBtnMobile = document.getElementById(lang === "es" ? "btnESMobile" : "btnENMobile");
  if (activeBtnMobile) activeBtnMobile.classList.add("active");
  
  if (currentLang !== lang) {
    currentLang = lang;
    buildSkills(lang);
  }
}

// ========================
// 6. EMAILJS - FORMULARIO DE CONTACTO (CORREGIDO)
// ========================
function initEmailJS() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('formStatus');
  
  if (!contactForm) {
    console.error("No se encontró el formulario con id 'contact-form'");
    return;
  }
  
  if (typeof emailjs === 'undefined') {
    console.error("EmailJS no está cargado. Verifica la conexión a Internet y el script de EmailJS.");
    formStatus.innerHTML = '<p style="color: #ff6b6b;">❌ Error: EmailJS no está disponible. Verifica tu conexión.</p>';
    return;
  }
  
  console.log("EmailJS disponible, inicializando...");
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Mostrar mensaje de carga
    formStatus.innerHTML = '<p style="color: #F97316;">📧 Enviando mensaje...</p>';
    
    // Obtener los valores del formulario para depuración
    const formData = new FormData(contactForm);
    console.log("Datos del formulario:");
    console.log("  from_name:", formData.get('from_name'));
    console.log("  from_email:", formData.get('from_email'));
    console.log("  message:", formData.get('message'));
    
    // Enviar el formulario con EmailJS
    emailjs.sendForm(
      "service_5cddsgm",   // Tu Service ID
      "template_zkacu8g",  // Tu Template ID
      contactForm          // El formulario
    )
    .then((response) => {
      console.log("EmailJS éxito:", response);
      const successMsg = currentLang === 'es' 
        ? '✓ Mensaje enviado correctamente. ¡Gracias!' 
        : '✓ Message sent successfully. Thank you!';
      formStatus.innerHTML = `<p style="color: #4ade80;">${successMsg}</p>`;
      contactForm.reset();
      setTimeout(() => { 
        formStatus.innerHTML = ''; 
      }, 5000);
    })
    .catch((error) => {
      console.error("Error detallado de EmailJS:", error);
      let errorMsg = '';
      if (currentLang === 'es') {
        errorMsg = '✗ Error al enviar el mensaje. Detalles: ' + (error.text || error.message || 'Revisa la consola');
      } else {
        errorMsg = '✗ Error sending message. Details: ' + (error.text || error.message || 'Check the console');
      }
      formStatus.innerHTML = `<p style="color: #ff6b6b;">${errorMsg}</p>`;
      setTimeout(() => { 
        formStatus.innerHTML = ''; 
      }, 8000);
    });
  });
}

// ========================
// 7. OBSERVADOR DE SCROLL
// ========================
function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// ========================
// 8. INICIALIZACIÓN
// ========================
document.addEventListener('DOMContentLoaded', function() {
  // Configurar botones CV
  const cvButtonNav = document.getElementById("cvButtonNav");
  const cvButtonMobile = document.getElementById("cvButtonMobile");
  if (cvButtonNav) cvButtonNav.href = CV_URL;
  if (cvButtonMobile) cvButtonMobile.href = CV_URL;
  
  // Inicializar máquina de escribir
  typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) typeEffect();
  
  // Inicializar habilidades
  buildSkills('es');
  
  // Inicializar idioma
  updateLanguage('es');
  
  // Inicializar observador de scroll
  initRevealObserver();
  
  // Inicializar EmailJS con tu Public Key
  if (typeof emailjs !== 'undefined') {
    emailjs.init("JmNK5TOFS7t8dtPN-");
    console.log("EmailJS inicializado con Public Key");
    initEmailJS();
  } else {
    console.error("EmailJS no está disponible. Verifica que el script se cargó correctamente.");
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
      formStatus.innerHTML = '<p style="color: #ff6b6b;">⚠️ Error: El servicio de correo no está disponible. Por favor, contacta directamente por LinkedIn.</p>';
    }
  }
  
  // Inicializar menú hamburguesa
  initHamburgerMenu();
  
  // Configurar eventos de idioma
  const btnES = document.getElementById("btnES");
  const btnEN = document.getElementById("btnEN");
  if (btnES) btnES.addEventListener("click", () => { updateLanguage("es"); });
  if (btnEN) btnEN.addEventListener("click", () => { updateLanguage("en"); });
  
  const btnESMobile = document.getElementById("btnESMobile");
  const btnENMobile = document.getElementById("btnENMobile");
  if (btnESMobile) btnESMobile.addEventListener("click", () => { updateLanguage("es"); });
  if (btnENMobile) btnENMobile.addEventListener("click", () => { updateLanguage("en"); });
});
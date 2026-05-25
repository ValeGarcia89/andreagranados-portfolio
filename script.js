// ========================
// 1. CONFIGURACIÓN INICIAL
// ========================
const CV_URL = "https://drive.google.com/file/d/1G5i7OP_s-NBtuGpkSjjtjqsphWx6OBXP/view?usp=drive_link";
document.getElementById("cvButtonNav").href = CV_URL;

// ========================
// 2. EFECTO MÁQUINA DE ESCRIBIR
// ========================
const fullName = "ANDREA\nVALENTINA\nGRANADOS\nGARCÍA";
const lines = fullName.split('\n');
const typewriterElement = document.getElementById('typewriter');
let currentLine = 0, currentChar = 0, isDeleting = false, waitTimeout = false;

function typeEffect() {
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
typeEffect();

// ========================
// 3. CONSTELACIONES Y HABILIDADES
// ========================
const constellationsData = {
  es: [
    { center: "Desarrollo de Videojuegos", skills: ["Programación de gameplay", "C# / Unity", "Física y colisiones", "Sistemas interactivos", "Game design", "Diseño de niveles"] },
    { center: "Arte y Diseño Visual", skills: ["Modelado 3D", "Texturizado", "Animación", "Pixel art", "Ilustración digital", "Diseño de personajes", "Dirección de arte"] },
    { center: "UX y Narrativa", skills: ["UI / UX", "Diseño de interfaces", "Experiencia de usuario", "Diseño narrativo", "Prototipado de interfaces", "Diseño de HUD"] },
    { center: "Herramientas", skills: ["Unity", "Blender", "Git", "Visual Studio", "Photoshop", "Illustrator", "Figma", "After Effects"] }
  ],
  en: [
    { center: "Game Development", skills: ["Gameplay Programming", "C# / Unity", "Physics & Collisions", "Interactive Systems", "Game Design", "Level Design"] },
    { center: "Art & Visual Design", skills: ["3D Modeling", "Texturing", "Animation", "Pixel Art", "Digital Illustration", "Character Design", "Art Direction"] },
    { center: "UX & Narrative", skills: ["UI / UX", "Interface Design", "User Experience", "Narrative Design", "Interface Prototyping", "HUD Design"] },
    { center: "Tools", skills: ["Unity", "Blender", "Git", "Visual Studio", "Photoshop", "Illustrator", "Figma", "After Effects"] }
  ]
};

let currentLang = "es";
let activeOrbitAnimations = {};

function addFixedStars(container) {
  const starCount = 8;
  for (let i = 0; i < starCount; i++) {
    const angle = (i / starCount) * Math.PI * 2;
    const distance = 130;
    const starDiv = document.createElement('div');
    starDiv.className = 'fixed-star';
    starDiv.style.position = 'absolute';
    starDiv.style.top = '50%';
    starDiv.style.left = '50%';
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    starDiv.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    container.appendChild(starDiv);
  }
}

function initOrbit(orbitSystem, skillNodes, speed = 0.0025) {
  const N = skillNodes.length;
  let angles = [];
  for (let i = 0; i < N; i++) angles.push((i / N) * Math.PI * 2);
  let animationId = null;
  let paused = false;
  function updatePositions() {
    const currentWidth = orbitSystem.offsetWidth;
    const currentHeight = orbitSystem.offsetHeight;
    const cX = currentWidth / 2;
    const cY = currentHeight / 2;
    const dynamicRadius = Math.min(currentWidth, currentHeight) * 0.4;
    for (let i = 0; i < N; i++) {
      if (!paused) {
        angles[i] += speed;
        if (angles[i] > Math.PI * 2) angles[i] -= Math.PI * 2;
      }
      const x = Math.cos(angles[i]) * dynamicRadius;
      const y = Math.sin(angles[i]) * dynamicRadius;
      if (skillNodes[i]) {
        skillNodes[i].style.left = (cX + x - skillNodes[i].offsetWidth / 2) + 'px';
        skillNodes[i].style.top = (cY + y - skillNodes[i].offsetHeight / 2) + 'px';
      }
    }
    animationId = requestAnimationFrame(updatePositions);
  }
  updatePositions();
  return {
    pause: () => { paused = true; },
    resume: () => { paused = false; },
    stop: () => { if (animationId) cancelAnimationFrame(animationId); }
  };
}

function buildConstellations(lang) {
  const data = constellationsData[lang];
  const grid = document.getElementById('constellationsGrid');
  grid.innerHTML = '';
  grid.classList.remove('has-active');
  Object.values(activeOrbitAnimations).forEach(anim => anim.stop());
  activeOrbitAnimations = {};
  
  data.forEach((constData, idx) => {
    const card = document.createElement('div');
    card.className = 'constellation';
    const orbitSystem = document.createElement('div');
    orbitSystem.className = 'orbit-system';
    
    const center = document.createElement('div');
    center.className = 'center-node';
    center.innerText = constData.center;
    const ring = document.createElement('div');
    ring.className = 'orbit-ring';
    orbitSystem.appendChild(ring);
    orbitSystem.appendChild(center);
    
    addFixedStars(orbitSystem);
    for (let s = 0; s < 12; s++) {
      const star = document.createElement('div');
      star.className = 'star';
      const angleStar = (s / 12) * Math.PI * 2;
      const rad = 142;
      star.style.position = 'absolute';
      star.style.top = '50%';
      star.style.left = '50%';
      star.style.transform = `translate(calc(-50% + ${Math.cos(angleStar) * rad}px), calc(-50% + ${Math.sin(angleStar) * rad}px))`;
      orbitSystem.appendChild(star);
    }
    
    const skillNodes = [];
    constData.skills.forEach((skill) => {
      const node = document.createElement('div');
      node.className = 'skill-node';
      node.innerText = skill;
      node.setAttribute('data-skill', skill);
      if (skill.length > 18) {
        node.setAttribute('data-long', 'true');
      }
      orbitSystem.appendChild(node);
      skillNodes.push(node);
    });
    card.appendChild(orbitSystem);
    grid.appendChild(card);
    
    const orbitAnim = initOrbit(orbitSystem, skillNodes, 0.0026);
    activeOrbitAnimations[idx] = orbitAnim;
    orbitAnim.pause();
    
    card.addEventListener('mouseenter', () => {
      if (!grid.classList.contains('has-active')) grid.classList.add('has-active');
      card.classList.add('active');
      orbitAnim.resume();
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('active');
      grid.classList.remove('has-active');
      orbitAnim.pause();
    });
  });
}

// ========================
// 4. IDIOMAS Y TRADUCCIONES
// ========================
const translations = {
  es: {
    navHome: "Inicio", navAbout: "Sobre mí", navSkills: "Habilidades", navProjects: "Proyectos", navContact: "Contacto", navCv: "📄 CV",
    aboutTitle: "Sobre Mí", aboutText1: "Ayudo a construir experiencias interactivas donde el arte, el diseño y la programación funcionan como un solo sistema coherente. Soy desarrolladora en Unity con formación en Ingeniería Multimedia y tecnóloga en Desarrollo de Videojuegos y Entornos Interactivos. Me especializo en la integración de sistemas de gameplay en C#, diseño de interfaces y creación de contenido visual 2D/3D, combinando una visión técnica y artística del desarrollo.", aboutText2: "He trabajado en entornos colaborativos como game jams y proyectos multidisciplinarios, asumiendo responsabilidades en programación de gameplay, diseño de niveles, dirección de arte y producción de assets visuales. Mi enfoque se centra en crear sistemas jugables sólidos, mantener coherencia visual y asegurar que el arte y la programación se integren sin fricciones técnicas. Busco integrarme a un equipo donde pueda aportar desde el primer día y contribuir a experiencias interactivas pulidas y visualmente atractivas.", aboutContact: "Contáctame",
    skillsTitle: "Constelación de Habilidades", skillsSubtitle: "Pasa el cursor sobre cada constelación para activar la órbita circular",
    projectsTitle: "Proyectos Interactivos", projectsSub: "Gameplay, arte y narrativa en cada experiencia",
    proj1Desc: "Estrategia en tiempo real donde una joven bruja debe defender un pueblo de amenazas fantasmales tomando decisiones tácticas bajo recursos limitados.",
    proj2Desc: "Arcade de disparos rápido y colorido donde una niña usa burbujas para derribar payasos flotantes en un circo tan festivo como inquietante.",
    proj3Desc: "Aventura de exploración en laberinto donde cada partida cambia, desafiando al jugador a sobrevivir trampas y encontrar un tesoro ancestral.",
    proj4Desc: "Arcade de supervivencia minimalista donde una esfera luminosa debe esquivar enemigos y usar power-ups en una isla suspendida en el vacío.",
    proj5Desc: "Cinemática 3D narrativa que sigue el viaje de una pequeña criatura para restaurar la luz de un mundo que comienza a apagarse.",
    proj6Desc: "Plataformas 2D educativo donde una nutria recoge y clasifica residuos para restaurar el equilibrio del entorno natural.",
    caseStudyBtn: "Caso de Estudio →", contactTitle: "Colaboremos", contactSub: "¿Tienes un proyecto interactivo en mente? Hablemos sobre cómo integrar arte y código.", nameLabel: "Nombre", emailLabel: "Email", msgLabel: "Mensaje", submitBtn: "Enviar mensaje", heroDescription: "Ingeniera Multimedia que desarrolla experiencias interactivas en Unity, combinando programación de gameplay en C# con creación de arte 2D/3D y diseño de UI para videojuegos."
  },
  en: {
    navHome: "Home", navAbout: "About", navSkills: "Skills", navProjects: "Projects", navContact: "Contact", navCv: "📄 CV",
    aboutTitle: "About Me", aboutText1: "I help build interactive experiences where art, design and programming function as a single coherent system. I'm a Unity developer with a degree in Multimedia Engineering and a technologist in Video Game Development. I specialize in C# gameplay systems, interface design, and 2D/3D visual content, merging technical and artistic vision.", aboutText2: "I've worked in game jams and multidisciplinary projects, taking on gameplay programming, level design, art direction and visual asset production. My focus is on building solid playable systems, maintaining visual consistency, and ensuring frictionless integration between art and code. I aim to join dynamic teams and contribute to polished, visually engaging interactive experiences.", aboutContact: "Contact me",
    skillsTitle: "Skills Constellation", skillsSubtitle: "Hover over each constellation to activate the circular orbit",
    projectsTitle: "Interactive Projects", projectsSub: "Gameplay, art and narrative in every experience",
    proj1Desc: "Real-time strategy where a young witch must defend a village from ghostly threats under limited resources.",
    proj2Desc: "Fast-paced colorful shooter where a girl uses bubbles to knock down floating clowns in a festive yet eerie circus.",
    proj3Desc: "Maze exploration adventure where each run changes, challenging the player to survive traps and find ancestral treasure.",
    proj4Desc: "Minimalist survival arcade where a glowing sphere must dodge enemies and use power-ups on a void island.",
    proj5Desc: "3D narrative cinematic following a small creature's journey to restore the light of a fading world.",
    proj6Desc: "Educational 2D platformer where an otter collects and sorts waste to restore the natural balance.",
    caseStudyBtn: "Case Study →", contactTitle: "Let's collaborate", contactSub: "Have an interactive project in mind? Let's talk about integrating art and code.", nameLabel: "Name", emailLabel: "Email", msgLabel: "Message", submitBtn: "Send message", heroDescription: "Multimedia Engineer who develops interactive experiences in Unity, combining C# gameplay programming with 2D/3D art creation and UI design for video games."
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  document.querySelectorAll("[data-key]").forEach(el => { const key = el.getAttribute("data-key"); if (t[key]) el.innerText = t[key]; });
  document.getElementById("aboutText1").innerText = t.aboutText1;
  document.getElementById("aboutText2").innerText = t.aboutText2;
  document.getElementById("aboutContact").innerText = t.aboutContact;
  document.getElementById("heroDescription").innerText = t.heroDescription;
  document.querySelector("#constellations .section-header h2").innerText = t.skillsTitle;
  document.querySelector("#constellations .section-header p").innerText = t.skillsSubtitle;
  document.querySelector("#projects .section-header h2").innerText = t.projectsTitle;
  document.querySelector("#projects .section-header p").innerText = t.projectsSub;
  document.querySelectorAll("[data-key='caseStudyBtn']").forEach(btn => btn.innerText = t.caseStudyBtn);
  const projDescs = [t.proj1Desc, t.proj2Desc, t.proj3Desc, t.proj4Desc, t.proj5Desc, t.proj6Desc];
  document.querySelectorAll(".project-desc").forEach((desc, idx) => { if(projDescs[idx]) desc.innerText = projDescs[idx]; });
  document.querySelector("#contact .section-header h2").innerText = t.contactTitle;
  document.querySelector("#contact .section-header p").innerText = t.contactSub;
  document.querySelector("label[data-key='nameLabel']").innerText = t.nameLabel;
  document.querySelector("label[data-key='emailLabel']").innerText = t.emailLabel;
  document.querySelector("label[data-key='msgLabel']").innerText = t.msgLabel;
  document.querySelector("#submitBtn").innerText = t.submitBtn;
  document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(lang === "es" ? "btnES" : "btnEN").classList.add("active");
  
  if (currentLang !== lang) {
    currentLang = lang;
    buildConstellations(lang);
  }
}

// Eventos de los botones de idioma
document.getElementById("btnES").addEventListener("click", () => { updateLanguage("es"); });
document.getElementById("btnEN").addEventListener("click", () => { updateLanguage("en"); });

// Inicializar idioma por defecto
updateLanguage("es");

// ========================
// 5. OBSERVADOR DE SCROLL (REVEAL)
// ========================
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ========================
// 6. FORMULARIO DE CONTACTO (SIMULADO)
// ========================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formStatus.innerHTML = '<p style="color: #4ade80;">✓ ' + (currentLang === 'es' ? 'Mensaje enviado correctamente. ¡Gracias!' : 'Message sent successfully. Thank you!') + '</p>';
  contactForm.reset();
  setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
});
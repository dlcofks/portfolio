const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const year = document.querySelector("#year");
const projectModal = document.querySelector("#project-modal");
const modalCloseButton = projectModal.querySelector(".project-modal-close");
const projectCards = document.querySelectorAll(".project-card[data-project]");
let activeProjectCard = null;

const projectDetails = {
  tmap: {
    title: "T map mobility",
    description: "복잡한 이동을 간결하게 만드는 모빌리티 경험 리디자인 프로젝트의 예시입니다.",
    role: "사용자 여정 분석, 주요 화면 UX/UI 설계, 프로토타입 제작",
    technologies: "Figma, 사용자 인터뷰, 사용성 테스트",
    results: "경로 탐색 단계를 단순화하고, 사용성 테스트에서 목적지 설정 완료율이 개선된 것으로 가정한 예시입니다."
  },
  oatside: {
    title: "Oatside",
    description: "일상의 루틴을 새롭게 정의한 웰니스 브랜드 경험 프로젝트의 예시입니다.",
    role: "브랜드 경험 방향 설정, 모바일 서비스 UX/UI 디자인, 디자인 가이드 정리",
    technologies: "Figma, 브랜드 전략, 프로토타이핑",
    results: "일관된 브랜드 경험을 적용해 주요 화면의 이해도가 높아진 것으로 가정한 예시입니다."
  },
  notion: {
    title: "Notion for teams",
    description: "팀의 협업 방식을 바꾸는 워크스페이스 개선 프로젝트의 예시입니다.",
    role: "팀 협업 흐름 조사, 정보 구조 설계, 워크스페이스 화면 디자인",
    technologies: "Figma, 정보 구조 설계, 사용성 테스트",
    results: "자주 사용하는 협업 기능을 쉽게 찾고 사용할 수 있게 개선한 것으로 가정한 예시입니다."
  }
};

year.textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// 선택한 프로젝트의 예시 정보를 보여주고 모달을 엽니다.
function openProjectModal(card) {
  const details = projectDetails[card.dataset.project];
  if (!details) {
    console.error(`프로젝트 상세 정보가 없습니다: ${card.dataset.project}`);
    return;
  }

  activeProjectCard = card;
  projectModal.querySelector("#modal-title").textContent = details.title;
  projectModal.querySelector("#modal-description").textContent = details.description;
  projectModal.querySelector("#modal-role").textContent = details.role;
  projectModal.querySelector("#modal-technologies").textContent = details.technologies;
  projectModal.querySelector("#modal-results").textContent = details.results;
  projectModal.showModal();
  modalCloseButton.focus();
}

// 모달을 닫고, 열었던 프로젝트 카드로 키보드 포커스를 돌려보냅니다.
function closeProjectModal() {
  if (projectModal.open) projectModal.close();
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card);
    }
  });
});

modalCloseButton.addEventListener("click", closeProjectModal);
projectModal.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeProjectModal();
  }
});
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});
projectModal.addEventListener("close", () => {
  if (activeProjectCard) activeProjectCard.focus();
  activeProjectCard = null;
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = contactForm.querySelector(".form-message");
  message.textContent = "구독해주셔서 감사합니다. 새로운 작업 소식을 전해드릴게요!";
  contactForm.reset();
});

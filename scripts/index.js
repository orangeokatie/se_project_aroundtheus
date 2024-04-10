const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// MODALS
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-preview-modal");

//MODAL COMPONENTS
const profileEditForm = document.querySelector("#profile-edit-modal-form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//MAIN PAGE BUTTONS
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//MODAL BUTTONS
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-close-button"
);
const modalImageCloseBtn = previewImageModal.querySelector(
  "#modal__image-close-button"
);

const closeButtons = document.querySelectorAll(".modal__close");

//TEMPLATES
const previewImageElement = previewImageModal.querySelector(
  ".modal__image-element"
);
const previewImageElementTitle = previewImageModal.querySelector(
  ".modal__image-caption"
);

//NODES AND INPUTS
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardInput = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");

// FUNCTIONS
function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

function generateCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");

  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const trashButton = cardElement.querySelector(".card__trash-button");
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageElementTitle.textContent = cardData.name;
    toggleModal(previewImageModal);
  });

  return cardElement;
}

//EVENT HANDLERS
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  toggleModal(profileEditModal);
}

//EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  toggleModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => toggleModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  toggleModal(addCardModal)
);

addCardModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = generateCard({
    name,
    link,
  });

  renderCard(cardView, cardListEl);
  toggleModal(addCardModal);
  e.target.reset();
});

modalImageCloseBtn.addEventListener("click", () =>
  toggleModal(previewImageModal)
);

//initial cards
initialCards.reverse().forEach(function (cardData) {
  const cardView = generateCard(cardData);
  renderCard(cardView, cardListEl);
});

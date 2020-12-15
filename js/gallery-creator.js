const galleryArray = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const thumbGalleryRef = document.querySelector(".js-gallery");
// console.dir(thumbGallery);
const modalRef = document.querySelector(".js-lightbox");
const modalImgRef = modalRef.querySelector(".lightbox__image");
// const modalBtnCloseRef = modalRef.querySelector(
//   'button[data-action="close-lightbox"'
// );

const galleryItemsCreate = (elem) => {
  const elementLi = document.createElement("li");
  elementLi.classList.add("gallery__item");
  const elementA = document.createElement("a");
  elementA.classList.add("gallery__link");
  elementA.setAttribute("href", elem.original);
  const elementImg = document.createElement("img");
  elementImg.classList.add("gallery__image");
  elementImg.setAttribute("src", elem.preview);
  elementImg.setAttribute("data-set", elem.original);
  elementImg.setAttribute("alt", elem.description);
  elementA.appendChild(elementImg);
  elementLi.appendChild(elementA);

  return elementLi;
};

const galleryItems = galleryArray.map(galleryItemsCreate);

// console.dir(galleryItems);
function removeAndClear() {
  modalRef.classList.remove("is-open");
  modalImgRef.setAttribute("src", "");
  modalImgRef.setAttribute("alt", "");
  modalImgRef.innerHTML = "";
  window.removeEventListener("keydown", itemKeySwitchHandler);
  modalRef.removeEventListener("click", closeModalHandler);
}

const itemKeySwitchHandler = (event) => {
  //   console.dir(event.code);
  if (event.code === "Escape") {
    removeAndClear();
  }
  const galleryArrayLinks = galleryArray.map(({ original }) => original);
  const prevImgSrc = modalImgRef.getAttribute("src");
  // console.dir(galleryArrayLinks);
  if (event.code === "ArrowLeft") {
    if (galleryArrayLinks.indexOf(prevImgSrc) > 0) {
      modalImgRef.setAttribute(
        "src",
        galleryArrayLinks[galleryArrayLinks.indexOf(prevImgSrc) - 1]
      );
      modalImgRef.setAttribute(
        "alt",
        galleryArray[galleryArrayLinks.indexOf(prevImgSrc) - 1].description
      );
    }
  }
  if (event.code === "ArrowRight") {
    if (galleryArrayLinks.indexOf(prevImgSrc) < galleryArrayLinks.length - 1) {
      modalImgRef.setAttribute(
        "src",
        galleryArrayLinks[galleryArrayLinks.indexOf(prevImgSrc) + 1]
      );
      modalImgRef.setAttribute(
        "alt",
        galleryArray[galleryArrayLinks.indexOf(prevImgSrc) + 1].description
      );
    }
  }
};

const closeModalHandler = (event) => {
  //   console.dir(event.target === modalImgRef);
  if (event.target === modalImgRef) {
    return;
  }
  removeAndClear();
};

const itemOpenModalHandler = (event) => {
  if (event.target.nodeName === "IMG") {
    modalImgRef.setAttribute("src", event.target.getAttribute("data-set"));
    modalImgRef.setAttribute("alt", event.target.getAttribute("alt"));
    modalRef.classList.add("is-open");
    event.preventDefault();
    modalRef.addEventListener("click", closeModalHandler);
    window.addEventListener("keydown", itemKeySwitchHandler);
  }
  //   getImgUrl(event);
  //   console.log(getImgUrl(event));
};

thumbGalleryRef.append(...galleryItems);
// console.dir(thumbGallery);

thumbGalleryRef.addEventListener("click", itemOpenModalHandler);

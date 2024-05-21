const images = [
  {
    preview: "./imgs/bike.png",
    original: "./imgs/bike.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike2.png",
    original: "./imgs/bike2.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike3.png",
    original: "./imgs/bike3.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike4.png",
    original: "./imgs/bike4.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike5.png",
    original: "./imgs/bike5.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike6.png",
    original: "./imgs/bike6.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike7.png",
    original: "./imgs/bike7.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike8.png",
    original: "./imgs/bike8.png",
    description: "текстовий опис зображення",
  },
  {
    preview: "./imgs/bike9.png",
    original: "./imgs/bike9.png",
    description: "текстовий опис зображення",
  },
];

const galleryContainer = document.querySelector('.gallery');

const galleryItemsMarkup = images.map(({ preview, original, description }, index) => {
    return `
        <li class="gallery-item">
            <img class="gallery-image" src="${preview}" data-source="${original}" data-index="${index}" alt="${description}">
        </li>
    `;
}).join('');

galleryContainer.innerHTML = galleryItemsMarkup;

let currentIndex = null;
let instance = null;

galleryContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains('gallery-image')) {
        currentIndex = Number(target.dataset.index);
        openLightbox(images[currentIndex].original, images[currentIndex].description, currentIndex);
    }
});

function openLightbox(src, description, index) {
    instance = basicLightbox.create(`
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-arrow lightbox-arrow--left">&larr;</button>
            <img src="${src}" alt="${description}">
            <button class="lightbox-arrow lightbox-arrow--right">&rarr;</button>
            <div class="lightbox-index">${index + 1} / ${images.length}</div>
        </div>
    `, {
        onShow: (instance) => {
            const closeButton = instance.element().querySelector('.lightbox-close');
            const leftArrow = instance.element().querySelector('.lightbox-arrow--left');
            const rightArrow = instance.element().querySelector('.lightbox-arrow--right');
            
            closeButton.addEventListener('click', () => {
                instance.close();
            });
            
            leftArrow.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightbox(images[currentIndex].original, images[currentIndex].description, currentIndex);
            });

            rightArrow.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateLightbox(images[currentIndex].original, images[currentIndex].description, currentIndex);
            });
        }
    });
    instance.show();
}

function updateLightbox(src, description, index) {
    const img = instance.element().querySelector('img');
    const indexDisplay = instance.element().querySelector('.lightbox-index');
    img.src = src;
    img.alt = description;
    indexDisplay.textContent = `${index + 1} / ${images.length}`;
}
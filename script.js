// Get all gallery elements
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const counter = document.getElementById("counter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Store image information
const cars = Array.from(galleryItems).map(item => ({
    src: item.querySelector("img").src,
    alt: item.querySelector("img").alt,
    caption: item.querySelector(".caption").textContent
}));

let currentIndex = 0;

// Open lightbox
function openLightbox(index) {
    currentIndex = index;

    showImage();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

    closeBtn.focus();
}

// Display selected image
function showImage() {
    const car = cars[currentIndex];

    lightboxImg.src = car.src;
    lightboxImg.alt = car.alt;

    lightboxCaption.textContent = car.caption;

    counter.textContent =
        `${currentIndex + 1} / ${cars.length}`;
}

// Show next image
function nextImage() {
    currentIndex = (currentIndex + 1) % cars.length;

    showImage();
}

// Show previous image
function prevImage() {
    currentIndex =
        (currentIndex - 1 + cars.length) % cars.length;

    showImage();
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

// Open image when clicked
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        openLightbox(index);
    });
});

// Navigation button events
nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", prevImage);

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextImage();
    } else if (event.key === "ArrowLeft") {
        prevImage();
    } else if (event.key === "Escape") {
        closeLightbox();
    }
});
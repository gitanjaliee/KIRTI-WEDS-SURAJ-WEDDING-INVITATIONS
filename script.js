
/* =========================================
   WEDDING COUNTDOWN
========================================= */

const weddingDate = new Date("December 9, 2026 18:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!days || !hours || !minutes || !seconds) return;

    if (difference <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        return;
    }

    days.textContent = String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");

    hours.textContent = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");

    minutes.textContent = String(
        Math.floor((difference / (1000 * 60)) % 60)
    ).padStart(2, "0");

    seconds.textContent = String(
        Math.floor((difference / 1000) % 60)
    ).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        menuBtn.textContent =
            navLinks.classList.contains("active") ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuBtn.textContent = "☰";
        });
    });
}


/* =========================================
   EVENT DETAILS
========================================= */

const eventData = {
    mata: {
        title: "Mata Pujan",
        date: "08 December 2026 · Morning",
        description:
            "The wedding celebrations begin with Mata Pujan, seeking blessings and starting this beautiful journey with our families."
    },

    haldi: {
        title: "Haldi",
        date: "08 December 2026 · After Mata Pujan",
        description:
            "A joyful family celebration filled with laughter, blessings, happiness and beautiful moments before the wedding."
    },

    mehndi: {
        title: "Mehndi",
        date: "08 December 2026 · Evening",
        description:
            "An evening filled with mehndi, music, laughter and the warmth of family and friends."
    },

    sangeet: {
        title: "Mahila Sangeet",
        date: "08 December 2026 · Evening",
        description:
            "A celebration of music, dance and performances as our loved ones come together to celebrate the couple."
    },

    mandap: {
        title: "Mandap",
        date: "08 December 2026 · Evening",
        description:
            "A special family gathering around the mandap as everyone comes together before the main wedding day."
    },

    wedding: {
        title: "Main Wedding Day",
        date: "09 December 2026 · 6:00 PM onwards",
        description:
            "The main celebration at Arora Bhavan, Indore — bringing together the wedding ceremony, sacred pheras, reception and dinner."
    }
};


/* =========================================
   EVENT MODAL
========================================= */

const eventModal = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

function closeEventModal() {
    if (!eventModal) return;

    eventModal.classList.remove("active");
    eventModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.querySelectorAll(".event-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const event = eventData[this.dataset.event];

        if (!event || !eventModal) return;

        modalTitle.textContent = event.title;
        modalDate.textContent = event.date;
        modalDescription.textContent = event.description;

        eventModal.classList.add("active");
        eventModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

if (modalClose) {
    modalClose.addEventListener("click", closeEventModal);
}

if (modalOk) {
    modalOk.addEventListener("click", closeEventModal);
}

if (eventModal) {
    eventModal.addEventListener("click", function (event) {
        if (event.target === eventModal) {
            closeEventModal();
        }
    });
}


/* =========================================
   VENUE DETAILS
========================================= */

const venueInfoBtn = document.getElementById("venueInfoBtn");

if (venueInfoBtn) {
    venueInfoBtn.addEventListener("click", function () {
        if (!eventModal) return;

        modalTitle.textContent = "Arora Bhavan";
        modalDate.textContent = "Indore · Main Wedding Venue";

        modalDescription.textContent =
            "Arora Bhavan is the main venue for the wedding day, " +
            "where the families will come together for the wedding " +
            "ceremony, pheras, reception and dinner.";

        eventModal.classList.add("active");
        eventModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
}


/* =========================================
   PHOTO GALLERY
========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCounter = document.getElementById("lightboxCounter");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;
let previousBodyOverflow = "";

const galleryImages = Array.from(galleryItems)
    .map(function (item) {
        const image = item.querySelector("img");
        return image ? image.src : "";
    })
    .filter(Boolean);


/* SHOW CURRENT IMAGE */

function showGalleryImage() {
    if (!lightboxImage || galleryImages.length === 0) return;

    lightboxImage.src = galleryImages[currentImageIndex];

    lightboxImage.alt =
        "Wedding gallery photo " + (currentImageIndex + 1);

    if (lightboxCounter) {
        lightboxCounter.textContent =
            (currentImageIndex + 1) + " / " + galleryImages.length;
    }
}


/* OPEN LIGHTBOX */

function openLightbox(index) {
    if (!lightbox || !lightboxImage || galleryImages.length === 0) {
        return;
    }

    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    previousBodyOverflow = document.body.style.overflow;

    showGalleryImage();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (lightboxClose) {
        lightboxClose.focus();
    }
}


/* NEXT IMAGE */

function nextGalleryImage() {
    if (galleryImages.length === 0) return;

    currentImageIndex =
        (currentImageIndex + 1) % galleryImages.length;

    showGalleryImage();
}


/* PREVIOUS IMAGE */

function previousGalleryImage() {
    if (galleryImages.length === 0) return;

    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) %
        galleryImages.length;

    showGalleryImage();
}


/* CLOSE LIGHTBOX */

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    if (lightboxImage) {
        lightboxImage.src = "";
    }

    document.body.style.overflow = previousBodyOverflow;

    if (galleryItems[currentImageIndex]) {
        galleryItems[currentImageIndex].focus();
    }
}


/* GALLERY BUTTONS */

galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
        openLightbox(index);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", nextGalleryImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener("click", previousGalleryImage);
}


/* CLOSE ON BACKGROUND CLICK */

if (lightbox) {
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", function (event) {

    if (lightbox && lightbox.classList.contains("active")) {

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextGalleryImage();
        }

        if (event.key === "ArrowLeft") {
            previousGalleryImage();
        }

        return;
    }

    if (
        event.key === "Escape" &&
        eventModal &&
        eventModal.classList.contains("active")
    ) {
        closeEventModal();
    }
});

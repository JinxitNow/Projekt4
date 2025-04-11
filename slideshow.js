let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;
const imagesPerPage = 4;

//Lave for-loop, som consol-logger alle billeder ud.
for (let i = 0; i < totalImages; i++) {
    console.log(images[i]);
}


// Funktion til at opdatere karousellen og vise de korrekte billeder
function updateCarousel() {
    const offset = -currentIndex * (100 / imagesPerPage);
    document.querySelector('.carousel').style.transition = "transform 0.5s ease";
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

// Funktion til at vise næste gruppe billeder, starte forfra
function nextImage() {
        if (currentIndex < Math.ceil(totalImages / imagesPerPage) - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
        }
    updateCarousel();
}

// Funktion til at vise forrige gruppe billeder
function previousImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = Math.floor(totalImages / imagesPerPage) - 1;
    }
    updateCarousel();
}

// Event listeners for knapperne
document.querySelector('.previous').addEventListener('click', previousImage);
document.querySelector('.next').addEventListener('click', nextImage);

// Start automatisk skift af billeder hvert 5. sekund
setInterval(nextImage, 5000);

// Initialiser karousellen ved at vise første billede
updateCarousel();

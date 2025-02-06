//your code here
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];
let selectedImages = [];
let duplicateImage = '';
const imageContainer = document.getElementById('image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const messagePara = document.getElementById('para');

function shuffleImages() {
    const shuffledImages = [...images];
    duplicateImage = shuffledImages[Math.floor(Math.random() * shuffledImages.length)];
    shuffledImages.push(duplicateImage);
    return shuffledImages.sort(() => Math.random() - 0.5);
}

function displayImages() {
    const shuffledImages = shuffleImages();
    imageContainer.innerHTML = '';
    shuffledImages.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Image';
        img.addEventListener('click', () => selectImage(img, src));
        imageContainer.appendChild(img);
    });
}

function selectImage(img, src) {
    if (selectedImages.length < 2 && !selectedImages.includes(src)) {
        img.classList.add('selected');
        selectedImages.push(src);
        resetButton.style.display = 'block';
    }
    if (selectedImages.length === 2) {
        verifyButton.style.display = 'block';
    }
}

resetButton.addEventListener('click', () => {
    selectedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    messagePara.textContent = '';
    const selectedImgs = document.querySelectorAll('img.selected');
    selectedImgs.forEach(img => img.classList.remove('selected'));
});

verifyButton.addEventListener('click', () => {
    if (selectedImages[0] === selectedImages[1]) {
        messagePara.textContent = "You are a human. Congratulations!";
    } else {
        messagePara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = 'none';
});

window.onload = displayImages;

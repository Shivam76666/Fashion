const colorOptions = document.querySelectorAll('.color');
const imageSets = document.querySelectorAll('.image-set');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

let currentIndex = 0;

// Function to show only one image in active image set
function showImage(index) {
  const activeSet = document.querySelector('.image-set.active');
  if (!activeSet) return;
  
  const images = activeSet.querySelectorAll('img');
  images.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
}

// Handle color click
colorOptions.forEach(color => {
  color.addEventListener('click', () => {
    // Remove previous selection
    colorOptions.forEach(c => c.classList.remove('selected'));
    color.classList.add('selected');

    // Find color class name
    const selectedColor = [...color.classList].find(cls =>
      ['grey', 'black', 'red', 'blue'].includes(cls)
    );

    // Switch image set
    imageSets.forEach(set => set.classList.remove('active'));
    const activeSet = document.querySelector(`.image-set.${selectedColor}`);
    if (activeSet) {
      activeSet.classList.add('active');
      currentIndex = 0;
      showImage(currentIndex);
    }
  });
});

// Carousel controls
prevButton.addEventListener('click', () => {
  const activeSet = document.querySelector('.image-set.active');
  const images = activeSet ? activeSet.querySelectorAll('img') : [];
  if (images.length === 0) return;

  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
  const activeSet = document.querySelector('.image-set.active');
  const images = activeSet ? activeSet.querySelectorAll('img') : [];
  if (images.length === 0) return;

  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// Size button selection
const sizeButtons = document.querySelectorAll('.sizes button');
sizeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Show the first image initially
showImage(currentIndex);



const hero_images = document.querySelector('#hero_images');
const img_1st = document.querySelector('#img_1st');
const img_2nd = document.querySelector('#img_2nd');
const img_3rd = document.querySelector('#img_3rd');
const img_4th = document.querySelector('#img_4th');
let state = 0; // Variable to track the current color state

setInterval(() => {
  state++; // Increment the state variable
  console.log(`in interval state: ${state}`);

  // Determine the background color and image based on the current state
  if (state === 1) {
    hero_images.style.backgroundColor = "#bc382e"; // First color
    
    img_1st.src = '/images/cooking_card.png';
    img_2nd.src = '/images/spoon_1.png';
    img_3rd.src = '/images/spoon_2.png';
    img_4th.src = '/images/spoon_3.png';

    img_1st.onload = function() {
      // Apply transformations after the image is fully loaded
      
      img_1st.style.opacity = "1";
    };

    console.log(`in IFFF state: ${state}`);
  } else if (state === 2) {
    hero_images.style.backgroundColor = "#388d80"; // Second color
    // resetImageTransform(); // Optionally reset the image if needed
  } else {
    hero_images.style.backgroundColor = "#4583aa"; // Third color
    state = 0; // Reset the state
    // resetImageTransform(); // Optionally reset the image if needed
  }
}, 4000);

// Helper function to reset the image's transform and opacity (optional)
function resetImageTransform() {
  img_1st.style.transform = 'translate-y(80%)'; // Reset the transformation (or set to initial state)
  img_1st.style.opacity = "0"; // Hide the image initially
}

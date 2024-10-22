const hero_images = document.querySelector('#hero_images');

let state = 0; // Variable to track the current color state

setInterval(() => {
  state++; // Increment the state variable
  console.log(`in interval state: ${state}`);

  // Determine the background color based on the current state
  if (state === 1) {
    hero_images.style.backgroundColor = "#bc382e"; // First color
   
    console.log(`in IFFF state: ${state}`);
  } else if (state === 2) {
    hero_images.style.backgroundColor = "#388d80"; // Second color
  } else {
    hero_images.style.backgroundColor = "#4583aa"; // Third color (new color)
    if (state === 3) {
      state = 0; // Reset the state after the third color
    }
  }
}, 4000);


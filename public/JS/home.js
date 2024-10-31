const hero_images = document.querySelector("#hero_images");
const img_div_1st = document.querySelector("#img_div_1st");
const img_div_2nd = document.querySelector("#img_div_2nd");
const img_div_3rd = document.querySelector("#img_div_3rd");
const img_1st = document.querySelector("#img_1st");
const img_2nd = document.querySelector("#img_2nd");
const img_3rd = document.querySelector("#img_3rd");
const img_4th = document.querySelector("#img_4th");
const img_5th = document.querySelector("#img_5th");
const img_6th = document.querySelector("#img_6th");
const img_7th = document.querySelector("#img_7th");
const img_8th = document.querySelector("#img_8th");

    // Blue Part

const img_2nd_blue = document.querySelector("#img_2nd_blue");
const img_3rd_blue = document.querySelector("#img_3rd_blue");
const img_4th_blue = document.querySelector("#img_4th_blue");
const img_5th_blue = document.querySelector("#img_5th_blue");
const img_6th_blue = document.querySelector("#img_6th_blue");
const img_7th_blue = document.querySelector("#img_7th_blue");
const img_8th_blue = document.querySelector("#img_8th_blue");
const img_1st_blue = document.querySelector("#img_1st_blue");

    // Green Part 

    const img_2nd_green = document.querySelector("#img_2nd_green");
    const img_3rd_green = document.querySelector("#img_3rd_green");
    const img_4th_green = document.querySelector("#img_4th_green");
    const img_5th_green = document.querySelector("#img_5th_green");
    const img_6th_green = document.querySelector("#img_6th_green");
    const img_7th_green = document.querySelector("#img_7th_green");
    const img_8th_green = document.querySelector("#img_8th_green");
    const img_1st_green = document.querySelector("#img_1st_green");

let state = 0; // Variable to track the current color state

setInterval(() => {
  state++; // Increment the state variable
  console.log(`in interval state: ${state}`);

  // Determine the background color and image based on the current state
  if (state === 1) {
    hero_images.style.backgroundColor = "#bc382e"; // First color
    img_div_1st.style.display='flex'
    img_div_2nd.style.display='none'

    img_1st.src = "/images/cooking_card.png";
    img_2nd.src = "/images/spoon_1.png";
    img_3rd.src = "/images/spoon_2.png";
    img_4th.src = "/images/spoon_3.png";
    img_5th.src = "/images/spoon_4.png";
    img_6th.src = "/images/spoon_5.png";
    img_7th.src = "/images/spoon_6.png";
    img_8th.src = "/images/spoon_7.png";

    img_1st.onload = function () {
      // Apply transformations after the image is fully loaded

      img_1st.style.opacity = "1";
      img_2nd.style.opacity = "1";
      img_3rd.style.opacity = "1";
      img_4th.style.opacity = "1";
      img_5th.style.opacity = "1";
      img_6th.style.opacity = "1";
      img_7th.style.opacity = "1";
      img_8th.style.opacity = "1";
    };

    console.log(`in IFFF state: ${state}`);
  } else if (state === 2) {
    hero_images.style.backgroundColor = "#388d80"; // Second color
    resetImageTransform(); 
     
  } else {
    hero_images.style.backgroundColor = "#4583aa"; // Third color
    state = 0; // Reset the state
    // resetImageTransform(); 
    img_div_1st.style.display='none'
    img_div_2nd.style.display='flex'
    resetImageTransform(); 
    img_1st_blue.src = "/images/blue_fan_7.png";
    img_2nd_blue.src = "/images/blue_fan_1.png";
    img_3rd_blue.src = "/images/blue_fan_2.png";
    img_4th_blue.src = "/images/blue_fan_3.png";
    img_5th_blue.src = "/images/blue_fan_4.png";
    img_6th_blue.src = "/images/blue_fan_5.png";
    img_7th_blue.src = "/images/blue_fan_6.png";

    img_1st_blue.onload = function () {
      // Apply transformations after the image is fully loaded

      img_1st_blue.style.opacity = "1";
      img_2nd_blue.style.opacity = "1";
      img_3rd_blue.style.opacity = "1";
      img_4th_blue.style.opacity = "1";
      img_5th_blue.style.opacity = "1";
      img_6th_blue.style.opacity = "1";
    };
  }
}, 4000);

// Helper function to reset the image's transform and opacity (optional)
function resetImageTransform() {
  img_1st.style.transform = "translate-y(80%)"; // Reset the transformation (or set to initial state)
  img_1st.style.opacity = "0"; // Hide the image initially
  img_2nd.style.transform = "translate-y(80%)";
  img_2nd.style.opacity = "0";
  img_3rd.style.transform = "translate-y(80%)";
  img_3rd.style.opacity = "0";
  img_4th.style.transform = "translate-y(80%)";
  img_4th.style.opacity = "0";
  img_5th.style.transform = "translate-y(80%)";
  img_5th.style.opacity = "0";
  img_6th.style.transform = "translate-y(80%)";
  img_6th.style.opacity = "0";
  img_7th.style.transform = "translate-y(80%)";
  img_7th.style.opacity = "0";
  img_8th.style.transform = "translate-y(80%)";
  img_8th.style.opacity = "0";
}

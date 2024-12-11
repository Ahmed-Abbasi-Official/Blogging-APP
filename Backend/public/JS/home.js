const hero_images = document.querySelector("#hero_images");
const img_div_1st = document.querySelector("#img_div_1st");
const img_div_2nd = document.querySelector("#img_div_2nd");
const img_div_3rd = document.querySelector("#img_div_3rd");


// Green Part

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
const img_9th_green = document.querySelector("#img_9th_green");
const img_1st_green = document.querySelector("#img_1st_green");

// Set the src to trigger the loading

let state = 0; // Variable to track the current color state

setInterval(() => {
  state++; // Increment the state variable

  // Determine the background color and image based on the current state

  if (state === 1) {
    hero_images.style.backgroundColor = "#bc382e";
    img_div_1st.style.display = "flex";
    img_div_2nd.style.display = "none";
    img_div_3rd.style.display = "none";

    img_1st.src = "/images/cooking_card.png";
   
    
    img_2nd.src = "/images/spoon_1.png";
    img_3rd.src = "/images/spoon_2.png";
    img_4th.src = "/images/spoon_3.png";
    img_5th.src = "/images/spoon_4.png";
    img_6th.src = "/images/spoon_5.png";
    img_7th.src = "/images/spoon_6.png";
    img_8th.src = "/images/spoon_7.png";
   
  } else if (state === 2) {
    hero_images.style.backgroundColor = "#388d80"; // Second color
    img_div_1st.style.display = "none";
    img_div_2nd.style.display = "none";
    img_div_3rd.style.display = "flex";

    img_1st_green.src = "/images/green_9.png";
    img_2nd_green.src = "/images/green_1.png";
    img_3rd_green.src = "/images/green_2.png";
    img_4th_green.src = "/images/green_3.png";
    img_5th_green.src = "/images/green_4.png";
    img_6th_green.src = "/images/green_5.png";
    img_7th_green.src = "/images/green_6.png";
    img_8th_green.src = "/images/green_7.png";
    img_9th_green.src = "/images/green_8.png";
  } else {
    hero_images.style.backgroundColor = "#4583aa"; // Third 
    state = 0; // Reset the state
    img_div_1st.style.display = "none";
    img_div_2nd.style.display = "flex";
    img_div_3rd.style.display = "none";
    img_1st_blue.src = "/images/blue_fan_7.png";
    img_2nd_blue.src = "/images/blue_fan_1.png";
    img_3rd_blue.src = "/images/blue_fan_2.png";
    img_4th_blue.src = "/images/blue_fan_3.png";
    img_5th_blue.src = "/images/blue_fan_4.png";
    img_6th_blue.src = "/images/blue_fan_5.png";
    img_7th_blue.src = "/images/blue_fan_6.png";
  }
}, 2200);


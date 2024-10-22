// random backGround Options 
let backgroundOption = true;

//variable to control interval
let backgroundInterval;

//check if there is local storage color option
let mainColors = localStorage.getItem("color_option");
//console.log(mainColors);
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  //check for active class
  document.querySelectorAll(".colors-list li").forEach(ele => {
    ele.classList.remove("active");

    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });

}

//check if there is local storage random background Item
let backgroundLocalItems = localStorage.getItem("background_option");

//check if random background local storage is not Empty

if (backgroundLocalItems !== null) {
  if (backgroundLocalItems === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  if (backgroundLocalItems === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".yes").classList.remove("active");
    document.querySelector(".random-background .no").classList.add("active");
  }
}



//toggle spin class on icon
document.querySelector(".toggle-setting .fa-gear").onclick = function() {
  //toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  //toggle class open on main box
  document.querySelector(".setting-box").classList.toggle("open");

};

//Switch Colors

const colorsLi = document.querySelectorAll(".colors-list li");
let lis = document.querySelector(".colors-list li");

colorsLi.forEach((li) => {

  li.addEventListener("click", (e) => {
    //set Color on root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);


    //set Color on Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

  });


  //remove and add active
  li.addEventListener("click", function() {
    colorsLi.forEach(e => {
      e.classList.remove("active");
      this.classList.add("active");
    });
  });
});

//switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

//loop on all spans
randomBackEl.forEach(span => {
  span.addEventListener("click", function(ele) {
    randomBackEl.forEach(e => {
      e.classList.remove("active");
      this.classList.add("active");
    });
    if (ele.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//select landing page Element

let landingPage = document.querySelector(".landing-page");

//Get Array Of images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


//function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //change background image Url
      landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';

    }, 1000);
  }
}


randomizeImgs();


//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {

  //skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  //skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //window height
  let windowHeight = this.innerHeight;

  //window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = "0px";
    });
  }
};

//create PopUp with Images
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {

  img.addEventListener("click", (e) => {
    //create Overlay Element
    let overlay = document.createElement("div");

    //add class to overlay
    overlay.className = "popup-overlay";

    //append overlay to body
    document.body.appendChild(overlay);

    //create popup
    let popupBox = document.createElement("div");

    //add class To popupBox
    popupBox.className = "popup-box";

    if (img.alt !== null) {

      //create Heading
      let imageHeading = document.createElement("h3");

      //create Text For Heading
      let imageText = document.createTextNode(img.alt);

      //append Text For Heading
      imageHeading.appendChild(imageText);

      popupBox.appendChild(imageHeading);

    }

    //create The image
    let popupImages = document.createElement("img");
    //set image source
    popupImages.src = img.src;
    //add image to popup Box
    popupBox.appendChild(popupImages);

    //append popup box to body
    document.body.appendChild(popupBox);

    //create Close span 
    let CloseButton = document.createElement("span");

    //create the Close Button Text 
    let buttonText = document.createTextNode("X");

    //append Text To The button 
    CloseButton.appendChild(buttonText);

    //add Class To Close Button 
    CloseButton.className = "close-button";

    //add Close Button To Popup Box
    popupBox.appendChild(CloseButton);

  });

});

//close popup
document.addEventListener("click", function(e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();

    //remove Overlay
    document.querySelector(".popup-overlay").remove();

  }
});

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function(e) {
      e.preventDefault();
      let choose = document.querySelector(e.target.dataset.section);
      choose.scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");

  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", function(e) {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    };
  });
  span.addEventListener("click", function() {
    bulletsSpan.forEach((e) => {
      e.classList.remove("active");
      this.classList.add("active");
    });
  });
});

//reset buttons
let button = document.querySelector(".setting-box .reset-options");

button.onclick = function() {
  //localStorage.clear();

  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  window.location.reload();

};

//toggle menu

let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleButton.onclick = function(e) {
  //stop propgation
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tLinks.classList.toggle("open");

};

//click any where outSide menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== tLinks) {
    // check if menu is open
    if (tLinks.classList.contains("open")) {
      toggleButton.classList.toggle("menu-active");

      tLinks.classList.toggle("open");
    }
  }
});

//stop propgation on the menu

tLinks.onclick = function(e) {
  e.stopPropagation();
};

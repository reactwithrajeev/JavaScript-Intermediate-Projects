const sliderBox = document.querySelector("#slider");
const cards = document.querySelectorAll(".card");
const leftBtn = document.querySelector(".scroll-left");
const rightBtn = document.querySelector(".scroll-right");

let firstCardWidth = sliderBox.querySelector(".card").offsetWidth;
let sliderChildrens = [...sliderBox.children];
let cardperview = Math.round(sliderBox.offsetWidth / firstCardWidth);

const initializeSlider = () => {
  sliderChildrens
    .slice(-cardperview)
    .reverse()
    .forEach((card) => {
      sliderBox.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  sliderChildrens.slice(0, cardperview).forEach((card) => {
    sliderBox.insertAdjacentHTML("beforeend", card.outerHTML);
  });
};

let scrollLeft = () => {
  let scrollAmount = firstCardWidth * cardperview;
  sliderBox.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
};

let scrollRight = () => {
  let scrollAmount = (firstCardWidth * cardperview) / 4;
  sliderBox.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

let infiniteScroll = () => {
  const tolerance = 1;
  if (sliderBox.scrollLeft <= tolerance) {
    sliderBox.classList.add("noTransition");
    sliderBox.scrollLeft =
      sliderBox.scrollWidth -
      sliderBox.offsetWidth -
      firstCardWidth * cardperview;
    sliderBox.classList.remove("noTransition");
  } else if (
    sliderBox.scrollLeft >=
    sliderBox.scrollWidth - sliderBox.offsetWidth - tolerance
  ) {
    sliderBox.classList.add("noTransition");
    sliderBox.scrollLeft = firstCardWidth * cardperview;
    sliderBox.classList.remove("noTransition");
  }
};

leftBtn.addEventListener("click", () => {
  scrollLeft();
});

rightBtn.addEventListener("click", () => {
  scrollRight();
});

// Scroll event
sliderBox.addEventListener("scroll", () => {
  infiniteScroll();
});

initializeSlider();

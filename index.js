let circular = document.querySelector(".circular");
let double = document.querySelector(".double");
let single = document.querySelector(".single");
let queue = document.querySelector(".queue");
let stack = document.querySelector(".stack");
let set = document.querySelector(".set");
let cards = document.querySelector(".cards");
let cardsItems = document.querySelectorAll(".cards__item");
let cardsItemsArray = [...cardsItems];

let array = createArray(circular, double, single, queue, stack, set);

cards.addEventListener("click", (event) => {
  let target = event.target;
  for (let value of array) {
    value.setAttribute("hidden", "hidden");
  }
  for (let card of cardsItemsArray) {
    card.classList.remove("selected");
  }
  if (target.tagName === "LI") {
    for (let item of array) {
      if (item.className === target.id) {
        item.removeAttribute("hidden");
        target.classList.add("selected");
      }
    }
  }
});

function createArray(...args) {
  return Array.from(args);
}

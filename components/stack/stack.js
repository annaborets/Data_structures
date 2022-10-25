const input = document.querySelector(".input__item");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const containerForItems = document.querySelector(".list");

class Stack {
  constructor(elements) {
    this.elements = Array.isArray(elements) ? elements : [];
  }

  addItem(item) {
    if (this.getSize() >= 10) {
      alert("Too much items!");
    }
    return this.elements.push(item);
  }

  popItem() {
    return this.elements.pop();
  }

  getLastItem() {
    return this.elements[this.getSize(this.elements) - 1];
  }

  isEmpty() {
    return this.getSize() === 0;
  }

  getSize() {
    return this.elements.length;
  }

  print() {
    console.log(this.elements);
  }

  renderItems() {
    containerForItems.innerHTML = "";
    this.elements.map((item) => {
      const stackItem = document.createElement("li");
      stackItem.classList.add("list__item");
      stackItem.innerText = item;
      containerForItems.appendChild(stackItem);
    });
    if (this.elements.lenght === 0) {
      containerForItems.classList.add("list_empty");
    } else {
      containerForItems.classList.remove("list_empty");
    }
  }
}

let stack = new Stack();

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    stack.addItem(text);
    stack.renderItems();
    input.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  stack.popItem();
  stack.renderItems();
});

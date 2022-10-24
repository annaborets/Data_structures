const input = document.querySelector(".input__item");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const containerForItems = document.querySelector(".list");

class Queue {
  constructor(elements) {
    this.elements = Array.isArray(elements) ? elements : [];
  }

  addItem(item) {
    if (this.getSize() >= 10) {
      alert("Too much items!");
    }
    return this.elements.push(item);
  }

  deleteItem() {
    return this.elements.shift();
  }

  getFrontItem() {
    return this.elements[0];
  }

  getSize() {
    return this.elements.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }

  print() {
    console.log(this.elements);
  }

  renderItems() {
    containerForItems.classList.remove("list_empty");
    containerForItems.innerHTML = "";
    this.elements.map((item) => {
      const queueItem = document.createElement("li");
      queueItem.classList.add("list__item");
      queueItem.innerText = item;
      containerForItems.appendChild(queueItem);
    });
    if (this.elements.length === 0) {
      containerForItems.classList.add("list_empty");
    }
  }
}

let queue = new Queue();

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    queue.addItem(text);
    queue.renderItems();
    input.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  queue.deleteItem();
  queue.renderItems();
});

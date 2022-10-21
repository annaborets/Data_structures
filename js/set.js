const input = document.querySelector(".input__item");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");

class Set {
  constructor(elements) {
    this.elements = Array.isArray(elements) ? elements : [];
  }

  addItem(item) {
    if (this.getSize() >= 10) {
      alert("Too much items!");
    }
    if (this.elements.includes(item)) {
      alert("Item must be unique!");
    } else {
      return this.elements.push(item);
    }
  }

  hasItem(item) {
    return this.elements.includes(item);
  }

  deleteItem(item) {
    let index = this.elements.indexOf(item);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
    return this.elements;
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
    list.innerHTML = "";
    const containerForItems = document.createElement("ol");
    containerForItems.classList.add("list");
    this.elements.map((item) => {
      const setItem = document.createElement("li");
      setItem.classList.add("list__item");
      setItem.innerText = item;
      containerForItems.appendChild(setItem);
    });
    list.appendChild(containerForItems);
  }
}

let set = new Set();
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    set.addItem(text);
    set.renderItems();
    input.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  set.deleteItem(input.value);
  input.value = "";
  set.renderItems();
});

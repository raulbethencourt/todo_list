import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const todoList = new ToDoList();

// Launch app
document.addEventListener("readystatechange", (evt) => {
	if (evt.target.readyState === "complete") {
		initApp();
	}
});

const initApp = () => {
	// Add listeners

	// Procedural
	// Load list object
	refreshThePage();
};

const refreshThePage = () => {
	clearListDisplay();
	renderList();
	// clearItemEntryField();
	// setFocusOnItemEntry();
};

const clearListDisplay = () => {
	const parentElement = document.getElementById("listItems");
	deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
	let child = parentElement.lastElementChild;
	while (child) {
		parentElement.removeChild(child);
		child = parentElement.lastElementChild;
	}
};

const renderList = () => {
	const list = todoList.getList();
	list.forEach((item) => {
		buildListItem(item);
	});
};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.tabIndex = 0;

    const label = document.createElement("label");
    labe
};

// TODO 1:07:00

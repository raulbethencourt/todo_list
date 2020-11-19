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
	const itemEntryForm = document.getElementById("itemEntryForm");
	itemEntryForm.addEventListener("submit", (evt) => {
		evt.preventDefault();
		processSubmission();
	});

	const clearItems = document.getElementById("clearItems");
	clearItems.addEventListener("click", (evt) => {
		const list = todoList.getList();
		if (list.length) {
			const confirmed = confirm(
				"Are you sure you want to clear the entire list?"
			);
			if (confirmed) {
				todoList.clearList();
				updatePersistentData(todoList.getList());
				refreshThePage();
			}
		}
	});

	// Procedural
	loadListObject();
	refreshThePage();
};

const loadListObject = () => {
	const storedList = localStorage.getItem("myToDoList");
	if (typeof storedList !== "string") return;
	const parsedList = JSON.parse(storedList);
	parsedList.forEach((itemObj) => {
		const newToDoItem = createNewItem(itemObj._id, itemObj._item);
		todoList.addItemToList(newToDoItem);
	});
};

const refreshThePage = () => {
	clearListDisplay();
	renderList();
	clearItemEntryField();
	setFocusOnItemEntry();
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
	checkbox.id = item.getId();
	checkbox.tabIndex = 0;

	addClickListenerToCheckbox(checkbox);

	const label = document.createElement("label");
	label.htmlFor = item.getId();
	label.textContent = item.getItem();
	div.appendChild(checkbox);
	div.appendChild(label);

	const container = document.getElementById("listItems");
	container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
	checkbox.addEventListener("click", (evt) => {
		todoList.removeItemFromList(checkbox.id);
		updatePersistentData(todoList.getList());
		const removedText = getLabelText(checkbox.id);
		updateScreenReaderConfirmation(removedText, "removed from list");
		setTimeout(() => {
			refreshThePage();
		}, 1000);
	});
};

const getLabelText = (checkboxId) => {
	return document.getElementById(checkboxId).nextElementSibling.textContent;
};

const updatePersistentData = (listArray) => {
	localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const clearItemEntryField = () => {
	document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
	document.getElementById("newItem").focus();
};

const processSubmission = () => {
	const newEntryText = getNewEntry();
	if (!newEntryText.length) return;
	const nextItemId = calcNextItemId();
	const todoItem = createNewItem(nextItemId, newEntryText);
	todoList.addItemToList(todoItem);
	updatePersistentData(todoList.getList());
	updateScreenReaderConfirmation(newEntryText, "added");
	refreshThePage();
};

const getNewEntry = () => {
	return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
	let nextItemId = 1;
	const list = todoList.getList();
	if (list.length > 0) {
		nextItemId = list[list.length - 1].getId() + 1;
	}
	return nextItemId;
};

const createNewItem = (itemId, itemText) => {
	const todo = new ToDoItem();
	todo.setId(itemId);
	todo.setItem(itemText);
	return todo;
};

const updateScreenReaderConfirmation = (newEntryText, actionVerb) => {
	document.getElementById(
		"confirmation"
	).textContent = `${newEntryText} ${actionVerb}.`;
};

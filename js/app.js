"use strict";

const root = document.querySelector("#root");

const UI = {
	title: document.createElement("h1"),
	subTitle : document.createElement("p"),
	form : document.createElement("form"),
	screenBlock: document.createElement("div"),
	screenInput: document.createElement("input"),
	screenAddBtn: document.createElement("button"),
	listsBlock: document.createElement("div"),

	elementOptions () {
		this.title.textContent = "CRUD";
		this.subTitle.textContent = "Asyn Application"

		this.form.id = "app-form";
		this.screenBlock.id = "screenBlock";
		this.screenInput.type = "text";
		this.screenInput.placeholder = "Type here...";
		this.screenAddBtn.textContent = "ADD";
		this.screenAddBtn.id = "screenAddBtn";
		this.listsBlock.id = "listBlock";
	},

	appendElements () {
		root.append(this.title, this.subTitle, this.form, this.listsBlock);
		this.form.append(this.screenBlock);
		this.screenBlock.append(this.screenInput, this.screenAddBtn);
	},

	start () {
		this.elementOptions();
		this.appendElements();
	}
}

UI.start();

/* 
	Ստեղծել 4 ֆունցկիա հետևյալ անուններով՝ GET, POST, PUT, DELETE ու անել այնպես
	որպեսզի էդ 4 ֆունկցիաները առանց որևիցէ խնդրի աշխատեն մեր տվյալների բազայի ու
	ամենակարևորը մեր UI-ի հետ
	Հ․Գ․ CSS-ում փոխել եմ բոլոր կլասներն ու այդիները, որպեսզի հին կոդի հետ չաշխատեն
*/

const url = "http://localhost:8888/todos/";

// function GET

function GET() {
	fetch(url)
		.then(data => data.json())
		.then(data => {
			data.forEach(todoObj => {

			UI.listsBlock.innerHTML += `
				<div class="listsBlockItem">
				<div class="listsBlockItemContent">
				<span>${todoObj.id}</span>
				<input type="text" value="${todoObj.title}" readonly class="edit">
				</div>
                
				<div class="buttons">
				<button class="removeBtn">Delete</button>
				<button class="editBtn">Edit</button>
				<button class="saveBtn">Save</button>
					</div>
					</div>
				`;
			});
		});
}
GET();

// function POST

function POST () {
	UI.form.addEventListener("submit", function (event) {
		event.preventDefault();
		const val = UI.screenInput.value.trim();

		if (val !== "") {
			fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({title: val})
			});
		}

		this.reset();
	});
}
POST();

// function PUT

function PUT () {
	fetch(url)
	.then(data =>  data.json())
	.then(data => {
		const editButton = document.querySelectorAll(".editBtn");
		const saveButton = document.querySelectorAll(".saveBtn");

		editButton.forEach((btn, index) => {
			btn.addEventListener("click", function () {
				const inputIS = this.parentElement.previousElementSibling.lastElementChild;

				inputIS.classList.add("edit");
				inputIS.removeAttribute("readonly");
					
				saveButton.forEach((saveButton, indexIs) => {
					if (index === indexIs) {
						saveButton.style.display = "inline-block";
						this.style.display = "none";
					}
					saveButton.addEventListener("click", function () {
						 data.forEach(todoObj => {
						 const fakeId = this.parentElement.previousElementSibling.firstElementChild.textContent;
						 const forEddited = this.parentElement.previousElementSibling.lastElementChild;
						
                            if (parseInt(fakeId) === todoObj.id) {
                            fetch(url + todoObj.id, {
								method: "PUT",
								headers: {
								"content-type": "application/json"
								},
								body: JSON.stringify({ title: forEddited.value.trim()})
								});
						}
					});
				});
			});
		});
	});
	return data;	
})
}

PUT();


// function Delete

function DELETE() {
	fetch(url)
		.then(data => data.json())
		.then(data => {
			const removeButtons = document.querySelectorAll(".removeBtn");
		removeButtons.forEach(btn => {
				btn.addEventListener("click", function () {
					data.forEach(todoObj => {
					const fakeId = this.parentElement.previousElementSibling.firstElementChild.textContent;

					if (parseInt(fakeId) === todoObj.id) {
						fetch(url + todoObj.id, {
							method: "DELETE",
							headers: {
								"content-type": "application/json"
							}
						});
					}
				});
			});
		});
	});
}

DELETE();



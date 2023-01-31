'use strict';

const URL = 'https://jsonplaceholder.typicode.com'

class UserList {
	#URL = URL
	#USER_URL = ''
	#users
	#user

	constructor(userUrl) {
		this.#URL += this.#USER_URL = userUrl
		this.#users = []
		this.#user = null
	}

	async getUsers() {
		const rawUsers = await fetch(this.#URL, { method: "GET" })
		this.#users = await rawUsers.json()
		this.saveToLocalstorage(this.#users)
		return this.#users
	}

	async getUserByID(id) {
		const rawUser = await fetch(`${this.#URL}/${id}`, { method: "GET" })
		this.#user = await rawUser.json()
	}

	saveToLocalstorage(users) {
		console.log('saveToLocalstorage');

		const jsonUsers = JSON.stringify(users)
		localStorage.setItem('usersList', jsonUsers)
	}

	getFromLocalstorage() {
		console.log('getFromLocalstorage');

		const users = localStorage.getItem('usersList')
		if (users === null) {
			return { msg: 'users list in localStorage is empty' }
		} else {
			return JSON.parse(users)
		}
	}
}

class App {
	constructor(userInst) {
		console.log("constructor");
		this.usersList = userInst
		this.id = document.querySelector('.id');
		this.submitOne = document.querySelector('.sub');
		this.submitAll = document.querySelector('.subAll');
		this.sort = document.querySelector('.sort');
		this.rSide = document.querySelector('.right_side');


		this.eventInit()
	}

	eventInit() {
		console.log('listenerInit');
		this.submitOne.addEventListener('click', this.handleSubmitOneClick.bind(this))
		this.submitAll.addEventListener('click', this.handleSubmitAllClick.bind(this))

		const users = this.usersList.getFromLocalstorage()
		this.createCard(users)
	}

	handleSubmitOneClick(e) {
		console.log('handleSubmitOneClick');

	}

	async handleSubmitAllClick() {
		console.log('handleSubmitAllClick');
		const usersList = await this.usersList.getUsers()

		this.createCard(usersList)
	}

	createCard(users = []) {
		console.log('createCard');

		if (Array.isArray(users)) {
			users.forEach(user => {
				const card = document.createElement('div')
				const close = document.createElement('div')
				const title = document.createElement('h2')
				const text = document.createElement('p')
				const email = document.createElement('p')

				card.classList.add('card')
				close.classList.add('close')
				title.classList.add('card_title')
				text.classList.add('card_text')
				email.classList.add('card_email')

				close.textContent = "+"
				title.textContent = user.name
				text.textContent = user.website
				email.textContent = user.email

				card.append(close)
				card.append(title)
				card.append(text)
				card.append(email)

				this.render(card)
			})
		} else {
			this.render(users.msg)
		}
	}

	render(card) {
		this.rSide.append(card)
	}

}

const userList = new UserList('/users')

const app = new App(userList)
console.log(app);



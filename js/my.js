function toDoListFromUsers() {
	const url = 'https://jsonplaceholder.typicode.com/todos'

	const myRequest = new XMLHttpRequest

	myRequest.open('GET', url)

	myRequest.setRequestHeader('Content-Type', 'application/json')
	myRequest.responseType = 'json'

	myRequest.send()

	myRequest.onload = function (event) {
		if (this.status < 300) {
			console.log('Answer received')
		} else {
			console.log('No answer')
		}
	}

	myRequest.onerror = () => 'Error'


	myRequest.onreadystatechange = function (event) {
		if (event.target.readyState === 4 && event.target.status < 300) {
			let arrUsers = myRequest.response
			let filtrUsers = []
			let listUsers = []

			for (let i = 0; i < arrUsers.length; i++) {
				filtrUsers.push(arrUsers[i])
			}

			listUsers.push(filtrUsers.filter(item => item.userId === 2).slice(0, 5))
			listUsers.push(filtrUsers.filter(item => item.userId === 4).slice(0, 5))
			listUsers.push(filtrUsers.filter(item => item.userId === 6).slice(0, 5))

			function func() {
				let body = document.querySelector('body')
				for (let i = 0; i < listUsers.length; i++) {
					let sectionList = document.createElement('section')
					body.appendChild(sectionList)

					let h2 = document.createElement('h2')
					sectionList.appendChild(h2)
					h2.innerText = `To-Do List for user № ${listUsers[i][0].userId}`

					let buttonAddNewItem = document.createElement('button')
					sectionList.appendChild(buttonAddNewItem)
					buttonAddNewItem.innerText = 'Add new Item'
					buttonAddNewItem.id = 'buttonShow'

					buttonAddNewItem.onclick = function (event) {
						div.classList.toggle('active')
					}

					let div = document.createElement('div')
					sectionList.appendChild(div)
					div.id = 'divInput'

					div.classList.toggle('active')

					let textarea = document.createElement('textarea')
					div.appendChild(textarea)
					textarea.id = 'textarea'

					let buttonAdd = document.createElement('button')
					div.appendChild(buttonAdd)
					buttonAdd.innerText = 'Add'
					buttonAdd.id = 'buttonAdd'

					let ol = document.createElement('ol')
					sectionList.appendChild(ol)

					for (let x = 0; x < listUsers[i].length; x++) {
						let li = document.createElement('li')
						ol.appendChild(li)

						let buttonRemove = document.createElement('button')
						li.appendChild(buttonRemove)
						buttonRemove.innerText = 'Remove'
						buttonRemove.id = 'buttonRemove'

						let buttonEdit = document.createElement('button')
						li.appendChild(buttonEdit)
						buttonEdit.innerText = 'Edit'
						buttonEdit.id = 'buttonEdit'

						buttonEdit.onclick = function (event) {
							inputString.disabled = false
							inputString.style.borderBottom = '1px solid black'
						}

						let inputString = document.createElement('input')
						inputString.disabled = true
						li.appendChild(inputString)
						inputString.value = `${listUsers[i][x].title}`
					}

					buttonAdd.onclick = () => {
            if (!listUsers[i].length) {
              let newObj = {
                completed: false,
                id: listUsers[i].id = 0,
                title: `${textForAddItem.value}`,
                userId: listUsers[i].userId,
              }
              listUsers[i].unshift(newObj)
              const url = 'https://jsonplaceholder.typicode.com/todos'
              fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(listUsers[i][0]),
                }).then((response) => response.json())
                .then(() => {
                  ol.innerHTML = '',
                  createInput()
                })
            } else {
              let newObjInput = {
                completed: false,
                id: listUsers[i][listUsers[i].length - 1].id + 1,
                title: `${textForAddItem.value}`,
                userId: listUsers[i][0].userId,
              }
              toDoLists[i].unshift(newObjInput)
              const url = 'https://jsonplaceholder.typicode.com/todos'
              fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(toDoLists[i][0]),
                }).then((response) => response.json())
                .then(() => {
                  list.innerHTML = '',
                  createInput()
                })
            }
          }

					// buttonAdd.onclick = function (event) {						
					// 		let li = document.createElement('li')
					// 		ol.appendChild(li)

					// 		let buttonRemove = document.createElement('button')
					// 		li.appendChild(buttonRemove)
					// 		buttonRemove.innerText = 'Remove'
					// 		buttonRemove.id = 'buttonRemove'

					// 		let buttonEdit = document.createElement('button')
					// 		li.appendChild(buttonEdit)
					// 		buttonEdit.innerText = 'Edit'
					// 		buttonEdit.id = 'buttonEdit'

					// 		buttonEdit.onclick = function (event) {
					// 			inputString.disabled = false
					// 			inputString.style.borderBottom = '1px solid black'
					// 		}

					// 		let inputString = document.createElement('input')
					// 		inputString.disabled = true
					// 		li.appendChild(inputString)
					// 		inputString.value = `${listUsers[i][x].title}`
					// }
				}
			}
			func()
		}
	}
}

toDoListFromUsers()
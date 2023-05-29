
(function(){

  let tasks = [],
  listName = ''


  //Создаем и возвращаем заголовок
function createAppTitle(title){
  let appTitle = document.createElement('h2')
  appTitle.innerHTML = title
  return appTitle

}

//Создаем и возвращаем форму для создания дела
function createTodoItemFrom(){
  let form = document.createElement('form')
  let inputBlock = document.createElement('input')
  let buttonWrapper = document.createElement('div')
  let button = document.createElement('button')
  form.classList.add('row','mb-3')

  inputBlock.classList.add('form-control','mb-3')
  // inputBlock.ariaValueText = 'text'
  inputBlock.placeholder = 'Введите название нового дела'
  // стили для input, так как placholder не отображался
  // inputBlock.value = 'Введите название нового дела'
  inputBlock.style.width = '87%'
  inputBlock.style.height = '38px'
  buttonWrapper.classList.add('input-group-append', 'col-auto')
  button.classList.add('btn', 'btn-primary')
  button.textContent = 'Добавить дело'
  button.disabled = true


  buttonWrapper.append(button)
  form.append(inputBlock)
  form.append(buttonWrapper)

  inputBlock.addEventListener('input', function () {
    if(inputBlock.value !== "") {
      button.disabled = false
    } else {
      button.disabled = true
    }

  })

  return{
    form,
    inputBlock,
    button
  }
}


//Создаем и возвращаем список элементов
function createTodoList(){

  let list = document.createElement('ul')
  list.classList.add('list-group')
  return list

}

function createTodoItem(obj) {
let item = document.createElement('li')

//Помещаем кнопки в одну группу

let buttonGroup = document.createElement('div')
let doneButton = document.createElement('button')
let deletButton = document.createElement('button')

//Стили для элемента списка и кнопок(flex)
item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

item.textContent = obj.name

buttonGroup.classList.add('btn-group', 'btn-group-sm')
doneButton.classList.add('btn', 'btn-success')
doneButton.textContent = 'Готово'
deletButton.classList.add('btn', 'btn-danger')
deletButton.textContent = 'Удалить'

if(obj.done == true) item.classList.add('list-group-item-success')

doneButton.addEventListener('click', function(){
  item.classList.toggle('list-group-item-success')

  for ( const task of tasks){
    if(task.id == obj.id) task.done = !task.done
    console.log(obj.id)
  }
  saveTasks(tasks,listName)


})

deletButton.addEventListener('click', function(){
  if (confirm('Вы уверены?'))
  item.remove()

  for (let i = 0; i < tasks.length; i++){
    if(tasks[i].id == obj.id) tasks.splice(i,1)
    console.log(tasks)
  }

  saveTasks(tasks,listName)






})


//Обьеденяем кнопки

buttonGroup.append(doneButton)
buttonGroup.append(deletButton)
item.append(buttonGroup)
return{
  item,
  doneButton,
  deletButton,
}
}

function saveTasks(arr, keyName) {
  localStorage.setItem(keyName, JSON.stringify(arr))


}


function createTodoApp(container, title = 'Список дел', keyName){

  // let container = document.getElementById('todo-app')
  let todoAppTitle = createAppTitle(title)
  let todoItemForm = createTodoItemFrom()
  let todoList = createTodoList()

  listName = keyName

  // let todoItems = [createTodoItem('Buy milk'), createTodoItem('Wash mugs')]

  container.append(todoAppTitle)
  container.append(todoItemForm.form)
  container.append(todoList)

  let localData = localStorage.getItem(listName)

  if(localData !== null && localData !== '') tasks = JSON.parse(localData)

  for(const task of tasks) {
    let todoItem = createTodoItem(task)

    todoList.append(todoItem.item)
    }


  // todoList.append(todoItems[0].item)
  // todoList.append(todoItems[1].item)

  todoItemForm.form.addEventListener('submit', function(e) {
    //не перезагружает страницу при отправки формы
    e.preventDefault()

    //игнорируем, сщздание элементов, если пользователь ничего не ввел
    if (!todoItemForm.inputBlock.value){
      return;

    }


    //Обьект задачи
    let itemObj={
      id: Date.now(),
      name:todoItemForm.inputBlock.value,
      done:false
    }

    let todoItem = createTodoItem(itemObj)


    console.log(todoItem)
    console.log(todoItem.item)


          //ДОбавляем обьект в массив
          tasks.push(itemObj)

          todoItem.item.id = itemObj.id
          let idItem = todoItem.item.id

          console.log(idItem)

          //Добавляем задачу в локал хранилище

          saveTasks(tasks,listName)

    todoList.append(todoItem.item)


    //После отправки делаем кнопку неактивной

    todoItemForm.button.disabled = true

    //обнуляем значение в поле input
    todoItemForm.inputBlock.value =''
  })

}

  window.createTodoApp = createTodoApp;


})();

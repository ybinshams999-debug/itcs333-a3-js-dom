// ITCS333 A3 - To-do app
document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('todo-input');
  var addBtn = document.getElementById('add-btn');
  var list = document.getElementById('todo-list');
  var errorMsg = document.getElementById('error-msg');
  var counter = document.getElementById('counter');
  var filter = 'all';

  // update the "N item(s) left" text
  function updateCounter() {
    var left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left + ' item(s) left';
  }

  // show / hide items based on the current filter
  function applyFilter() {
    var items = list.querySelectorAll('li');
    for (var i = 0; i < items.length; i++) {
      var done = items[i].classList.contains('completed');
      if (filter === 'all') items[i].style.display = '';
      else if (filter === 'active') items[i].style.display = done ? 'none' : '';
      else if (filter === 'done') items[i].style.display = done ? '' : 'none';
    }
  }

  function addItem() {
    var text = input.value.trim();
    if (text === '') {
      errorMsg.classList.remove('hidden');      return;
    }
    errorMsg.classList.add('hidden');

    var li = document.createElement('li');
    var span = document.createElement('span');
    span.textContent = text;
    var btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = 'x';
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);

    input.value = '';
    applyFilter();
    updateCounter();
  }

  var form = document.querySelector('form');
  if (form) {
    // input is inside a form: Enter and the button both trigger "submit"
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // stop the page from reloading
      addItem();
    });
  } else {
    addBtn.addEventListener('click', addItem);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') addItem();
    });
  }

  // event delegation: one listener for all items
  list.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (!li) return;
    if (e.target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    applyFilter();
    updateCounter();
  });

  // filter buttons
  document.getElementById('filter-all').addEventListener('click', function () {
    filter = 'all';
    applyFilter();
  });
  document.getElementById('filter-active').addEventListener('click', function () {
    filter = 'active';
    applyFilter();
  });
  document.getElementById('filter-done').addEventListener('click', function () {
    filter = 'done';
    applyFilter();
  });

  errorMsg.classList.add('hidden');
    updateCounter();
});
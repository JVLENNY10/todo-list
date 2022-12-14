function addItem(select) {
  const criarTarefa = document.querySelector('#criar-tarefa');
  const textoTarefa = document.querySelector('#texto-tarefa');

  if (select.target === criarTarefa && textoTarefa.value !== '') {
    const li = document.createElement('li');
    const ol = document.querySelector('#lista-tarefas');

    li.classList.add('itemList');
    ol.appendChild(li).innerHTML = textoTarefa.value;
    textoTarefa.value = '';
  }
}

function selectItem(select) {
  if (select.target.classList.contains('itemList')) {
    const li = document.querySelectorAll('li');

    li.forEach((item) => {
      if (item.classList.contains('selected')) {
        item.style.color = '#13131c';
        item.classList.remove('selected');
      } else if (select.target === item) {
        item.classList.add('selected');
        item.style.color = '#1DB954';
      }
    });
  }
}

function completedItem(select) {
  const li = document.querySelectorAll('li');

  li.forEach((items) => {
    if (select.target === items) {
      const item = items;
      item.classList.toggle('completed');
      if (item.classList.contains('completed')) {
        item.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      } else {
        item.style.textDecoration = 'none';
      }
    }
  });
}

function moveItemSelectedUp(select) {
  // João Spinelli(T16) me ajudou a chegar nesse resultado com o insertBefore.
  const moveUp = document.querySelector('#mover-cima');
  const selected = document.querySelector('.selected');

  if (select.target === moveUp && selected !== null) {
    const { previousElementSibling } = document.querySelector('.selected');
    if (previousElementSibling !== null) {
      const ol = document.querySelector('ol');
      ol.insertBefore(previousElementSibling, selected);
      ol.insertBefore(selected, previousElementSibling);
    }
  }
}

function moveItemSelectedDown(select) {
  // João Spinelli(T16) me ajudou a chegar nesse resultado com o insertBefore.
  const selected = document.querySelector('.selected');
  const moveDown = document.querySelector('#mover-baixo');

  if (select.target === moveDown && selected !== null) {
    const { nextElementSibling } = document.querySelector('.selected');
    if (nextElementSibling !== null) {
      const ol = document.querySelector('ol');
      ol.insertBefore(selected, nextElementSibling);
      ol.insertBefore(nextElementSibling, selected);
    }
  }
}

function saveList(select) {
  // João Spinelli(T16) me ajudou a chegar nesse resultado para salvar o conteúdo das listas.
  const salvarTarefas = document.querySelector('#salvar-tarefas');

  if (select.target === salvarTarefas) {
    const arrayObjectList = [];
    const li = document.querySelectorAll('li');

    li.forEach((items) => {
      if (items.classList.contains('completed')) {
        arrayObjectList.push({ item: items.innerHTML, completed: true });
      } else {
        arrayObjectList.push({ item: items.innerHTML, completed: false });
      }
    });

    localStorage.setItem('items', JSON.stringify(arrayObjectList));
  }
}

function loadList() {
  // João Spinelli(T16) me ajudou a chegar nesse resultado para mostrar o conteúdo das listas.
  if (localStorage.getItem('items')) {
    const ol = document.querySelector('ol');
    const storage = JSON.parse(localStorage.getItem('items'));

    storage.forEach((items) => {
      const li = document.createElement('li');
      if (items.completed) {
        li.innerHTML = items.item;
        li.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
        li.classList.add('itemList');
        ol.appendChild(li).classList.add('completed');
      } else {
        li.innerHTML = items.item;
        ol.appendChild(li).classList.add('itemList');
      }
    });
  }
}

function cleanAll(select) {
  const apagaTudo = document.querySelector('#apaga-tudo');

  if (select.target === apagaTudo) {
    const li = document.querySelectorAll('li');

    li.forEach((items) => {
      items.remove();
    });
  }
}

function cleanComplete(select) {
  const removerFinalizados = document.querySelector('#remover-finalizados');

  if (select.target === removerFinalizados) {
    const li = document.querySelectorAll('li');

    li.forEach((items) => {
      if (items.classList.contains('completed')) {
        items.remove();
      }
    });
  }
}

function cleanSelected(select) {
  const removerSelecionado = document.querySelector('#remover-selecionado');

  if (select.target === removerSelecionado) {
    const li = document.querySelectorAll('li');

    li.forEach((items) => {
      if (items.classList.contains('selected')) {
        items.remove();
      }
    });
  }
}

window.onload = function init() {
  loadList();

  document.addEventListener('click', addItem);
  document.addEventListener('click', cleanAll);
  document.addEventListener('click', saveList);
  document.addEventListener('click', selectItem);
  document.addEventListener('click', cleanComplete);
  document.addEventListener('click', cleanSelected);
  document.addEventListener('click', moveItemSelectedUp);
  document.addEventListener('click', moveItemSelectedDown);

  document.addEventListener('dblclick', completedItem);
};

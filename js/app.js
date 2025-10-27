const defaultTodos = [
  { id: '1', title: 'todo 1', desc: '這是 todo 1 的描述，點擊標題可以展開或收合。' },
  { id: '2', title: 'todo 2', desc: '這是 todo 2 的描述。' }
];

const listEl = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const newTitle = document.getElementById('new-title');
const newDesc = document.getElementById('new-desc');

let todos = [...defaultTodos];

function render(){
  listEl.innerHTML = '';
  todos.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = t.id;

    const left = document.createElement('div');
    left.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';

    const title = document.createElement('div');
    title.className = 'todo-title';
    title.textContent = t.title;

    left.appendChild(checkbox);
    left.appendChild(title);

    const del = document.createElement('button');
    del.className = 'btn-delete';
    del.textContent = 'delete';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      todos.splice(idx,1);
      render();
    });

    li.appendChild(left);
    li.appendChild(del);

    // clickable to toggle desc
    li.addEventListener('click', () => {
      const existing = li.querySelector('.desc-content');
      if(existing){
        existing.remove();
        return;
      }
      const desc = document.createElement('div');
      desc.className = 'desc-content';
      desc.textContent = t.desc || '';
      li.appendChild(desc);
      // scroll into view if needed
      desc.scrollIntoView({behavior:'smooth',block:'nearest'});
    });

    listEl.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const title = newTitle.value.trim();
  const desc = newDesc.value.trim();
  if(!title) return;
  todos.push({ id: Date.now().toString(), title, desc });
  newTitle.value = '';
  newDesc.value = '';
  render();
  // keep viewport focusing on list end if necessary
  listEl.lastElementChild?.scrollIntoView({behavior:'smooth',block:'end'});
});

// initial render
render();

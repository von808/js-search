document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#search-input');
  const list = document.querySelector('#list');
  let USER = [];

  async function start() {
    list.innerHTML = '<span class="text-3xl text-white">Loading...</span>';
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await resp.json();
      setTimeout(() => {
        USER = data;
        render(data);
      }, 1000);
    } catch (err) {
      list.classList.add('text-3xl', 'text-red');
      list.innerHTML = err.message;
    }
  }
  start();

  input.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase();
    const searchedUser = USER.filter((user) =>
      user.name.toLowerCase().includes(value),
    );
    render(searchedUser);
  });
  function render(array = []) {
    const html = array.map(template).join('');
    list.innerHTML = html;
  }
  function template({ name }) {
    return `
      <li class="bg-white min-h-[52px] w-full rounded-md p-2">
        <h3 class="text-2xl font-semibold">${name}</h3>
      </li>
    `;
  }
});

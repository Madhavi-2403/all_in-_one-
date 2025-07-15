const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, i) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) li.classList.add('completed');
        li.onclick = () => {
            todos[i].completed = !todos[i].completed;
            saveAndRender();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            todos.splice(i, 1);
            saveAndRender();
        };

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}
addTodoBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveAndRender();
    }
});
renderTodos();
const products = [
    { name: 'Smartphone', category: 'electronics', price: 700, rating: 4.5, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
    { name: 'Laptop', category: 'electronics', price: 1200, rating: 4.7, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
    { name: 'Jeans', category: 'clothing', price: 50, rating: 4.0, img: 'https://tse4.mm.bing.net/th/id/OIP.yvgjpc1ggSw2D-sMNzY3kAHaGt?pid=Api&P=0&h=180' },
    { name: 'T-Shirt', category: 'clothing', price: 20, rating: 4.2, img: 'https://tse2.mm.bing.net/th/id/OIP.azPBqwhVdoDuXSGuPUs1KAHaHa?pid=Api&P=0&h=180' },
    { name: 'Novel', category: 'books', price: 15, rating: 4.8, img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
    { name: 'Science Book', category: 'books', price: 35, rating: 4.6, img: 'https://tse3.mm.bing.net/th/id/OIP.0UTJucGlCTq3fqizfXUfwQHaJc?pid=Api&P=0&h=180' }
];
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortOption = document.getElementById('sortOption');
const productList = document.getElementById('productList');
const priceValue = document.getElementById('priceValue');
function renderProducts() {
    let filtered = products.filter(p =>
        (categoryFilter.value === 'all' || p.category === categoryFilter.value)
        && p.price <= priceFilter.value
    );

    switch (sortOption.value) {
        case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'rating-desc': filtered.sort((a, b) => b.rating - a.rating); break;
    }

    productList.innerHTML = '';
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="price">Rs${p.price}</div>
        `;
        productList.appendChild(card);
    });
}
categoryFilter.addEventListener('change', renderProducts);
priceFilter.addEventListener('input', () => {
    priceValue.textContent = `Rs${priceFilter.value}`;
    renderProducts();
});
sortOption.addEventListener('change', renderProducts);
renderProducts();
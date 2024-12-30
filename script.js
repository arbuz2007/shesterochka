// Получаем из localStorage значение корзины, или устанавливаем пустой массив в случае отсутствия
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция добавления товара в корзину с именем, ценой и изображением
function addToCart(productName, price, imageUrl) {
    cart.push({ name: productName, price: price, imageUrl: imageUrl });
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем в localStorage
    updateCartCount();
    alert(`${productName} добавлен в корзину!`);
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) { // Проверяем, что элемент существует на странице
        countElement.innerText = cart.length;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1); // Удаляем товар из массива по индексу
    localStorage.setItem('cart', JSON.stringify(cart)); // Обновляем localStorage
    loadCart(); // Обновляем отображение корзины
    updateCartCount();
}

// Функция загрузки товаров в корзине
function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
        cartTotalElement.innerText = 'Итого: 0 руб.';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        
        // Создаем элемент для отображения изображения
        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl; // Путь к изображению
        imageElement.alt = item.name; // Альтернативный текст
        imageElement.style.width = '50px'; // Можно настроить размер изображения
        imageElement.style.height = '50px'; // Можно настроить размер изображения
        imageElement.style.marginRight = '10px'; // Отступ между изображением и названием
        
        // Добавляем изображение и текст в общий элемент
        itemElement.appendChild(imageElement);
        itemElement.appendChild(document.createTextNode(`${item.name}: ${item.price} руб.`));
        
        // Создаем кнопку удаления
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Удалить';
        removeButton.onclick = () => removeFromCart(index); // Передаем индекс

        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotalElement.innerText = `Итого: ${total} руб.`;
}

// Вызов функции загрузки корзины при загрузке страницы
window.onload = () => {
    loadCart();
    updateCartCount(); // Обновляем счетчик на главной странице
};
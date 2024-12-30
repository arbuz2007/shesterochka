let cartItems = [];
let cartCount = 0;

function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    cartCount++;
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountDiv = document.getElementById('cart-count');
    const cartTotalDiv = document.getElementById('cart-total');

    // Очистить текущие элементы корзины
    cartItemsDiv.innerHTML = '';
    
    // Добавить товары в корзину
    let total = 0;
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - ${item.price} руб.`;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price;
    });

    // Обновить счетчик и общую сумму
    cartCountDiv.textContent = cartCount;
    cartTotalDiv.textContent = `Итого: ${total} руб.`;
}
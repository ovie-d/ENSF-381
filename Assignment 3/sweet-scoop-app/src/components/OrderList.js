import { useEffect, useRef } from 'react';
import OrderItem from './OrderItem';

function priceToNumber(price) {
  return Number(price.replace('$', ''));
}

function OrderList({ items, onRemoveItem, onLoadOrder }) {
  const loadedStorage = useRef(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem('sweetScoopOrder');

    if (!savedOrder) {
      loadedStorage.current = true;
      return;
    }

    try {
      const parsedOrder = JSON.parse(savedOrder);
      if (Array.isArray(parsedOrder)) {
        onLoadOrder(parsedOrder);
      }
    } catch {
      localStorage.removeItem('sweetScoopOrder');
    } finally {
      loadedStorage.current = true;
    }
  }, [onLoadOrder]);

  useEffect(() => {
    if (!loadedStorage.current) {
      return;
    }

    localStorage.setItem('sweetScoopOrder', JSON.stringify(items));
  }, [items]);

  const total = items.reduce((sum, item) => {
    return sum + priceToNumber(item.price) * item.quantity;
  }, 0);

  return (
    <div className="order-list">
      <h2>Your Order</h2>
      {items.length === 0 && <p>No items in your order.</p>}

      {items.map((item) => (
        <OrderItem key={item.id} item={item} onRemove={onRemoveItem} />
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default OrderList;

import { useCallback, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlavorCatalog from './FlavorCatalog';
import OrderList from './OrderList';

function FlavorsPage() {
  const [orderItems, setOrderItems] = useState([]);

  function handleAddToOrder(flavor) {
    setOrderItems((currentOrder) => {
      const foundItem = currentOrder.find((item) => item.id === flavor.id);

      if (!foundItem) {
        return [
          ...currentOrder,
          {
            id: flavor.id,
            name: flavor.name,
            price: flavor.price,
            quantity: 1
          }
        ];
      }

      return currentOrder.map((item) => {
        if (item.id !== flavor.id) {
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      });
    });
  }

  function handleRemoveItem(itemId) {
    setOrderItems((currentOrder) => {
      return currentOrder
        .map((item) => {
          if (item.id !== itemId) {
            return item;
          }

          return { ...item, quantity: item.quantity - 1 };
        })
        .filter((item) => item.quantity > 0);
    });
  }

  const handleLoadOrder = useCallback((savedOrder) => {
    setOrderItems(savedOrder);
  }, []);

  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog onAddToOrder={handleAddToOrder} />
        <OrderList
          items={orderItems}
          onRemoveItem={handleRemoveItem}
          onLoadOrder={handleLoadOrder}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FlavorsPage;

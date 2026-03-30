function OrderItem({ item, onRemove }) {
  return (
    <div className="order-item">
      <p>{item.name}</p>
      <p>Qty: {item.quantity}</p>
      <p>{item.price}</p>
      <button className="remove" type="button" onClick={() => onRemove(item.id)}>
        Remove Item
      </button>
    </div>
  );
}

export default OrderItem;

function DisplayStatus({ type, message }) {
  const statusClass = type === 'error' ? 'status-error' : 'status-success';

  return <div className={`status-message ${statusClass}`}>{message}</div>;
}

export default DisplayStatus;

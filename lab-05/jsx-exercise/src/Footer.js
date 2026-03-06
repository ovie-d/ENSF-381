function Footer() {
  const today = new Date().toLocaleDateString();

  return (
    <footer>
      <p>{today}</p>
      <p>Group Members: Unas, David</p>
    </footer>
  );
}

export default Footer;

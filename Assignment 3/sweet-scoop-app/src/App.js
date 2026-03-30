import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import flavors from './flavors';

function Homepage() {
  return (
    <div>
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}

function FlavorsPage() {
  return (
    <div>
      <Header />
      <main className="main-section">
        <h2>All Flavors</h2>
        <div className="flavor-grid">
          {flavors.map((flavor) => (
            <article className="flavor-card" key={flavor.id}>
              <img src={flavor.image} alt={flavor.name} />
              <h3>{flavor.name}</h3>
              <p>{flavor.description}</p>
              <p className="price">{flavor.price}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flavors" element={<FlavorsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

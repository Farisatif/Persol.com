import React, { useState } from 'react';
import CartSidebar from './prodects/CartSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Image from './1.jpg';  // تعديل المسار هنا
import Footer from './hader_footer/footer';

const allProducts = [
  { id: 1, brand: 'Ray-Ban', model: 'Classic Round', price: 1000, imgSrc: Image },  // استخدام الصورة هنا
  { id: 2, brand: 'Oakley', model: 'Clear Vision', price: 499, imgSrc: Image },  // مسار الصورة في مجلد public
  { id: 3, brand: 'Gucci', model: 'Retro Circle', price: 250, imgSrc: Image },
  { id: 4, brand: 'Nike', model: 'Speed Vision', price: 350, imgSrc: Image },
  { id: 5, brand: 'Versace', model: 'Luxury Frame', price: 799, imgSrc: Image },
  { id: 6, brand: 'Dior', model: 'Elegant Shades', price: 850, imgSrc: Image }
];

const ProdH = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [popupProduct, setPopupProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const productsPerPage = 8;

  const handleAddToCart = (product) => {
    setPopupProduct(null);
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecreaseQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredProducts = allProducts.filter(product => 
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = sortByPrice ? [...filteredProducts].sort((a, b) => a.price - b.price) : filteredProducts;
  const currentProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const toggleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleCartSidebar = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const isVisible = cartSidebar.style.display === 'block';
    cartSidebar.style.display = isVisible ? 'none' : 'block';
  };

  const handleProductClick = (product) => {
    setPopupProduct(product);
  };

  const closePopup = () => {
    setPopupProduct(null);
  };



  return (
    <div className="app-container">
      <div className='co'>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search" value={searchQuery} onChange={handleSearch} />
          <button className="feedback-input" onClick={toggleSortByPrice}>
            {sortByPrice ? 'Sort by Default' : 'Sort by Price'}
          </button>
        </div>
        <div className="header">
          <div className="cart" onClick={toggleCartSidebar}>
          <FontAwesomeIcon icon={faCartShopping} id='cart' /> {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
        </div>
        <div className="container">
          {currentProducts.map((product) => (
            <div key={product.id} className="product" onClick={() => handleProductClick(product)}>
              <img src={product.imgSrc} alt={product.model} />
              <p><b>Brand:</b> {product.brand}</p>
              <p><b>Model:</b> {product.model}</p>
              <p><b>Price:</b> ${product.price}</p>
            </div>
          ))}
        </div>

        {popupProduct && (
          <div className="popup-overlay" style={{ display: 'flex' }}>
            <div className="popup-content">
              <span className="close-btn" onClick={closePopup}>×</span>
              <img src={popupProduct.imgSrc} alt={popupProduct.model} />
              <p><b>Brand:</b> {popupProduct.brand}</p>
              <p><b>Model:</b> {popupProduct.model}</p>
              <p><b>Price:</b> ${popupProduct.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(popupProduct)}>Add to Cart</button>
            </div>
          </div>
        )}

        {/* استدعاء المكون الخاص بالسلة الجانبية */}
        <CartSidebar
          cart={cart}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          calculateTotalPrice={calculateTotalPrice}
          handleCheckout={() => setShowCardForm(true)}
          toggleCartSidebar={toggleCartSidebar}
        />
      </div>
  
    </div>
  );
};

export default ProdH;

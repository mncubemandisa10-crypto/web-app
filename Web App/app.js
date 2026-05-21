// List of all food items shown on the menu page.
const menuItems = [
  {
    id: "fatcakes",
    name: "Bongani's Fatcakes",
    image: "images/Bongani 's  fatcakes.jpg",
    description: "Golden, soft fatcakes served warm",
    category: "Breakfast",
    price: 25
  },
  {
    id: "kota",
    name: "Bongani's Kota",
    image: "images/Bongani's kota.jpg",
    description: "Fresh bread with quality fillings",
    category: "Kota",
    price: 45
  },
  {
    id: "king-kota",
    name: "King Kota Supreme",
    image: "images/julius extrem king kota.jpg",
    description: "Premium kota with all toppings",
    category: "Kota",
    price: 55
  },
  {
    id: "bunny-chow",
    name: "Karisima Bunny Chow",
    image: "images/karishim a   bunny chaow.jpg",
    description: "Delicious curry in a hollowed loaf",
    category: "Meal",
    price: 60
  },
  {
    id: "slap-chips",
    name: "Thembi's Slap Chips",
    image: "images/Thembi 's slap chips  large.jpg",
    description: "Crispy, thick-cut fries served fresh",
    category: "Sides",
    price: 35
  },
  {
    id: "side-dish",
    name: "Mami's Side Dish",
    image: "images/mamis  side dish.jpg",
    description: "Traditional home-cooked vegetables",
    category: "Sides",
    price: 40
  },
  {
    id: "mogodu",
    name: "Mogodu & Dumplings",
    image: "images/mogodu monday   mamis  specail dish.jpg",
    description: "Monday special - tripe with soft dumplings",
    category: "Meal",
    price: 50
  },
  {
    id: "ice-cream",
    name: "Bongani's Ice Cream",
    image: "images/Bongani 's  ice s.jpg",
    description: "Cool, creamy refreshment",
    category: "Dessert",
    price: 20
  },
  {
    id: "julius-full-plate",
    name: "Julius Full Plate",
    image: "images/julius full plate.jpg",
    description: "Chicken, pap, salad, and sauce in a filling combo",
    category: "Meal",
    price: 75
  },
  {
    id: "mamis-full-meal",
    name: "Mami's Full Meal Special",
    image: "images/mamis  full meal special.jpg",
    description: "Chicken, chips, sausage, and fatcakes in one plate",
    category: "Combo",
    price: 80
  },
  {
    id: "thembi-skopo",
    name: "Thembi's Skopo",
    image: "images/thembi's skopo.jpg",
    description: "Traditional skopo served with pap and spicy sauce",
    category: "Meal",
    price: 65
  },
  {
    id: "cow-heel-soup",
    name: "Julius's Cow Heel Soup",
    image: "images/julius's cow heel  soup.jpg",
    description: "Warm cow heel soup with a rich local flavor",
    category: "Soup",
    price: 55
  },
  {
    id: "chicken-feet",
    name: "Bongani's Chicken Feet Fiesta",
    image: "images/bongani's chicken feet fiester.jpg",
    description: "Spiced chicken feet for a bold street-food bite",
    category: "Snack",
    price: 35
  },
  {
    id: "chakalaka",
    name: "Karishim's Chakalaka",
    image: "images/karishim' chakalaka.jpg",
    description: "Fresh chakalaka side with a spicy vegetable mix",
    category: "Sides",
    price: 25
  },
  {
    id: "roasted-corn",
    name: "Mami's Roasted Corn",
    image: "images/mamis  roasted corn.jpg",
    description: "Smoky roasted corn served hot",
    category: "Snack",
    price: 18
  },
  {
    id: "thato-nuts",
    name: "Thato's Nuts",
    image: "images/thato's nuts.jpg",
    description: "Crunchy roasted nuts for a quick snack",
    category: "Snack",
    price: 20
  },
  {
    id: "mamis-stamp",
    name: "Mami's Stamp",
    image: "images/mamis stamp.jpg",
    description: "Traditional samp-style comfort food",
    category: "Meal",
    price: 45
  }
];

// Shared order settings used when calculating totals and tracking progress.
const deliveryFee = 25;
const orderStatuses = ["Received", "Preparing", "Out for delivery", "Delivered"];

// Converts a number into South African Rand format.
function formatCurrency(amount) {
  return `R${amount.toFixed(2)}`;
}

// Checks whether the user is currently signed in.
function isLoggedIn() {
  return localStorage.getItem("streetBitesLoggedIn") === "true";
}

// Sends users to the login page before they can place an order.
function requireLoginForOrder() {
  if (isLoggedIn()) return true;

  localStorage.setItem("streetBitesRedirectAfterLogin", window.location.pathname.split("/").pop() || "dashboard.html");
  localStorage.setItem("streetBitesLoginNotice", "Please sign in before placing an order.");
  window.location.href = "login.html";
  return false;
}

// Gets the saved cart from localStorage.
function getCart() {
  return JSON.parse(localStorage.getItem("streetBitesCart")) || [];
}

// Saves cart changes and refreshes the cart number in the navigation.
function saveCart(cart) {
  localStorage.setItem("streetBitesCart", JSON.stringify(cart));
  updateCartCount();
}

// Gets previous orders from localStorage.
function getOrders() {
  return JSON.parse(localStorage.getItem("streetBitesOrders")) || [];
}

// Saves the updated order history.
function saveOrders(orders) {
  localStorage.setItem("streetBitesOrders", JSON.stringify(orders));
}

// Updates the cart count shown in the page header.
function updateCartCount() {
  const countElement = document.querySelector("[data-cart-count]");
  if (!countElement) return;

  const totalItems = getCart().reduce((sum, item) => sum + item.quantity, 0);
  countElement.textContent = totalItems;
}

// Changes the Login link into Logout and hides Register when the user is signed in.
function updateAuthLinks() {
  const loggedIn = isLoggedIn();

  document.querySelectorAll("header nav a[href='login.html']").forEach(link => {
    if (!loggedIn) {
      link.textContent = "Login";
      return;
    }

    link.textContent = "Logout";
    link.addEventListener("click", event => {
      event.preventDefault();
      localStorage.removeItem("streetBitesLoggedIn");
      localStorage.removeItem("streetBitesRedirectAfterLogin");
      localStorage.removeItem("streetBitesPendingProduct");
      window.location.href = "index.html";
    });
  });

  document.querySelectorAll("header nav a[href='register.html']").forEach(link => {
    link.style.display = loggedIn ? "none" : "";
  });
}

// Controls the mobile navigation menu.
function setupMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("header nav");
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
      document.body.classList.remove("menu-open");
    });
  });
}

// Shows a success or error message inside a selected message box.
function showMessage(targetId, message, type = "success") {
  const messageBox = document.getElementById(targetId);
  if (!messageBox) return;

  messageBox.textContent = message;
  messageBox.className = `message ${type}`;
  messageBox.hidden = false;
}

// Clears a message box and hides it again.
function clearMessage(targetId) {
  const messageBox = document.getElementById(targetId);
  if (!messageBox) return;

  messageBox.textContent = "";
  messageBox.hidden = true;
}

// Adds one menu item to the cart and returns the product that was added.
function addProductToCart(productId) {
  const product = menuItems.find(item => item.id === productId);
  if (!product) return null;

  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart(cart);
  return product;
}

// Handles the Add to Cart button, including login checks.
function addToCart(productId) {
  if (!isLoggedIn()) {
    localStorage.setItem("streetBitesPendingProduct", productId);
    requireLoginForOrder();
    return;
  }

  const product = addProductToCart(productId);
  if (product) showMessage("menuMessage", `${product.name} added to your cart.`, "success");
}

// Builds the menu product cards on the menu page.
function renderMenu(items = menuItems) {
  const productGrid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");
  if (!productGrid) return;

  productGrid.innerHTML = "";
  noResults.style.display = items.length === 0 ? "block" : "none";

  items.forEach(product => {
    const productCard = document.createElement("article");
    productCard.className = "product-card fade-in";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <button class="product-btn" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;

    productGrid.appendChild(productCard);
  });
}

// Sets up menu search and Add to Cart buttons.
function setupMenuPage() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  renderMenu();

  searchInput.addEventListener("input", event => {
    const searchTerm = event.target.value.toLowerCase().trim();
    const filteredItems = menuItems.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    renderMenu(filteredItems);
  });

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) addToCart(addButton.dataset.addToCart);
  });
}

// Sets up order buttons used on featured products.
function setupFeaturedButtons() {
  document.querySelectorAll("[data-featured-order]").forEach(button => {
    button.addEventListener("click", () => {
      if (!isLoggedIn()) {
        addToCart(button.dataset.featuredOrder);
        return;
      }

      addToCart(button.dataset.featuredOrder);
      window.location.href = "cart.html";
    });
  });
}

// Handles the address search form on the home page.
function setupLandingPage() {
  const addressForm = document.getElementById("addressSearchForm");
  if (!addressForm) return;

  addressForm.addEventListener("submit", event => {
    event.preventDefault();
    const address = addressForm.deliveryAddress.value.trim();

    if (address.length < 5) {
      showMessage("addressMessage", "Please enter a delivery address first.", "error");
      return;
    }

    localStorage.setItem("streetBitesDeliveryAddress", address);
    showMessage("addressMessage", "Great. Showing meals near your address...", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  });
}

// Builds the cart table and order summary.
function renderCart() {
  const cartTable = document.getElementById("cartTable");
  const cartItems = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");
  const emptyCart = document.getElementById("emptyCart");
  const checkoutPanel = document.getElementById("checkoutPanel");
  if (!cartTable || !cartItems || !cartSummary || !emptyCart) return;

  const cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartTable.style.display = "none";
    cartSummary.style.display = "none";
    emptyCart.style.display = "block";
    if (checkoutPanel) checkoutPanel.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  cartTable.style.display = "table";
  cartSummary.style.display = "block";
  if (checkoutPanel) checkoutPanel.style.display = "block";

  let subtotal = 0;

  cart.forEach(cartItem => {
    const product = menuItems.find(item => item.id === cartItem.id);
    if (!product) return;

    const lineTotal = product.price * cartItem.quantity;
    subtotal += lineTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>
        <div class="quantity-control">
          <button type="button" data-quantity-action="decrease" data-product-id="${product.id}">-</button>
          <input type="number" min="1" max="20" value="${cartItem.quantity}" data-quantity-input="${product.id}" aria-label="${product.name} quantity">
          <button type="button" data-quantity-action="increase" data-product-id="${product.id}">+</button>
        </div>
      </td>
      <td>${formatCurrency(lineTotal)}</td>
      <td><button class="remove-btn" type="button" data-remove-item="${product.id}">Remove</button></td>
    `;

    cartItems.appendChild(row);
  });

  document.getElementById("subtotal").textContent = formatCurrency(subtotal);
  document.getElementById("total").textContent = formatCurrency(subtotal + deliveryFee);
}

// Updates the quantity of a product in the cart.
function changeQuantity(productId, quantity) {
  const cleanQuantity = Number(quantity);
  const cart = getCart();
  const cartItem = cart.find(item => item.id === productId);
  if (!cartItem || Number.isNaN(cleanQuantity)) return;

  cartItem.quantity = Math.min(Math.max(cleanQuantity, 1), 20);
  saveCart(cart);
  renderCart();
}

// Removes one product from the cart.
function removeCartItem(productId) {
  const updatedCart = getCart().filter(item => item.id !== productId);
  saveCart(updatedCart);
  renderCart();
}

// Sets up cart quantity buttons, quantity inputs, and remove buttons.
function setupCartPage() {
  if (!document.getElementById("cartItems")) return;

  renderCart();

  document.addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-quantity-action]");
    const removeButton = event.target.closest("[data-remove-item]");

    if (quantityButton) {
      const productId = quantityButton.dataset.productId;
      const cartItem = getCart().find(item => item.id === productId);
      if (!cartItem) return;

      const direction = quantityButton.dataset.quantityAction === "increase" ? 1 : -1;
      changeQuantity(productId, cartItem.quantity + direction);
    }

    if (removeButton) {
      removeCartItem(removeButton.dataset.removeItem);
    }
  });

  document.addEventListener("input", event => {
    const quantityInput = event.target.closest("[data-quantity-input]");
    if (quantityInput) {
      changeQuantity(quantityInput.dataset.quantityInput, quantityInput.value);
    }
  });
}

// Checks that text fields are not empty and meet a minimum length.
function validateRequired(value, minimumLength = 2) {
  return value.trim().length >= minimumLength;
}

// Checks that an email address has a valid format.
function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Checks that a phone number looks like a South African number.
function validatePhone(value) {
  return /^(\+27|0)[0-9\s-]{9,}$/.test(value.trim());
}

// Handles checkout form validation and creates a new order.
function setupCheckoutForm() {
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutJump = document.getElementById("checkoutJump");
  if (!checkoutForm) return;

  if (checkoutJump) {
    checkoutJump.addEventListener("click", () => {
      checkoutForm.scrollIntoView({ behavior: "smooth", block: "start" });
      checkoutForm.customerName.focus();
    });
  }

  checkoutForm.addEventListener("submit", event => {
    event.preventDefault();
    clearMessage("checkoutMessage");

    if (!requireLoginForOrder()) return;

    const cart = getCart();
    const name = checkoutForm.customerName.value;
    const phone = checkoutForm.customerPhone.value;
    const address = checkoutForm.customerAddress.value;
    const payment = checkoutForm.paymentMethod.value;

    if (!validateRequired(name)) {
      showMessage("checkoutMessage", "Please enter your full name.", "error");
      return;
    }

    if (!validatePhone(phone)) {
      showMessage("checkoutMessage", "Please enter a valid South African phone number.", "error");
      return;
    }

    if (!validateRequired(address, 8)) {
      showMessage("checkoutMessage", "Please enter a complete delivery address.", "error");
      return;
    }

    if (!payment) {
      showMessage("checkoutMessage", "Please choose a payment method.", "error");
      return;
    }

    const orderNumber = `SB-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderItems = cart.map(cartItem => {
      const product = menuItems.find(item => item.id === cartItem.id);
      return {
        id: cartItem.id,
        name: product ? product.name : cartItem.id,
        price: product ? product.price : 0,
        quantity: cartItem.quantity
      };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orders = getOrders();

    // New orders are saved at the top of the history list.
    orders.unshift({
      orderNumber,
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      payment,
      items: orderItems,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      createdAt: new Date().toISOString()
    });

    saveOrders(orders);
    showMessage("checkoutMessage", `Order ${orderNumber} confirmed. Estimated delivery time: 25-35 minutes.`, "success");
    saveCart([]);
    checkoutForm.reset();
    setTimeout(renderCart, 3500);
  });
}

// Chooses an order status based on how long ago the order was created.
function getOrderStatus(orderDate) {
  const minutesPassed = Math.floor((Date.now() - new Date(orderDate).getTime()) / 60000);

  if (minutesPassed >= 35) return orderStatuses[3];
  if (minutesPassed >= 20) return orderStatuses[2];
  if (minutesPassed >= 5) return orderStatuses[1];
  return orderStatuses[0];
}

// Builds the order history cards.
function setupHistoryPage() {
  const historyList = document.getElementById("historyList");
  const historyEmpty = document.getElementById("historyEmpty");
  if (!historyList || !historyEmpty) return;

  const orders = getOrders();
  historyList.innerHTML = "";

  if (!isLoggedIn()) {
    historyEmpty.innerHTML = '<p>Please sign in to view your order history.</p><a href="login.html">Login</a>';
    historyEmpty.style.display = "block";
    return;
  }

  if (orders.length === 0) {
    historyEmpty.style.display = "block";
    return;
  }

  historyEmpty.style.display = "none";

  orders.forEach(order => {
    const status = getOrderStatus(order.createdAt);
    const statusIndex = orderStatuses.indexOf(status);
    const orderCard = document.createElement("article");
    orderCard.className = "history-card fade-in";
    orderCard.innerHTML = `
      <div class="history-card-header">
        <div>
          <p class="product-category">Order ${order.orderNumber}</p>
          <h2>${status}</h2>
          <p>${new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <strong>${formatCurrency(order.total)}</strong>
      </div>
      <div class="tracking-steps">
        ${orderStatuses.map((step, index) => `
          <span class="${index <= statusIndex ? "active" : ""}">${step}</span>
        `).join("")}
      </div>
      <ul class="history-items">
        ${order.items.map(item => `<li>${item.quantity} x ${item.name}</li>`).join("")}
      </ul>
      <p class="history-address"><strong>Deliver to:</strong> ${order.address}</p>
    `;

    historyList.appendChild(orderCard);
  });
}

// Handles validation and feedback for the contact form.
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    clearMessage("contactMessage");

    if (!validateRequired(contactForm.fullName.value)) {
      showMessage("contactMessage", "Please enter your full name.", "error");
      return;
    }

    if (!validateEmail(contactForm.email.value)) {
      showMessage("contactMessage", "Please enter a valid email address.", "error");
      return;
    }

    if (contactForm.phone.value.trim() && !validatePhone(contactForm.phone.value)) {
      showMessage("contactMessage", "Please enter a valid phone number or leave it blank.", "error");
      return;
    }

    if (!contactForm.subject.value) {
      showMessage("contactMessage", "Please select a subject.", "error");
      return;
    }

    if (!validateRequired(contactForm.message.value, 10)) {
      showMessage("contactMessage", "Please write a message of at least 10 characters.", "error");
      return;
    }

    showMessage("contactMessage", "Thank you. Your message has been received.", "success");
    contactForm.reset();
  });
}

// Handles login and registration form validation.
function setupAuthForms() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    const loginNotice = localStorage.getItem("streetBitesLoginNotice");
    if (loginNotice) {
      showMessage("loginMessage", loginNotice, "error");
      localStorage.removeItem("streetBitesLoginNotice");
    }

    loginForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!validateEmail(loginForm.email.value)) {
        showMessage("loginMessage", "Please enter a valid email address.", "error");
        return;
      }

      if (!validateRequired(loginForm.password.value, 6)) {
        showMessage("loginMessage", "Password must be at least 6 characters.", "error");
        return;
      }

      localStorage.setItem("streetBitesLoggedIn", "true");
      showMessage("loginMessage", "Login successful. Redirecting to the menu...", "success");
      setTimeout(() => {
        // If the user tried to order before logging in, add that item after login.
        const pendingProduct = localStorage.getItem("streetBitesPendingProduct");
        if (pendingProduct) {
          addProductToCart(pendingProduct);
          localStorage.removeItem("streetBitesPendingProduct");
          localStorage.removeItem("streetBitesRedirectAfterLogin");
          window.location.href = "cart.html";
          return;
        }

        const redirectPage = localStorage.getItem("streetBitesRedirectAfterLogin") || "dashboard.html";
        localStorage.removeItem("streetBitesRedirectAfterLogin");
        window.location.href = redirectPage;
      }, 900);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!validateRequired(registerForm.fullName.value)) {
        showMessage("registerMessage", "Please enter your full name.", "error");
        return;
      }

      if (!validateEmail(registerForm.email.value)) {
        showMessage("registerMessage", "Please enter a valid email address.", "error");
        return;
      }

      if (!validatePhone(registerForm.phone.value)) {
        showMessage("registerMessage", "Please enter a valid South African phone number.", "error");
        return;
      }

      if (!validateRequired(registerForm.address.value, 8)) {
        showMessage("registerMessage", "Please enter a complete delivery address.", "error");
        return;
      }

      if (!validateRequired(registerForm.password.value, 6)) {
        showMessage("registerMessage", "Password must be at least 6 characters.", "error");
        return;
      }

      if (registerForm.password.value !== registerForm.confirmPassword.value) {
        showMessage("registerMessage", "Passwords do not match.", "error");
        return;
      }

      if (!registerForm.agree.checked) {
        showMessage("registerMessage", "Please agree to the terms before creating an account.", "error");
        return;
      }

      showMessage("registerMessage", "Account created successfully. You can now sign in.", "success");
      registerForm.reset();
    });
  }
}

// Runs the setup functions after the HTML has finished loading.
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateAuthLinks();
  setupMobileNav();
  setupLandingPage();
  setupMenuPage();
  setupFeaturedButtons();
  setupCartPage();
  setupCheckoutForm();
  setupHistoryPage();
  setupContactForm();
  setupAuthForms();
});

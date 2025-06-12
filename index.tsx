
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const OFFICEBOT_PRICE = 39.99;

const featureAccentColors = [
  { hex: '#FF6F61', rgb: '255, 111, 97' }, // Coral
  { hex: '#26A69A', rgb: '38, 166, 154' },  // Teal
  { hex: '#7E57C2', rgb: '126, 87, 194' }, // Violet
  { hex: '#FFCA28', rgb: '255, 202, 40' }, // Sunny Yellow
  { hex: '#9CCC65', rgb: '156, 204, 101' }, // Lime Green
  { hex: '#42A5F5', rgb: '66, 165, 245' },  // Sky Blue
  { hex: '#EC407A', rgb: '236, 64, 122' },  // Pink
  { hex: '#FFA726', rgb: '255, 167, 38' }   // Orange
];

function initializeApp(): void {
  const appRoot = document.getElementById('app');
  if (!appRoot) {
    console.error('App root element (#app) not found.');
    return;
  }
  appRoot.innerHTML = ''; // Clear existing content

  // Header
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="container">
      <h1>OfficeBot</h1>
      <p class="tagline">Your Future Workplace Assistant</p>
    </div>
  `;
  appRoot.appendChild(header);

  // Main content container
  const main = document.createElement('main');
  appRoot.appendChild(main);

  // Hero Section
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  heroSection.classList.add('hero-section');
  heroSection.innerHTML = `
    <div class="container">
      <h2>Meet OfficeBot: Revolutionize Your Workplace!</h2>
      <p>The intelligent, autonomous robot designed to streamline office tasks and boost productivity.</p>
      <p class="hero-sub-description">Are you an office worker feeling overwhelmed, constantly racing against the clock? OfficeBot is here to help! We designed this product to reduce your stress by taking on repetitive tasks, so you can relax, focus, and achieve better results.</p>
      <div class="robot-placeholder" aria-label="Illustration of a friendly office robot">
        🤖
      </div>
    </div>
  `;
  main.appendChild(heroSection);

  // Features Section
  const featuresSection = document.createElement('section');
  featuresSection.id = 'features';
  featuresSection.classList.add('features-section');
  
  const features = [
    { icon: '📂', title: 'Scan & File Paperwork', description: 'Efficiently digitizes and organizes physical documents, reducing clutter and improving accessibility.' },
    { icon: '✏️', title: 'Pencil Sharpening', description: 'Keeps your team\'s pencils perfectly sharp, ready for creative brainstorming and note-taking.' },
    { icon: '📝', title: 'Note Taking Assistant', description: 'Helps capture important information by transcribing voice notes or assisting with written summaries.' },
    { icon: '🔋', title: 'Laptop Charging', description: 'Provides on-demand mobile charging for laptops, ensuring your team stays powered up.' },
    { icon: '📦', title: 'Stationery Dispenser', description: 'Dispenses essential office supplies like pens, sticky notes, and clips whenever needed.' },
    { icon: '🎮', title: 'Remote Controllable', description: 'Easily command OfficeBot from a distance using an intuitive remote control, ensuring precise operation.' },
    { icon: '🎤', title: 'Voice Activated', description: 'Interact with OfficeBot hands-free using simple voice commands for ultimate convenience.' }
  ];

  let featuresHTML = `
    <div class="container">
      <h3>Why Choose OfficeBot?</h3>
      <p class="officebot-details">OfficeBot is eco-friendly, powered by advanced solar panel technology!</p>
      <p class="officebot-details">OfficeBot is ingeniously crafted from everyday materials like foam board, tinfoil, perler beads, wire, and construction paper!</p>
      <div class="features-grid">
  `;

  features.forEach((feature, index) => {
    const accent = featureAccentColors[index % featureAccentColors.length];
    featuresHTML += `
      <div class="feature-item" style="--feature-icon-color: ${accent.hex}; --feature-icon-color-rgb: ${accent.rgb};">
        <h4><span role="img" aria-label="${feature.title} icon">${feature.icon}</span> ${feature.title}</h4>
        <p>${feature.description}</p>
      </div>
    `;
  });

  featuresHTML += `
      </div>
    </div>
  `;
  featuresSection.innerHTML = featuresHTML;
  main.appendChild(featuresSection);

  // Call to Action Section
  const ctaSection = document.createElement('section');
  ctaSection.id = 'cta';
  ctaSection.classList.add('cta-section');
  ctaSection.innerHTML = `
    <div class="container">
      <h3>Ready to Upgrade Your Office?</h3>
      <p>Bring OfficeBot to your workplace for just <strong>$${OFFICEBOT_PRICE.toFixed(2)}</strong>!</p>
      <button id="buyButton" class="cta-button" aria-label="Buy OfficeBot Now for $${OFFICEBOT_PRICE.toFixed(2)}">Buy OfficeBot Now</button>
    </div>
  `;
  main.appendChild(ctaSection);

  // Footer
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} OfficeBot by DetechtiveKids. All rights reserved.</p>
      <p>Please note: This is a demo website. OfficeBot is a conceptual product. Orders are for demonstration purposes only.</p>
    </div>
  `;
  appRoot.appendChild(footer);

  // Modal for Buying Flow
  const modal = createModal();
  appRoot.appendChild(modal.element);

  const buyButton = ctaSection.querySelector('#buyButton');
  if (buyButton) {
    buyButton.addEventListener('click', () => {
      showStep1(modal);
    });
  }
}

function createModal(): { element: HTMLDivElement, content: HTMLDivElement, show: () => void, hide: () => void } {
  const modalElement = document.createElement('div');
  modalElement.id = 'buyModal';
  modalElement.classList.add('modal-overlay');
  modalElement.setAttribute('aria-modal', 'true');
  modalElement.setAttribute('role', 'dialog');
  modalElement.style.display = 'none'; // Initially hidden

  const modalContentWrapper = document.createElement('div');
  modalContentWrapper.classList.add('modal-content');
  modalElement.appendChild(modalContentWrapper);

  const show = () => {
    modalElement.style.display = 'flex';
    // Trap focus, set aria-labelledby, aria-describedby if needed
    const firstFocusableElement = modalContentWrapper.querySelector('button, input, textarea, select, [tabindex]:not([tabindex="-1"])') as HTMLElement | null;
    firstFocusableElement?.focus();
  };
  const hide = () => {
    modalElement.style.display = 'none';
    // Consider not clearing content immediately if there's a closing animation for the modal content itself
    setTimeout(() => {
        if (modalElement.style.display === 'none') { // Ensure it's still hidden before clearing
            modalContentWrapper.innerHTML = ''; 
        }
    }, 350); // Match CSS transition duration
  };
  
  modalElement.addEventListener('click', (event) => {
    if (event.target === modalElement) { // Click on overlay
      hide();
    }
  });
  
  // Close modal on ESC key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalElement.style.display === 'flex') {
      hide();
    }
  });


  return { element: modalElement, content: modalContentWrapper, show, hide };
}

let orderDetails = {
  name: '',
  email: '',
  address: '',
  quantity: 1
};

function showStep1(modal: { element: HTMLDivElement, content: HTMLDivElement, show: () => void, hide: () => void }) {
  modal.content.innerHTML = `
    <h2 id="modal-title-step1">Order OfficeBot - Your Details</h2>
    <form id="orderDetailsForm" novalidate>
      <div class="form-group">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" value="${orderDetails.name}" required autocomplete="name">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${orderDetails.email}" required autocomplete="email">
      </div>
      <div class="form-group">
        <label for="address">Shipping Address:</label>
        <textarea id="address" name="address" rows="3" required autocomplete="street-address">${orderDetails.address}</textarea>
      </div>
      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value="${orderDetails.quantity}" min="1" max="10" required>
      </div>
      <div class="order-summary">
        <p>Unit Price: $${OFFICEBOT_PRICE.toFixed(2)}</p>
        <p>Total: <strong id="totalPrice">$${(OFFICEBOT_PRICE * orderDetails.quantity).toFixed(2)}</strong></p>
      </div>
      <div class="modal-actions">
        <button type="button" class="modal-button cancel-button">Cancel</button>
        <button type="submit" class="modal-button primary-button">Proceed to Payment</button>
      </div>
    </form>
  `;
  modal.show();
  modal.element.setAttribute('aria-labelledby', 'modal-title-step1');


  const form = modal.content.querySelector('#orderDetailsForm') as HTMLFormElement;
  const quantityInput = modal.content.querySelector('#quantity') as HTMLInputElement;
  const totalPriceEl = modal.content.querySelector('#totalPrice') as HTMLElement;

  const updateTotalPrice = () => {
    const quantity = parseInt(quantityInput.value) || 1;
    orderDetails.quantity = Math.max(1, Math.min(quantity, 10)); // Clamp quantity
    if (quantityInput.value !== String(orderDetails.quantity)) {
        quantityInput.value = String(orderDetails.quantity); // Reflect clamped value
    }
    if (totalPriceEl) {
        totalPriceEl.textContent = `$${(OFFICEBOT_PRICE * orderDetails.quantity).toFixed(2)}`;
    }
  };

  quantityInput.addEventListener('input', updateTotalPrice);
  updateTotalPrice(); // Initial calculation

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      orderDetails.name = (form.elements.namedItem('name') as HTMLInputElement).value;
      orderDetails.email = (form.elements.namedItem('email') as HTMLInputElement).value;
      orderDetails.address = (form.elements.namedItem('address') as HTMLTextAreaElement).value;
      showStep2(modal);
    } else {
      // form.reportValidity(); // Show native validation messages, could be styled further
      // Basic custom validity reporting if needed
      const firstInvalid = form.querySelector(':invalid') as HTMLElement;
      firstInvalid?.focus();
      // Add a class or message for invalid fields if desired
    }
  });

  modal.content.querySelector('.cancel-button')?.addEventListener('click', modal.hide);
}

function showStep2(modal: { element: HTMLDivElement, content: HTMLDivElement, show: () => void, hide: () => void }) {
  modal.content.innerHTML = `
    <h2 id="modal-title-step2">Order OfficeBot - Payment Details (Mock)</h2>
    <form id="paymentDetailsForm" novalidate>
      <div class="form-group">
        <label for="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" required pattern="[0-9]{13,16}" autocomplete="cc-number">
      </div>
      <div class="form-group">
        <label for="expiryDate">Expiry Date (MM/YY):</label>
        <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required pattern="(0[1-9]|1[0-2])\/([0-9]{2})" autocomplete="cc-exp">
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" placeholder="123" required pattern="[0-9]{3,4}" autocomplete="cc-csc">
      </div>
      <div class="order-summary">
        <p>Total Amount: <strong>$${(OFFICEBOT_PRICE * orderDetails.quantity).toFixed(2)}</strong></p>
      </div>
      <div class="modal-actions">
        <button type="button" class="modal-button back-button">Back</button>
        <button type="submit" class="modal-button primary-button">Confirm Order</button>
      </div>
    </form>
  `;
  modal.show();
  modal.element.setAttribute('aria-labelledby', 'modal-title-step2');


  const form = modal.content.querySelector('#paymentDetailsForm') as HTMLFormElement;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      showStep3(modal);
    } else {
      // form.reportValidity();
      const firstInvalid = form.querySelector(':invalid') as HTMLElement;
      firstInvalid?.focus();
    }
  });

  modal.content.querySelector('.back-button')?.addEventListener('click', () => showStep1(modal));
}

function showStep3(modal: { element: HTMLDivElement, content: HTMLDivElement, show: () => void, hide: () => void }) {
  modal.content.innerHTML = `
    <h2 id="modal-title-step3">Order Confirmed!</h2>
    <div class="confirmation-message">
      <p>Thank you for your order, ${orderDetails.name}!</p>
      <p>Your ${orderDetails.quantity} OfficeBot(s) will be shipped to:</p>
      <p><em>${orderDetails.address}</em></p>
      <p>A confirmation email has been notionally sent to <strong>${orderDetails.email}</strong>.</p>
      <p>Total Amount Charged: <strong>$${(OFFICEBOT_PRICE * orderDetails.quantity).toFixed(2)}</strong></p>
      <p class="small-print">Note: This is a demo. No actual order has been placed or payment processed.</p>
    </div>
    <div class="modal-actions">
      <button type="button" class="modal-button primary-button close-button">Close</button>
    </div>
  `;
  modal.show();
  modal.element.setAttribute('aria-labelledby', 'modal-title-step3');
  modal.content.querySelector('.close-button')?.addEventListener('click', modal.hide);
}


// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp(); // DOMContentLoaded has already fired
}

class NotificationSystem {
  constructor() {
    this.container = document.getElementById('notification-container');
  }

  formatDate() {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  show({ title, message, character, duration = 5000 }) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    notification.innerHTML = `
      <div class="character-avatar">
        <img src="${character}" alt="Character">
      </div>
      <div class="notification-content">
        <div class="notification-header">
          <h4 class="notification-title">${title}</h4>
          <span class="notification-date">${this.formatDate()}</span>
        </div>
        ${message ? `<p class="notification-message">${message}</p>` : ''}
      </div>
    `;

    this.container.appendChild(notification);

    if (duration) {
      setTimeout(() => this.close(notification), duration);
    }
  }

  showAnimated({ message, character }) {
    const notification = document.createElement('div');
    notification.className = 'notification animated';
    
    notification.innerHTML = `
      <div class="character-slide">
        <img src="${character}" alt="Character" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="message-bubble">
        <p class="notification-message">${message}</p>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('slide-away');
      setTimeout(() => {
        if (notification.parentElement) {
          notification.parentElement.removeChild(notification);
        }
      }, 500);
    }, 3000);
  }

  close(notification) {
    notification.classList.add('slide-up');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.parentElement.removeChild(notification);
      }
    }, 300);
  }
}

// Initialize the notification system
const notifications = new NotificationSystem();

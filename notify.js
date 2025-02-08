class NotificationSystem {
    constructor() {
      // Create container if it doesn't exist
      if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
      }
      this.container = document.getElementById('notification-container');
    }

    getContrastColor(type) {
      const colors = {
        success: [34, 197, 94],
        error: [239, 68, 68],
        info: [59, 130, 246]
      };
      
      // Always return white text for better visibility
      return '#ffffff';
    }

    show({ type = 'info', title, message, duration = 7000 }) {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      
      const textColor = this.getContrastColor(type);
      notification.style.color = textColor;
      
      const content = `
        <div class="notification-icon">
          ${this.getIcon(type)}
        </div>
        <div class="notification-content">
          <h4 class="notification-title">${title}</h4>
          ${message ? `<p class="notification-message">${message}</p>` : ''}
        </div>
        <button class="notification-close" style="color: ${textColor}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      `;

      notification.innerHTML = content;

      const closeBtn = notification.querySelector('.notification-close');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        this.close(notification);
      });

      this.container.appendChild(notification);

      if (duration) {
        setTimeout(() => this.close(notification), duration);
      }
    }

    close(notification) {
      // Only remove this specific notification
      notification.classList.add('slide-up');
      setTimeout(() => {
        if (notification && notification.parentElement) {
          notification.parentElement.removeChild(notification);
        }
      }, 300);
    }

    getIcon(type) {
      const color = this.getContrastColor(type);
      const icons = {
        success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>`,
        error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>`,
        info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>`
      };
      return icons[type] || icons.info;
    }
  }

  const notifications = new NotificationSystem();

  // Helper functions for easy calling
  function showSuccessNotification(message) {
    notifications.show({
      type: 'success',
      title: 'Success',
      message: message
    });
  }

  function showErrorNotification(message) {
    notifications.show({
      type: 'error',
      title: 'Error',
      message: message
    });
  }

  function showInfoNotification(message) {
    notifications.show({
      type: 'info',
      title: 'Info',
      message: message
    });
  }


window.onload = function() {
    showInfoNotification("Welcome to my portfolio! Feel free to explore my projects and skills.");
    showInfoNotification("<b>Note:<b>🎉🎉 Arcade Section is adding soon...");
  };



   // Add click handler for resume download button
   document.getElementById('download-btn').addEventListener('click', function() {
    // Get the resume file URL/path
    const resumeUrl = "Divyanshu's Resumee.pdf"; // Updated with actual resume path from HTML
    
    // Create temporary link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Divyanshu's Resumee.pdf"; // Match filename from HTML
    
    // Try to trigger download
    try {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notifications.show({
        type: 'success',
        title: 'Success',
        message: 'Resume downloaded successfully!'
      });
    } catch(err) {
      notifications.show({
        type: 'error', 
        title: 'Error',
        message: 'Error downloading resume. Please try again.'
      });
      console.error('Download error:', err);
    }
  });
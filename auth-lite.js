/**
 * CU.APP LITE ID CHECK
 * Simple client-side authentication check
 * No backend required for demo
 */

class CUAuthLite {
  constructor() {
    this.storageKey = 'cu_auth_lite';
    this.user = this.loadUser();
  }

  // Load user from localStorage
  loadUser() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  // Save user to localStorage
  saveUser(user) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      this.user = user;
      return true;
    } catch {
      return false;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.user !== null;
  }

  // Get current user
  getUser() {
    return this.user;
  }

  // Simple login (demo mode)
  login(email, password) {
    // In demo mode, accept any email/password
    const user = {
      id: this.generateId(),
      email: email,
      name: email.split('@')[0],
      authenticated: true,
      loginAt: new Date().toISOString(),
      plan: 'free' // free, pro, enterprise, perpetual
    };

    this.saveUser(user);
    return user;
  }

  // Logout
  logout() {
    localStorage.removeItem(this.storageKey);
    this.user = null;
    window.location.href = '/auth-login.html';
  }

  // Generate simple ID
  generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Check authentication and redirect if needed
  requireAuth(redirectUrl = '/auth-login.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }

  // Check if user has access to adapter
  hasAdapterAccess(adapterId) {
    if (!this.isAuthenticated()) return false;

    const user = this.getUser();

    // Perpetual plan has access to all
    if (user.plan === 'perpetual') return true;

    // Check if user has purchased this specific adapter
    const purchased = user.purchasedAdapters || [];
    return purchased.includes(adapterId);
  }

  // Purchase adapter (demo)
  purchaseAdapter(adapterId, price) {
    if (!this.isAuthenticated()) return false;

    const user = this.getUser();
    user.purchasedAdapters = user.purchasedAdapters || [];

    if (!user.purchasedAdapters.includes(adapterId)) {
      user.purchasedAdapters.push(adapterId);
      this.saveUser(user);
    }

    return true;
  }

  // Upgrade to perpetual
  upgradeToPerpetual() {
    if (!this.isAuthenticated()) return false;

    const user = this.getUser();
    user.plan = 'perpetual';
    user.perpetualLicenseDate = new Date().toISOString();
    this.saveUser(user);

    return true;
  }
}

// Initialize global auth instance
window.cuAuth = new CUAuthLite();

// Auto-show user info in nav if authenticated
document.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.querySelector('[data-auth-signin]');
  const userInfo = document.querySelector('[data-auth-user]');

  if (window.cuAuth.isAuthenticated()) {
    const user = window.cuAuth.getUser();

    // Update UI to show user
    if (signInBtn) {
      signInBtn.textContent = user.email;
      signInBtn.href = '/dashboard.html';
    }

    if (userInfo) {
      userInfo.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-sm">${user.email}</span>
          <span class="text-xs text-white/60">${user.plan}</span>
          <button onclick="window.cuAuth.logout()" class="text-xs text-white/60 hover:text-white">
            Logout
          </button>
        </div>
      `;
    }
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CUAuthLite;
}

/**
 * Navigation History Service
 * Mock browser history dengan state restoration untuk device back
 */

export interface UIState {
  // Scroll position
  scrollY?: number;
  
  // Listing/Catalog state
  filters?: {
    priceRange?: [number, number];
    rating?: number;
    promo?: boolean;
    categories?: string[];
    fresh?: boolean;
    bundle?: boolean;
    preorder?: boolean;
  };
  sort?: string;
  viewMode?: 'grid' | 'list';
  selectedCategory?: string;
  query?: string;
  
  // Tab state (Orders, Account, Admin)
  activeTab?: string;
  
  // Product Detail state
  selectedVariant?: string;
  quantity?: number;
  galleryIndex?: number;
  
  // Modal/Sheet state
  modalOpen?: boolean;
  sheetOpen?: boolean;
  quickViewOpen?: boolean;
  notificationPanelOpen?: boolean;
  
  // Checkout/Cart state
  selectedAddress?: string;
  selectedShipping?: string;
  voucherCode?: string;
  
  // Wizard state (Returns)
  wizardStep?: number;
  
  // Admin state
  adminMenu?: string;
  
  // Form dirty flag
  isDirty?: boolean;
  isProcessing?: boolean;
}

export interface HistoryEntry {
  id: string;
  pageId: string;
  params?: Record<string, any>;
  uiState?: UIState;
  timestamp: number;
}

class NavigationHistory {
  private stack: HistoryEntry[] = [];
  private listeners: Set<() => void> = new Set();
  private guardCallback?: (entry: HistoryEntry) => Promise<boolean>;
  private backBlocked = false;
  private isRestoringFromBack = false;

  // Push new state to history
  push(pageId: string, params?: Record<string, any>, uiState?: UIState) {
    // Clear restoring flag on new navigation
    this.isRestoringFromBack = false;

    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random()}`,
      pageId,
      params,
      uiState,
      timestamp: Date.now(),
    };
    
    this.stack.push(entry);
    this.notifyListeners();
    
    // Limit stack size to prevent memory issues
    if (this.stack.length > 50) {
      this.stack = this.stack.slice(-50);
    }
  }

  // Pop and return previous state
  pop(): HistoryEntry | null {
    if (this.backBlocked) {
      return null;
    }

    if (this.stack.length <= 1) {
      return null; // No history to go back
    }

    // Set flag that we're restoring from back
    this.isRestoringFromBack = true;

    // Remove current state
    this.stack.pop();
    
    // Return previous state (but keep it in stack)
    const previous = this.stack[this.stack.length - 1];
    this.notifyListeners();
    
    return previous || null;
  }

  // Peek at previous state without popping
  peek(): HistoryEntry | null {
    if (this.stack.length <= 1) {
      return null;
    }
    return this.stack[this.stack.length - 2] || null;
  }

  // Get current state
  current(): HistoryEntry | null {
    return this.stack[this.stack.length - 1] || null;
  }

  // Update current state (for UI state changes without navigation)
  updateCurrent(uiState: Partial<UIState>) {
    const current = this.current();
    if (current) {
      current.uiState = {
        ...current.uiState,
        ...uiState,
      };
      this.notifyListeners();
    }
  }

  // Replace current state (for redirects)
  replace(pageId: string, params?: Record<string, any>, uiState?: UIState) {
    if (this.stack.length > 0) {
      this.stack.pop();
    }
    this.push(pageId, params, uiState);
  }

  // Check if can go back
  canGoBack(): boolean {
    return this.stack.length > 1 && !this.backBlocked;
  }

  // Get history length
  length(): number {
    return this.stack.length;
  }

  // Clear history (for logout, etc)
  clear() {
    this.stack = [];
    this.notifyListeners();
  }

  // Reset to specific page
  reset(pageId: string, params?: Record<string, any>, uiState?: UIState) {
    this.stack = [];
    this.push(pageId, params, uiState);
  }

  // Block back navigation (during processing)
  blockBack(blocked: boolean) {
    this.backBlocked = blocked;
  }

  isBackBlocked(): boolean {
    return this.backBlocked;
  }

  // Check if currently restoring from back navigation
  isRestoring(): boolean {
    return this.isRestoringFromBack;
  }

  // Clear restoring flag
  clearRestoringFlag() {
    this.isRestoringFromBack = false;
  }

  // Set guard callback for unsaved changes
  setGuard(callback?: (entry: HistoryEntry) => Promise<boolean>) {
    this.guardCallback = callback;
  }

  // Check if should proceed with back (guard)
  async shouldProceedBack(): Promise<boolean> {
    const current = this.current();
    if (!current) return true;

    // Check if form is dirty
    if (current.uiState?.isDirty && this.guardCallback) {
      return await this.guardCallback(current);
    }

    // Check if processing payment
    if (current.uiState?.isProcessing) {
      return false;
    }

    return true;
  }

  // Subscribe to history changes
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  // Debug helpers
  getStack(): HistoryEntry[] {
    return [...this.stack];
  }

  printStack() {
    console.log('Navigation Stack:', this.stack.map(e => ({
      pageId: e.pageId,
      params: e.params,
      hasUIState: !!e.uiState,
    })));
  }
}

// Singleton instance
export const navigationHistory = new NavigationHistory();

// Helper to capture current scroll position
export function captureScrollPosition(): number {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

// Helper to restore scroll position
export function restoreScrollPosition(scrollY: number) {
  window.scrollTo({
    top: scrollY,
    behavior: 'instant' as ScrollBehavior,
  });
}

// Helper to capture current UI state from various sources
export function captureUIState(overrides?: Partial<UIState>): UIState {
  return {
    scrollY: captureScrollPosition(),
    ...overrides,
  };
}

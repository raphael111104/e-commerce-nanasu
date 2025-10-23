import { useEffect, useCallback, useRef } from 'react';
import { navigationHistory, captureUIState, restoreScrollPosition, type UIState } from '../services/navigationHistory';
import { toast } from 'sonner@2.0.3';

interface UseNavigationHistoryProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  getCurrentUIState?: () => Partial<UIState>;
  onRestoreUIState?: (uiState: UIState) => void;
  enableGuards?: boolean;
}

export function useNavigationHistory({
  currentPage,
  onNavigate,
  getCurrentUIState,
  onRestoreUIState,
  enableGuards = true,
}: UseNavigationHistoryProps) {
  const lastPageRef = useRef(currentPage);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  // Handle device back button
  const handleBack = useCallback(async () => {
    // Check if back is blocked
    if (navigationHistory.isBackBlocked()) {
      toast.error('Mohon tunggu proses selesai...', { duration: 2000 });
      return;
    }

    // Check guards (unsaved changes)
    if (enableGuards) {
      const shouldProceed = await navigationHistory.shouldProceedBack();
      if (!shouldProceed) {
        return;
      }
    }

    // Pop history
    const previousEntry = navigationHistory.pop();
    
    if (!previousEntry) {
      // No history, fallback to catalog
      onNavigate('catalog');
      return;
    }

    // Restore previous page and state
    onNavigate(previousEntry.pageId, previousEntry.params);
    
    // Restore UI state
    if (previousEntry.uiState && onRestoreUIState) {
      // Use requestAnimationFrame + setTimeout to ensure page is fully rendered
      requestAnimationFrame(() => {
        setTimeout(() => {
          onRestoreUIState(previousEntry.uiState!);
          
          // Restore scroll position after state restoration
          if (previousEntry.uiState.scrollY !== undefined) {
            // Use requestAnimationFrame for smoother scroll restoration
            requestAnimationFrame(() => {
              restoreScrollPosition(previousEntry.uiState.scrollY);
            });
          }
        }, 100);
      });
    }
  }, [onNavigate, onRestoreUIState, enableGuards]);

  // Keyboard shortcuts for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Left Arrow
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleBack();
        return;
      }

      // Backspace (only if not in input/textarea)
      if (e.key === 'Backspace') {
        const target = e.target as HTMLElement;
        const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
        const isContentEditable = target.isContentEditable;
        
        if (!isInput && !isContentEditable) {
          e.preventDefault();
          handleBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack]);

  // Touch/swipe gestures for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger from left edge (first 24px)
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      
      if (touch.clientX <= 24) {
        isSwiping.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = Math.abs(touch.clientY - touchStartY.current);

      // Swipe right from edge with minimal vertical movement
      if (deltaX > 80 && deltaY < 50) {
        e.preventDefault();
        isSwiping.current = false;
        handleBack();
      }
    };

    const handleTouchEnd = () => {
      isSwiping.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleBack]);

  // Track page changes and push to history
  useEffect(() => {
    if (currentPage !== lastPageRef.current) {
      // Capture current UI state before page changes
      const uiState = getCurrentUIState ? getCurrentUIState() : captureUIState();
      
      // Push new page to history
      navigationHistory.push(currentPage, undefined, uiState);
      
      lastPageRef.current = currentPage;
    }
  }, [currentPage, getCurrentUIState]);

  // Update current page UI state (for filters, tabs, etc)
  const updateUIState = useCallback((updates: Partial<UIState>) => {
    navigationHistory.updateCurrent(updates);
  }, []);

  // Block/unblock back navigation
  const blockBack = useCallback((blocked: boolean) => {
    navigationHistory.blockBack(blocked);
  }, []);

  // Check if can go back
  const canGoBack = useCallback(() => {
    return navigationHistory.canGoBack();
  }, []);

  return {
    handleBack,
    updateUIState,
    blockBack,
    canGoBack,
  };
}

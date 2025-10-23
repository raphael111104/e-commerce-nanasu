import { useEffect } from 'react';

/**
 * ScrollToTop Component
 * 
 * Utility component to ensure page scrolls to top when mounted
 * Can be used in individual pages if needed
 * 
 * Usage:
 * ```tsx
 * import { ScrollToTop } from './components/ScrollToTop';
 * 
 * function MyPage() {
 *   return (
 *     <>
 *       <ScrollToTop />
 *       <div>Page content...</div>
 *     </>
 *   );
 * }
 * ```
 */

interface ScrollToTopProps {
  behavior?: 'instant' | 'smooth';
  deps?: any[];
}

export function ScrollToTop({ behavior = 'instant', deps = [] }: ScrollToTopProps) {
  useEffect(() => {
    if (behavior === 'instant') {
      // Force immediate scroll to top - most reliable
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      // Smooth scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, deps);

  return null;
}

/**
 * useScrollToTop Hook
 * 
 * Hook version for functional usage
 * 
 * Usage:
 * ```tsx
 * import { useScrollToTop } from './components/ScrollToTop';
 * 
 * function MyPage() {
 *   useScrollToTop(); // Scrolls to top when component mounts
 *   
 *   return <div>Page content...</div>;
 * }
 * ```
 */
export function useScrollToTop(deps: any[] = [], behavior: 'instant' | 'smooth' = 'instant') {
  useEffect(() => {
    if (behavior === 'instant') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, deps);
}

/**
 * Programmatic scroll to top function
 * 
 * Usage:
 * ```tsx
 * import { scrollToTop } from './components/ScrollToTop';
 * 
 * function handleClick() {
 *   // Do something...
 *   scrollToTop(); // Force scroll to top
 * }
 * ```
 */
export function scrollToTop(behavior: 'instant' | 'smooth' = 'instant') {
  if (behavior === 'instant') {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

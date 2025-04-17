import { useEffect, useRef } from 'react';

export default function useResizePanel() {
  const ResizableContainerRef = useRef<HTMLDivElement>(null);
  const MainPanelRef = useRef<HTMLDivElement>(null);
  const ResizeHandleRef = useRef<HTMLDivElement>(null);
  const SidePanelRef = useRef<HTMLDivElement>(null);

  // Store resizing state and start values in refs to persist across renders
  // without causing re-renders themselves.
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  useEffect(() => {
    // --- Capture the current DOM node ---
    // Get the node from the ref *once* when the effect runs.
    const handleElement = ResizeHandleRef.current;
    const mainPanelElement = MainPanelRef.current; // Capture main panel too if needed in cleanup
    const resizableContainerElement = ResizableContainerRef.current; // Capture container too

    // --- Define handlers ---
    // Define handlers *inside* useEffect so they capture the correct elements
    // Or ensure they only rely on refs updated outside (like isResizing, startX, startWidth)
    const handleMouseMove = (e: MouseEvent) => {
      if (
        !isResizing.current ||
        !mainPanelElement ||
        !resizableContainerElement ||
        !handleElement
      )
        return; // Check if elements exist

      const currentX = e.clientX;
      const deltaX = currentX - startX.current;
      let newWidth = startWidth.current + deltaX;

      // --- Minimum/Maximum width constraints ---
      const containerWidth = resizableContainerElement.offsetWidth;
      const handleWidth = handleElement.offsetWidth;
      const minPanelWidth = 100;
      const maxMainWidth = containerWidth - handleWidth - minPanelWidth;

      if (newWidth < minPanelWidth) {
        newWidth = minPanelWidth;
      }
      if (newWidth > maxMainWidth) {
        newWidth = maxMainWidth;
      }

      mainPanelElement.style.flexBasis = `${newWidth}px`;
    };

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;

        // Remove listeners from document
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // Clean up styles
        document.body.classList.remove('no-select');
        if (resizableContainerElement) {
          // Check if element exists before accessing style
          resizableContainerElement.style.cursor = 'auto';
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Check required elements exist before starting resize
      if (!mainPanelElement || !resizableContainerElement) return;

      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = mainPanelElement.offsetWidth || 0;

      document.body.classList.add('no-select');
      resizableContainerElement.style.cursor = 'col-resize';

      // Add listeners to document
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // --- Add event listener ---
    // Check if the handle element actually exists before adding listener
    if (handleElement) {
      handleElement.addEventListener('mousedown', handleMouseDown);
    }

    // --- Return cleanup function ---
    return () => {
      // Use the captured variable 'handleElement' for removal
      // Also remove document listeners if resizing might still be active on unmount
      if (handleElement) {
        handleElement.removeEventListener('mousedown', handleMouseDown);
      }

      // IMPORTANT: Clean up global listeners added to `document` as well!
      // If the component unmounts while dragging, these listeners would leak.
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Optional: Clean up body class if necessary
      document.body.classList.remove('no-select');
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return { ResizableContainerRef, MainPanelRef, ResizeHandleRef, SidePanelRef };
}

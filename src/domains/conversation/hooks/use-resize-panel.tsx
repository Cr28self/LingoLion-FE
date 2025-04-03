import { useEffect, useRef } from "react";

export default function useResizePanel() {
  const ResizableContainerRef = useRef<HTMLDivElement>(null);
  const MainPanelRef = useRef<HTMLDivElement>(null);
  const ResizeHandleRef = useRef<HTMLDivElement>(null);
  const SidePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("resizeEEE");
    console.log(ResizableContainerRef);
    console.log(MainPanelRef);
    console.log(SidePanelRef);
  }, [ResizableContainerRef, MainPanelRef, ResizeHandleRef, SidePanelRef]);

  return { ResizableContainerRef, MainPanelRef, ResizeHandleRef, SidePanelRef };
}

import { useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ToastModalWrapper({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const dispatch = useDispatch();

  const onDismiss = useCallback(() => {
  }, [dispatch]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        // if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/20 h-screen w-screen inset-0 -mt-[16px] -ml-[16px]"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4/5 h-fit"
      >
        {children}
      </div>
    </div>
  );
}

import { useRef } from "react";

export default function ToastModalWrapper({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  return (
    <div
      ref={overlay}
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/40 h-screen w-screen inset-0 -mt-[16px] -ml-[16px]"
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

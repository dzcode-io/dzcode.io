import { useCallback } from "react";

export const useSearchModal = () => {
  const showModal = useCallback(() => {
    (document.getElementById("search-modal") as HTMLDialogElement)?.showModal();
  }, []);

  const hideModal = useCallback(() => {
    (document.getElementById("search-modal") as HTMLDialogElement).hidePopover();
  }, []);

  return {
    showModal,
    hideModal,
  };
};

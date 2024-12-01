import Modal from "@mui/material/Modal";
import { useGlobal } from "@/zustand/useGlobal";

export default function PinCodeModal({ children, onCloseFunction }) {
  const { openPinModal, setPinOpenModal } = useGlobal();

  return (
    <div>
      <Modal
        open={openPinModal}
        onClose={() => {
          setPinOpenModal();
          onCloseFunction();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 shadow-lg  w-[40.125rem] h-[40.07rem] rounded-2xl bg-white">
          {children}
        </div>
      </Modal>
    </div>
  );
}

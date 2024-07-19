import Modal from "react-modal";

import { SleepChartModalProps } from "../../types/types";
import UserSleepChart from "./SleepChart";

const SleepChartModal = ({
  isOpen,
  onRequestClose,
  userName
}: SleepChartModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Sleep Chart"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)"
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "80%",
          width: "600px"
        }
      }}
    >
      <h2 className="text-2xl font-bold mb-4">{userName}'s Sleep Chart</h2>
      {userName && <UserSleepChart userName={userName} />}

      <div className="w-full m-auto flex justify-end">
        <button onClick={onRequestClose} className=" btn btn-primary ">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SleepChartModal;

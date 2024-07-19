import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import { getAllSleepEntries } from "@/api/sleepEntryApi";

import { ISleepSummary } from "@/types/schemas";
import SleepChartModal from "./SleepChartModal";

const SleepTable = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const {
    data: entries,
    isLoading,
    error
  } = useQuery<ISleepSummary[], Error>({
    queryKey: ["sleepEntries"],
    queryFn: getAllSleepEntries
  });

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleRowClick = (userName: string) => {
    setSelectedUser(userName);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const tableClasses = "overflow-x-auto w-full m-auto mt-10 md:w-3/5";

  if (isLoading) {
    return (
      <div className={`${tableClasses} p-4`}>
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${tableClasses} p-4`}>
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">Error</p>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${tableClasses} p-4`}>
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>Name</th>
            <th>Gender</th>
            <th>Total Entries</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No entries available, please create one.
              </td>
            </tr>
          ) : (
            entries.map((entry: ISleepSummary, index: number) => (
              <tr
                key={index}
                onClick={() => handleRowClick(entry.name)}
                className="cursor-pointer"
              >
                <th>{entry.name}</th>
                <td>{entry.gender}</td>
                <td>{entry.entryCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <SleepChartModal
        isOpen={!!selectedUser}
        onRequestClose={closeModal}
        userName={selectedUser}
      />
    </div>
  );
};

export default SleepTable;

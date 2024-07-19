import { Route, Routes } from "react-router-dom";

import EntryForm from "@/components/EntryForm";
import Navbar from "@/components/layout";
import SleepTable from "@/components/SleepEntry";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SleepTable />} />
        <Route path="/add" element={<EntryForm />} />
      </Routes>
    </>
  );
};

export default App;

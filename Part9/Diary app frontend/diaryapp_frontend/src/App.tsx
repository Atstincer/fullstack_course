import { useState, useEffect } from "react";
import type { DiaryEntry } from "./types";
import { getDiaryEntries } from "./services/diaryEntriesService";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaryEntries().then((data) => {
      //console.log("response.data in component", data);
      setEntries(data);
    });
  }, []);

  const onEntryAdded = (entryAdded: DiaryEntry) => {
    setEntries(entries.concat(entryAdded));
  };

  return (
    <div>
      <NewDiaryEntryForm onEntryAdded={onEntryAdded} />
      <DiaryEntries entries={entries} />
    </div>
  );
};

export default App;

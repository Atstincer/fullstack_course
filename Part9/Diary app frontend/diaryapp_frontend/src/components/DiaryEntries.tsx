import { useState, useEffect } from "react";
import { getDiaryEntries } from "../services/diaryEntriesService";
import type { DiaryEntry } from "../types";

const DiaryEntries = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaryEntries().then((data) => {
      console.log("response.data in component", data);
      setEntries(data);
    });
  }, []);

  return (
    <div>
      <h1>Diary entries</h1>
      {entries && (
        <ul>
          {entries.map((e) => (
            <li key={e.id}>
              <div>
                <h3>{e.date}</h3>
                <div>visibility:{e.visibility}</div>
                <div>weather:{e.weather}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiaryEntries;

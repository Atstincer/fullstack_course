import type { DiaryEntriesProps } from "../types";

const DiaryEntries = (props: DiaryEntriesProps) => {
  const entries = props.entries;
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

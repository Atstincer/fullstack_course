import { useState } from "react";
import { addNewDiaryEntry } from "../services/diaryEntriesService";
import type { NewDiaryEntry, NewDiaryEntryFormProps } from "../types";

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setweather] = useState("");
  const [comment, setComment] = useState("");

  const addNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    } as NewDiaryEntry;
    console.log("trying to add newEntry:", newEntry);
    addNewDiaryEntry(newEntry).then((created) => {
      props.onEntryAdded(created);
    });
  };

  return (
    <form onSubmit={addNewEntry}>
      <h2>New entry</h2>
      <div>
        date:
        <input
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
      </div>
      <div>
        visibility:
        <input
          value={visibility}
          onChange={(event) => {
            setVisibility(event.target.value);
          }}
        />
      </div>
      <div>
        weather:
        <input
          value={weather}
          onChange={(event) => {
            setweather(event.target.value);
          }}
        />
      </div>
      <div>
        comment:
        <input
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
      </div>
      <button>add</button>
    </form>
  );
};

export default NewDiaryEntryForm;

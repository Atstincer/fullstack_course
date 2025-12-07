import { useState } from "react";
import { addNewDiaryEntry } from "../services/diaryEntriesService";
import type { NewDiaryEntry, NewDiaryEntryFormProps } from "../types";
import axios from "axios";

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setweather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    } as NewDiaryEntry;
    console.log("trying to add newEntry:", newEntry);
    try {
      const response = await addNewDiaryEntry(newEntry);
      props.onEntryAdded(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("axios error code", e.response);
        setErrorMsg(e.response?.data);
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <form onSubmit={addNewEntry}>
      <h2>New entry</h2>
      {errorMsg && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>
      )}
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

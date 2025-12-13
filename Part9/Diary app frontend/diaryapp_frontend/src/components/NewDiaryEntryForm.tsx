import { useState } from "react";
import { addNewDiaryEntry } from "../services/diaryEntriesService";
import {
  VISIBILITIES,
  WEATHER,
  type NewDiaryEntry,
  type NewDiaryEntryFormProps,
  type Visibility,
  type Weather,
} from "../types";
import axios from "axios";
import { getCurrentDate } from "../util";

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState(getCurrentDate());
  const [visibility, setVisibility] = useState<Visibility>(VISIBILITIES[0]);
  const [weather, setWeather] = useState<Weather>(WEATHER[0]);
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
    //console.log("trying to add newEntry:", newEntry);
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
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
      </div>
      {}
      <div>
        visibility:
        {VISIBILITIES.map((v) => (
          <span key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              id={v}
              checked={visibility === v}
              onChange={(event) => {
                setVisibility(event.target.value as Visibility);
              }}
            />
            <label htmlFor={v}>{v}</label>
          </span>
        ))}
      </div>

      <div>
        weather:
        {WEATHER.map((v) => (
          <span key={v}>
            <input
              type="radio"
              name="weather"
              value={v}
              id={v}
              checked={weather === v}
              onChange={(event) => {
                setWeather(event.target.value as Weather);
              }}
            />
            <label htmlFor={v}>{v}</label>
          </span>
        ))}
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

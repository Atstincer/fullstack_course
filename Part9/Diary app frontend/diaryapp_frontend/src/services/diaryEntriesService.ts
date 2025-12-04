import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseURL = "http://localhost:3000/api/diaries";

const getDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseURL).then((response) => {
    //console.log("response.data in diaryEntriesService: ", response.data);
    return response.data;
  });
};

const addNewDiaryEntry = (newDiaryEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseURL, newDiaryEntry)
    .then((response) => response.data);
};

export { getDiaryEntries, addNewDiaryEntry };

import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseURL = "http://localhost:3000/api/diaries";

const getDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseURL).then((response) => {
    //console.log("response.data in diaryEntriesService: ", response.data);
    return response.data;
  });
};

const addNewDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseURL, newDiaryEntry);
  return response;
};

export { getDiaryEntries, addNewDiaryEntry };

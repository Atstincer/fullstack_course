import axios from "axios";
import type { DiaryEntry } from "../types";

const baseURL = "http://localhost:3000/";

const getDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseURL + "api/diaries").then((response) => {
    //console.log("response.data in diaryEntriesService: ", response.data);
    return response.data;
  });
};

export { getDiaryEntries };

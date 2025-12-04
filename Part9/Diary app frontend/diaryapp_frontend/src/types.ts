type Weather = "rainy" | "sonny" | "windy" | "cloudy";
type Visibility = "good" | "poor";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export interface DiaryEntriesProps {
  entries: DiaryEntry[];
}

export interface NewDiaryEntryFormProps {
  onEntryAdded: (entryAdded: DiaryEntry) => void;
}

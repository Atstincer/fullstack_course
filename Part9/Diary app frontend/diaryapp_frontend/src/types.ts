export const VISIBILITIES = ["good", "poor", "great", "ok"] as const;
export const WEATHER = ["rainy", "sonny", "windy", "cloudy"] as const;

export type Weather = (typeof WEATHER)[number];
export type Visibility = (typeof VISIBILITIES)[number];

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

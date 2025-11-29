type Weather = "rainy" | "sonny" | "windy" | "cloudy";
type Visibility = "good" | "poor";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

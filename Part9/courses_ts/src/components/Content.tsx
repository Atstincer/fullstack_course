import type { ContentProps } from "../types";
import Part from "./Part";

const Content = (props: ContentProps) => {
  const courseParts = props.courseParts;
  return (
    <div>
      {courseParts.map((part, index) => {
        return <Part part={part} key={index} />;
      })}
    </div>
  );
};

export default Content;

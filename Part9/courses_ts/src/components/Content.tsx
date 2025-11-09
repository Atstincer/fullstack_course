import type { ContentProps } from "../types";

const Content = (props: ContentProps) => {
  const courseParts = props.courseParts;
  return (
    <div>
      {courseParts.map((part, index) => {
        return (
          <p key={index}>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;

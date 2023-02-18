import styled from "styled-components";
import ContextPicker from "./ContextPicker";

interface ContextProps {
  allSeries: string[];
  series: string;
  handler: (s: string) => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function SeriesNavigator({
  allSeries,
  series,
  handler,
}: ContextProps) {
  return (
    <Wrapper>
      <ContextPicker
        name="Series"
        current={series}
        handler={handler}
        options={allSeries}
      />
    </Wrapper>
  );
}

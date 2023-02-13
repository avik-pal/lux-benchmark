import styled from "styled-components";
import ContextPicker from "./ContextPicker";

interface ContextProps {
  allSeries: string[],
  series: string;
  setSeries: (s: string) => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default function SeriesNavigator({
  allSeries,
  series,
  setSeries
}: ContextProps) {
  return (
    <Wrapper>
      <ContextPicker
        name="Series"
        current={series}
        handler={(s) => setSeries}
        options={allSeries}
      />
    </Wrapper>
  );
}

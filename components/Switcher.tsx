import * as Switch from "@radix-ui/react-switch";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

export default function Switcher({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: () => void;
}) {
  return (
    <Wrapper>
      <label className="Label" style={{ paddingRight: 15 }}>
        Snapshot
      </label>
      <Switch.Root
        className="SwitchRoot"
        id="airplane-mode"
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
      <label className="Label" style={{ paddingLeft: 15 }}>
        Time Series
      </label>
    </Wrapper>
  );
}

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
}

#__next {
  isolation: isolate;
}

button {
  all: unset;
}

.SwitchRoot {
  width: 42px;
  height: 25px;
  background-color: cornflowerblue;
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.SwitchRoot:focus {
  box-shadow: 0 0 0 2px cornflowerblue;
}
.SwitchRoot[data-state="checked"] {
  background-color: cornflowerblue;
}

.SwitchThumb {
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
}
.SwitchThumb[data-state="checked"] {
  transform: translateX(19px);
}

.Label {
  color: black;
  font-size: 15px;
  line-height: 1;
}
`;

export default GlobalStyles;

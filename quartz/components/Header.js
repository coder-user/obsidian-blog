import { jsx as _jsx } from "preact/jsx-runtime";
function Header({ children }) {
    return children.length > 0 ? _jsx("header", { children: children }, void 0) : null;
}
Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`;
export default (() => Header);
satisfies;
QuartzComponentConstructor;

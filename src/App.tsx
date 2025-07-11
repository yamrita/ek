import ReactDOM from "react-dom/client";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: ek</div>
    <div>Framework: react-19</div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
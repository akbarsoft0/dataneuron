import React from "react";
import { Link } from "react-router-dom";
import Split from "react-split";

function Task1() {
  return (
    <>
      <Link to="/next">task 2</Link>
      <div className="resize-box">
        <Split direction="vertical" sizes={[70, 30]} style={{ height: "100%" }}>
          <Split className="flex" sizes={[30, 70]}>
            <div style={{ background: "#d1d5db" }}>a</div>
            <div style={{ background: "#b1b5bc" }}>b</div>
          </Split>
          <div style={{ background: "#9ca3af" }}>c</div>
        </Split>
      </div>
    </>
  );
}

export default Task1;

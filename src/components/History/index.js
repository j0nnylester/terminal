import React from "react";
import css from "./History.module.css";

const History = props => (
    <div className={css.history}>
        <span className={css.prompt}>$ </span>
        {props.item.cmd}
        <br />
        {props.item.output}
    </div>
);

export default History;

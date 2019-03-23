import React from "react";
import css from "./TitleBar.module.css";

const TitleBar = props => {
    return (
        <div className={css.titleBar}>
            <div className={css.circles}>
                <div
                    className={css.circle}
                    style={{ backgroundColor: "red" }}
                    onClick={props.windowClose}
                />
                <div
                    className={css.circle}
                    style={{ backgroundColor: "orange" }}
                    onClick={props.windowMin}
                />
                <div
                    className={css.circle}
                    style={{ backgroundColor: "green" }}
                    onClick={props.windowMax}
                />
            </div>
            <div className={css.title}>
                <span className={css.path}>{props.path}</span>
                <span> - </span>
                <span>{props.title}</span>
            </div>
        </div>
    );
};

export default TitleBar;

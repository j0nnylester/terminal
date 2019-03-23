import React from "react";
import css from "./Title.module.css";

const Title = props => {
    const { title } = props;
    return <h1 className={css.title}>{title}</h1>;
};

export default Title;

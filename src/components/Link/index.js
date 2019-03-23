import React from "react";
import css from "./Link.module.css";

const Link = props => {
    const { url, title } = props;
    return (
        <a className={css.link} href={url}>
            {title}
        </a>
    );
};

export default Link;

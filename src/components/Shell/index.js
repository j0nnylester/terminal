import React from "react";
import css from "./Shell.module.css";

const Shell = props => {
    return (
        <div className={css.textareawithprompt}>
            <span className={css.prompt}>$</span>
            <textarea
                rows={34}
                cols={90}
                autoFocus
                name="shell"
                onChange={props.handleChange}
                onKeyUp={props.handleKeyUp}
                value={props.value}
                className={css.shell}
            />
        </div>
    );
};

export default Shell;

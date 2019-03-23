import React from "react";
import css from "./Terminal.module.css";

import TitleBar from "../TitleBar";
import History from "../History";
import Shell from "../Shell";

const gistUrl =
    "https://gist.githubusercontent.com/j0nnylester/891d5c836d35a88d0d1db7f1e31d6800/raw/e86651b50465b051301ef3488b528d49c3cb4a3f/aboutme.json";
class Terminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winWidth: 60,
            winHeight: 70,
            help:
                "links - show links to other pages\naboutme - a little bit about me\ncontact - show contact detail",
            aboutme: "",
            contact: "",
            links: "",
            value: "",
            cmd_history: [
                {
                    cmd: "type 'help' for a list of all commands",
                    output: ""
                }
            ]
        };
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState(() => ({
            value: value
        }));
    };

    windowClose = () => {
        window.close();
    };

    windowMin = () => {
        this.setState(() => ({
            winHeight: 0
        }));
    };

    windowMax = () => {
        this.setState(() => ({
            winHeight: 90,
            winWidth: 95
        }));
    };

    printOutput = value => {
        this.setState(() => ({
            cmd_history: [
                ...this.state.cmd_history,
                { cmd: value, output: this.state[value] }
            ]
        }));
    };

    handleKeyUp = event => {
        const { key, target } = event;
        const [command] = target.value.toLowerCase().split(" ");
        if (key === "Enter") {
            switch (command.trim()) {
                case "links":
                    this.printOutput("links");
                    break;
                case "aboutme":
                    this.printOutput("aboutme");
                    break;
                case "help":
                    this.printOutput("help");
                    break;
                case "exit":
                    window.close();
                    break;
                default:
                    this.setState(() => ({
                        cmd_history: [
                            ...this.state.cmd_history,
                            {
                                cmd: command.trim(),
                                output: `${command.trim()}: command not found`
                            }
                        ]
                    }));
            }
            this.setState(() => ({
                value: ""
            }));
        }
    };

    componentDidMount() {
        //fetch about me
        fetch(`${gistUrl}`)
            .then(res => res.json())
            .then(data => {
                this.setState(() => ({
                    aboutme: data.aboutme,
                    contact: data.contact,
                    links: data.links
                }));
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div
                className={css.window}
                style={{
                    width: `${this.state.winWidth}vw`,
                    height: `${this.state.winHeight}vh`
                }}
            >
                <TitleBar
                    path="/"
                    title="j0nnylester"
                    windowClose={this.windowClose}
                    windowMin={this.windowMin}
                    windowMax={this.windowMax}
                />
                <div className={css.view}>
                    {this.state.cmd_history.map((item, index) => (
                        <History item={item} key={index} />
                    ))}
                    <Shell
                        handleKeyUp={this.handleKeyUp}
                        handleChange={this.handleChange}
                        value={this.state.value}
                    />
                </div>
            </div>
        );
    }
}
export default Terminal;

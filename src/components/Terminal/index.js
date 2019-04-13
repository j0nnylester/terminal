import React from "react";
import css from "./Terminal.module.css";

import TitleBar from "../TitleBar";
import History from "../History";
import Shell from "../Shell";

// const commitID = "a4760a499d51fe9aa87b0ce83aac660a981e233c";
const gistID = process.env.REACT_APP_GIST_ID;
const gistURL = `https://gist.githubusercontent.com/j0nnylester/${gistID}/raw/aboutme.json`;
class Terminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winMin: false,
            winMax: false,
            winWidth: 60,
            winHeight: 70,
            help:
                "links - show links to other pages\naboutme - a little bit about me\ncontact - show contact detail",
            aboutme: "",
            contact: "",
            links: "",
            projects: "",
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

    windowMin = state => {
        this.setState(state => ({
            winHeight: 0,
            winMin: !state.winMin
        }));
    };

    windowMax = state => {
        this.setState(state => ({
            winMax: !state.winMax,
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
                case "help":
                    this.printOutput("help");
                    break;
                case "links":
                    this.printOutput("links");
                    break;
                case "aboutme":
                    this.printOutput("aboutme");
                    break;
                case "contact":
                    this.printOutput("contact");
                    break;
                case "projects":
                    this.printOutput("projects");
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
        fetch(`${gistURL}`)
            .then(res => res.json())
            .then(data => {
                this.setState(() => ({
                    aboutme: data.aboutme,
                    contact: data.contact,
                    links: data.links,
                    projects: data.projects
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

import React, { Component } from "react";
import whiteLogo from "./assets/whiteLogo.svg";
import blackLogo from "./assets/blackLogo.svg";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import Axios from "axios";

const dests = [
    {
        label: "VA",
        value: "vatriume"
    },
    {
        label: "NU Market",
        value: "market"
    },
    {
        label: "NU Ladies",
        value: "ladies"
    },
    {
        label: "NU Tumba",
        value: "tumba"
    }
];

class App extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            destination: "vatriume",
            notify: false,
            whiteTheme: false
        };
        this.check = this.check.bind(this)
        this.generateClass = this.generateClass.bind(this)
        this.toggleTheme = this.toggleTheme.bind(this)
    }
    componentDidMount() {
        const theme = localStorage.getItem("theme") || "dark"
        const whiteTheme = (theme !== "dark")
        document.body.style.background = (!whiteTheme ? "#222222" : "#ffffff")
        this.setState({
            whiteTheme
        })
    }
    generateClass(className) {
        return className + (this.state.whiteTheme ? " white" : "")
    }
    toggleTheme(e) {
        e.preventDefault()
        this.setState(prevState => {
            document.body.style.background = prevState.whiteTheme ? "#222222" : "#ffffff"
            const theme = localStorage.getItem("theme") || "dark"
            localStorage.setItem("theme", theme === "dark" ? "white" : "dark")
            return {
                whiteTheme: !prevState.whiteTheme
            }
        })
    }
    check() {
        if (this.state.text === "") {
            return this.notify("Запись пуста");
        }
        Axios({
          url: "http://vatriume.kz/api/store_suggestion.php",
          method: "GET",
          params: {
            text: this.state.text,
            destination: this.state.destination,
            timestamp: (new Date()).toString()
          }
        }).then(()=>{
          this.notify("Ваша запись была отправлена.")
          this.setState({
            text: ""
          })
        }).catch(()=>{
          this.notify("Ошибка при отправке")
        })
    }
    notify(text) {
        this.setState({
            notify: true,
            notifyText: text
        }, () => {
            setTimeout(() => {
                this.setState({
                    notify: false
                })
            }, 2500);
        });
    }
    render() {
        return (
            <div className={this.generateClass("App")}>
                <form onSubmit={e=>{
                  e.preventDefault()
                  this.check()
                }} className={this.generateClass("container")}>
                    <img className="logo" src={this.state.whiteTheme ? blackLogo : whiteLogo} alt="VA Logo" />
                    <div className="row">
                        <label htmlFor="text">Текст записи:</label>
                        {/* <button className="toggler" onClick={this.toggleTheme}>Toggle</button> */}
                        <div className="toggler" onClick={this.toggleTheme}>
                            <img 
                                src={moon} 
                                className="toggler-image" 
                                alt="Moon"
                                style={{
                                    marginLeft: "5px",
                                    opacity: this.state.whiteTheme ? 0 : 1 
                                }}
                            />
                            <img
                                src={sun} 
                                className="toggler-image" 
                                alt="Sun"
                                style={{
                                    marginRight: "5px",
                                    opacity: !this.state.whiteTheme ? 0 : 1 
                                }} 
                            />
                            <span 
                                className="toggler-button" 
                                style={{
                                    transform: !this.state.whiteTheme ? "translateX(26px)" : "none"
                                }}
                            />
                        </div>
                    </div>
                    <textarea
                        placeholder="Напишите что-нибудь…"
                        id="text"
                        className={this.generateClass()}
                        onChange={e =>
                            this.setState({
                                text: e.target.value,
                                notify: false
                            })
                        }
                        value={this.state.text}
                    />
                    <label>Эта запись предназначена для:</label>
                    <div className={this.generateClass("switch")}>
                        {dests.map(el => (
                            <div
                                key={el.value}
                                onClick={() =>
                                    this.setState({
                                        destination: el.value
                                    })
                                }
                                className={this.generateClass(this.state.destination === el.value ? "switch-item selected" : "switch-item")}
                            >
                                {el.label}
                            </div>
                        ))}
                    </div>
                    <button className={this.generateClass("button")}>Предложить запись</button>
                </form>
                <div className={this.generateClass(this.state.notify ? "notify show" : "notify")}>{this.state.notifyText}</div>
            </div>
        );
    }
}

export default App;

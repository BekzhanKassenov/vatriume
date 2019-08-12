import React, { Component } from "react";
import logo from "./logo.svg";
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
            notify: false
        };
        this.check = this.check.bind(this)
    }
    check() {
        if (this.state.text === "") {
            return this.notify("Запись пуста");
        }
        Axios({
          url: 'http://vatriume.kz/api/store_suggestion.php',
          method: "GET",
          params: {
            text: this.state.text,
            destination: this.state.destination,
            timestamp: (new Date()).toString()
          }
        }).then(()=>{
          this.notify("Ваша запись была отправлена.")
          this.setState({
            text: ''
          })
        }).catch(()=>{
          this.notify("Ошибка при отправке")
        })
    }
    notify(text) {
        this.setState({
            notify: true,
            notifyText: text
        });
    }
    render() {
        return (
            <div className="App">
                <form onSubmit={e=>{
                  e.preventDefault()
                  this.check()
                }} className="container">
                    <img className="logo" src={logo} alt="VA Logo" />
                    <label htmlFor="text">Текст записи:</label>
                    <textarea
                        placeholder="Напишите что-нибудь…"
                        id="text"
                        onChange={e =>
                            this.setState({
                                text: e.target.value,
                                notify: false
                            })
                        }
                        value={this.state.text}
                    />
                    <label>Эта запись предназначена для:</label>
                    <div className="switch">
                        {dests.map(el => (
                            <div
                                key={el.value}
                                onClick={() =>
                                    this.setState({
                                        destination: el.value
                                    })
                                }
                                className={this.state.destination === el.value ? "switch-item selected" : "switch-item"}
                            >
                                {el.label}
                            </div>
                        ))}
                    </div>
                    <button className="button">Предложить запись</button>
                </form>
                <footer>made by <a href="https://vk.com/nuwdc">NUWDC</a></footer>
                <div className={this.state.notify ? "notify show" : "notify"}>{this.state.notifyText}</div>
            </div>
        );
    }
}

export default App;

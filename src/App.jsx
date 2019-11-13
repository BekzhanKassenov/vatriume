import React, { Component } from "react";
import axios from "axios";
import whiteLogo from "./assets/whiteLogo.svg";
import blackLogo from "./assets/blackLogo.svg";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";

const dests = [
  {
    label: "VA",
    value: "vatriume",
  },
  {
    label: "NU Market",
    value: "market",
  },
  {
    label: "NU Ladies",
    value: "ladies",
  },
  {
    label: "NU Tumba",
    value: "tumba",
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      destination: "vatriume",
      notify: false,
      whiteTheme: false,
    };
    this.check = this.check.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    const theme = localStorage.getItem("theme") || "dark";
    const whiteTheme = theme !== "dark";
    document.body.style.background = !whiteTheme ? "#222222" : "#ffffff";
    this.setState({
      whiteTheme,
    });
  }

  toggleTheme(e) {
    e.preventDefault();
    this.setState(prevState => {
      document.body.style.background = prevState.whiteTheme
        ? "#222222"
        : "#ffffff";
      localStorage.setItem("theme", prevState.whiteTheme ? "dark" : "white");
      return {
        whiteTheme: !prevState.whiteTheme,
      };
    });
  }

  check() {
    if (this.state.text === "") {
      this.notify("Запись пуста");
    } else {
      axios({
        url: "/api/store_suggestion.php",
        method: "GET",
        params: {
          text: this.state.text,
          destination: this.state.destination,
          timestamp: new Date().toString(),
        },
      })
        .then(() => {
          this.notify("Ваша запись была отправлена.");
          this.setState({
            text: "",
          });
        })
        .catch(() => {
          this.notify("Ошибка при отправке");
        });
    }
  }

  notify(text) {
    this.setState(
      {
        notify: true,
        notifyText: text,
      },
      () => {
        setTimeout(() => {
          this.setState({
            notify: false,
          });
        }, 2500);
      }
    );
  }

  render() {
    return (
      <div className={`App${this.state.whiteTheme ? " white" : ""}`}>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.check();
          }}
          className="container"
        >
          <img
            className="logo"
            src={this.state.whiteTheme ? blackLogo : whiteLogo}
            alt="VA Logo"
          />
          <div className="row">
            <label htmlFor="text">Текст записи:</label>
            <div className="toggler" onClick={this.toggleTheme}>
              <img
                src={moon}
                className="toggler-image"
                alt="Moon"
                style={{
                  marginLeft: "5px",
                  opacity: this.state.whiteTheme ? 0 : 1,
                }}
              />
              <img
                src={sun}
                className="toggler-image"
                alt="Sun"
                style={{
                  marginRight: "5px",
                  opacity: !this.state.whiteTheme ? 0 : 1,
                }}
              />
              <span
                className="toggler-button"
                style={{
                  transform: !this.state.whiteTheme
                    ? "translateX(26px)"
                    : "none",
                }}
              />
            </div>
          </div>
          <textarea
            placeholder="Напишите что-нибудь…"
            id="text"
            onChange={e =>
              this.setState({
                text: e.target.value,
                notify: false,
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
                    destination: el.value,
                  })
                }
                className={
                  this.state.destination === el.value
                    ? "switch-item selected"
                    : "switch-item"
                }
              >
                {el.label}
              </div>
            ))}
          </div>
          <button className="button">Предложить запись</button>
        </form>
        <div className={this.state.notify ? "notify show" : "notify"}>
          {this.state.notifyText}
        </div>
      </div>
    );
  }
}

export default App;

import React from "react"
import "./Chat.css"

const uuidv4 = require('uuid/v4');

class Chat extends React.Component {
  state = {
    messages: [],
    input: "",
    styles: {
      me: {justifyContent:"flex-start"},
      opponent: {justifyContent:"flex-end"}
    }
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  formatMessage(msg){
    return msg.split(" ").map(word => {
      if(word !== ""){
        return (
          <div className="word" key={uuidv4()}>
            {`${word} `}
          </div>
        )
      }
    })
  }
  

  sendMessage = (e) => {
    if (e.key === "Enter" && this.state.input) {
      this.props.socket.emit("sendMessage", this.state.input)
      this.setState((prevState) => {
        return {
          messages: [
            {text: prevState.input, style: this.state.styles.me },
            ...prevState.messages],
          input: ""
        }
      });
    }
  }

  componentDidMount() {
    this.props.socket.on("receiveMessage", (message) => {
      this.setState((prevState) => {
        return {
          messages: [{text: message, style: this.state.styles.opponent },
          ...prevState.messages]
        }
      });
    })
  }

  componentWillUnmount(){
    this.props.socket.removeAllListeners("receiveMessage");
  }

  render() {
    const renderMessages = () => {
      return <div className="messages">
          {this.state.messages.map(message => {
            return (
              <div 
                className="msg"
                style={message.style}
                key={uuidv4()}>
                <div 
                  className="message"
                  key={uuidv4()} 
                >
                  {this.formatMessage(message.text)}
                </div>
              </div>
            )
          })}
        </div>
    }


    return (
      <div className="chat">
        {renderMessages()}
        <div className="messageInput">
          <input type="text"
            spellCheck="false"
            value={this.state.input}
            onKeyUp={this.sendMessage}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default Chat
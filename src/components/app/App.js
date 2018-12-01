import React, { Component } from 'react'
import MessageList from '../message-list/message-list'
import Toolbar from '../toolbar/toolbar'
import Compose from '../compose/compose'
import template from '../template/template'

import './App.css'


class App extends Component {

  constructor(){
    super()
    this.state = {
      selectedMessages: new Set(),
      isComposing: false,
  }
    // The following is loaded in componentDidMount
    // messages: [ {
    //  {
    //     "body": "random text",
    //     "id": num,
    //     "labels": [],
    //     "read": true,
    //     "starred": true,
    //     "subject": "random text"
    //  },
    //  {...} ]
  }
  

  /* 
  
  load the current state of the books 

  */
  async componentDidMount() {
    // console.log('App:componentDidMount()')
    this.loadMessages()
  }

  /*
  
  Compose Message Toolbar-Button Handling

  */
  openComposeMessage = () => {
    this.setState({ compose: !this.state.compose })
  }

  composeMessage = async (post) => {
    // console.log('compose message', post.subject, post.body)
    let body = {
      subject: post.subject,
      body: post.body
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    })
    console.log('POST response', response)
    this.loadMessages()
  }

  /* 
  
  toggle starred state

  */
  toggleFavorite = async (id) => {
    // console.log(`App:toggleFavorite(${id})`)
    await template.asyncToggleFavorite(id)
    this.loadMessages()
  }

 /*
  
  Update State Of Messages

  */
  async loadMessages() {
    console.log('App:loadMessages()')
    let messages = []
    try {
      messages = await template.asyncLoadMessages()
    } catch (err) {
      console.log('ERROR loadMessages(): ', err)
      messages = [
        {
          body: 'no body',
          id: 0,
          labels: [],
          read: true,
          starred: true,
          subject: 'ERROR: backend db server needs to be started: collective-api application',
        },
      ]
    }
    this.setState({
      messages,
    })
  }

  render() {
    const { messages } = this.state
    return (
      <div className="container App">
        <Toolbar 
          openComposeMessage={this.openComposeMessage.bind(this)}
        />
        {this.state.compose ? <Compose openComposeMessage={this.openComposeMessage} composeMessage={this.composeMessage} /> : null}
        <MessageList
          messages={messages}
          toggleFavoriteCB={this.toggleFavorite}
        />
      </div>
    )
  }
}

export default App




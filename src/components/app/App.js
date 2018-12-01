import React, { Component } from 'react'
import MessageList from '../message-list/message-list'
import Toolbar from '../toolbar/toolbar'
import Compose from '../compose/compose'

import './App.css'


class App extends Component {

  constructor() {
    super()
    this.state = {
    }
    this.API = `${process.env.REACT_APP_API_URL}/messages`
  }

  /*

  Load Books

  */

  async componentDidMount() {
    await this.loadCurrentMessages()
  }

  /*
  
  Compose Message Toolbar-Button Handling

  */
  openComposeMessage = () => {
    this.setState({ compose: !this.state.compose })
  }

  composeMessage = async (post) => {
    console.log('compose message', post.subject, post.body)
    let body = {
      subject: post.subject,
      body: post.body
    }

    const response = await fetch(this.API, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    })
    console.log('POST response', response)
    this.loadCurrentMessages()
  }

  /* 

  Toggle Star State of Single Message

  */

  toggleFavorite = async (id) => {
    console.log(`app.js: toggleFavorite(${id})`)
    let body = {
      messageIds: [id],
      command: 'star',
    }
    const response = await fetch(this.API, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
    const resJSON = await response.json()
    this.setState({
      ...this.state,
      messages: resJSON
    })
    this.loadCurrentMessages()
  }

  // toggleFavorite = async id => {
  //   console.log(`app.js: toggleFavorite(${id})`)
  //   const response = await fetch(this.API, {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       messageIds: [id],
  //       command: 'star'
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const responseJSON = await response.json()
  //   console.log('response', response)
  //   this.setState({
  //     ...this.state,
  //     messages: responseJSON
  //   })
  // }


  /*
 
 API Call To Get Current Message State From Database

 */
  loadCurrentMessages = async () => {
    const response = await fetch(this.API)
    if (response.status === 200) {
      let resJson = await response.json()
      resJson.forEach(message => message.selected = false)
      console.log('resJson', resJson)
      this.setState({
        ...this.state,
        messages: resJson
      })
    } else {
      console.log('GET request failed', response)
      throw new Error('GET request failed')
    }
  }


  render() {
    const { messages } = this.state
    return (
      <div className="App">
        <Toolbar 
          openComposeMessage={this.openComposeMessage.bind(this)}
        />
        {this.state.compose ? <Compose openComposeMessage={this.openComposeMessage} composeMessage={this.composeMessage} /> : <div/>}
        <MessageList messages={messages} toggleFavorite={this.toggleFavorite}/>
      </div>
    )
  }
}

export default App


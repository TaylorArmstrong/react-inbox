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
      messages: [],
      selectedMessages: new Set(),
  }
    this.API = `${process.env.REACT_APP_API_URL}/messages`
  }
  
  /* 
  
  Load The Current State Of The Messages 

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

    const response = await fetch(this.API, {
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

  closeComposeMessage = () => {
    this.setState({ compose: null })
  }

  /*

  Select All/Unselect All Toolbar-Button Handling

  */
 toggleSelectAll = () => {
   this.setState((state) => {
     const { selectedMessages, messages } = state

     if(selectedMessages.size) {
       selectedMessages.clear()
     } else {
        messages.forEach(message => selectedMessages.add(message.id))
     }
     return {
       selectedMessages
     }
   })
 }


  /* 
  
  Mark Selected Messages Read Toolbar-Button Handling

  */
  allReadToolbar = async () => {
    const { selectedMessages } = this.state
    const selectedIDs = [...selectedMessages]
    await template.asyncMarkMessagesRead(selectedIDs)
    this.loadMessages()
  }

  /* 
  
  Mark Selected Messages Unread Toolbar-Button Handling

  */
  allUnreadToolbar = async () => {
    const { selectedMessages } = this.state
    const selectedIDs = [...selectedMessages]
    await template.asyncMarkMessagesUnread(selectedIDs)
    this.loadMessages()
  }

  /*

  Apply Label to Selected Messages Toolbar-Button Handling

  */
  addLabelToolbar = async (LabelID) => {
    const { selectedMessages } = this.state
    const selectedIDs = [...selectedMessages]
    await template.asyncAddLabelToSelected(LabelID, selectedIDs)
    this.loadMessages()
  }

  /*

  Apply Label to Selected Messages Toolbar-Button Handling

  */
  removeLabelToolbar = async (LabelID) => {
    const { selectedMessages } = this.state
    const selectedIDs = [...selectedMessages]
    await template.asyncRemoveLabelFromSelected(LabelID, selectedIDs)
    this.loadMessages()
  }

  /*

  Delete Selected Messages Toolbar-Button Handling

  */
  deleteMessagesToolbar = async () => {
    const { selectedMessages } = this.state
    const selectedIDs = [...selectedMessages]
    await template.asyncDeleteSelectedMessages(selectedIDs)

    this.setState((state) => {
      const { selectedMessages } = state
      selectedMessages.clear()

    return {
      selectedMessages
    }
    })
   
    this.loadMessages()
  }


  /* 
  
  Toggle Starred/Favorite State Of Single Message

  */
  toggleFavorite = async (id) => {
    // console.log(`App:toggleFavorite(${id})`)
    await template.asyncToggleFavorite(id)
    this.loadMessages()
  }


  /* 
   
    Toggle Selct Checkbox Of Single Message

    */
  toggleSelected = (id) => {
    this.setState((state) => {

      // toggle the selection
      const { selectedMessages } = state
      if (selectedMessages.has(id)) selectedMessages.delete(id)
      else selectedMessages.add(id)

      // update state
      
      return {
        selectedMessages,
      }
    })
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

    const { messages, selectedMessages } = this.state

    let unreadCounter = 0

    if (messages) {
      unreadCounter = messages.reduce((a, b) => {
        const numberOfUnread = a + ((!b.read) ? 1 : 0)
        return numberOfUnread
      }, 0)
    }


    return (
      <div className="container App">
        <Toolbar 
          messages={messages}
          openComposeMessage={this.openComposeMessage.bind(this)}
          toggleSelectAll={this.toggleSelectAll}
          selectedMessages={selectedMessages}
          unreadCounter={unreadCounter}
          allReadToolbar={this.allReadToolbar}
          allUnreadToolbar={this.allUnreadToolbar}
          addLabelToolbar={this.addLabelToolbar}
          removeLabelToolbar={this.removeLabelToolbar}
          deleteMessagesToolbar={this.deleteMessagesToolbar}

        />

        {this.state.compose ? <Compose openComposeMessage={this.openComposeMessage} composeMessage={this.composeMessage} closeComposeMessage={this.closeComposeMessage} /> : null}
        
        <MessageList
          messages={messages}
          selectedMessages={selectedMessages}
          toggleFavorite={this.toggleFavorite}
          toggleSelected={this.toggleSelected}
        />
      </div>
    )
  }
}

export default App




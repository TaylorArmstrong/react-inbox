import React from 'react'
import Message from '../message/message'


export default class Messages extends React.Component {

    constructor(props) {
        // console.log("Messages::constructor()")
        super(props)

        // state to track which messages have been selected (checkbox)
        this.state = {
            setSelectedMessages: new Set(),
        }
    }


    /* 
   
    Called when selcted checkbox is toggled

    */
    toggleSelected = (id) => {
        console.log('toggleSelected id',`${id}`)
        this.setState((prevState) => {
            const newState = { ...prevState }
            if (newState.setSelectedMessages.has(id)) {
                newState.setSelectedMessages.delete(id)
            } else {
                newState.setSelectedMessages.add(id)
            }

            return {
                newState,
            }
        })
    }

    render() {
        // console.log('Messages::render()')
        const { messages, toggleFavorite } = this.props

        if (!messages) {
            return (
                <div>
                    loading...
        </div>
            )
        }

        return (
            <div>
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                        selected={this.state.setSelectedMessages.has(message.id)}
                        toggleSelected={this.toggleSelected}
                        toggleFavorite={toggleFavorite}
                    />))}
            </div>
        )
    }
}
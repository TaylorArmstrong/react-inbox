import React from 'react'
import Message from '../message/message'


export default class Messages extends React.Component {
    constructor(props) {
        super(props)
    }
   


    render() {

        const { messages, toggleFavorite, toggleSelected, selectedMessages } = this.props

        if (!messages) {
            return (
                <div>
                    You Have No Messages In Your Mailbox.
                </div>
            )
        }

        return (
            <div>
                {messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                        selected={selectedMessages.has(message.id)}
                        toggleSelected={toggleSelected}
                        toggleFavorite={toggleFavorite}
                    />))}
            </div>
        )
    }
}
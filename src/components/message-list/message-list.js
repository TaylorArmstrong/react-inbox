import React from 'react'
import Message from '../message/message'

export default class MessageList extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false,
        }
    }

    render() {
        console.log('Messages::render()');
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
                {messages.map(message => <Message key={message.id} message={message} toggleFavorite={toggleFavorite} />)}
            </div>
        )
    }
}
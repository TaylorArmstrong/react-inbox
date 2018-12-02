import React from 'react'
import Message from '../message/message'


export default class Messages extends React.Component {

    constructor(props) {
        // console.log("Messages::constructor()")
        super(props)

        // state to track which messages have been selected (checkbox)
        // this.state = {
        //     selectedMessages: new Set(),
        // }
    }


    render() {
        // console.log('Messages::render()')
        const { messages, toggleFavorite, toggleSelected, selectedMessages } = this.props

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
                        selected={selectedMessages.has(message.id)}
                        toggleSelected={toggleSelected}
                        toggleFavorite={toggleFavorite}
                    />))}
            </div>
        )
    }
}
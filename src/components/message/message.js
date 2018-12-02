import React from 'react'
import Labels from '../labels/labels'

/*

    Message Body

*/
const MessageBody = ({ body }) => {
    return (
        <div className='row message-body'>
            <div className='col-xs-11 xol-xs-offset-1'>
                {body}
            </div>
        </div>
    )
}

export default class Message extends React.Component {
    
    state = {
        isExpanded: false
    }

    /*

    onStar

    */
    onStar = () => {
        const { toggleFavorite, message } = this.props
        const { id } = message
        // console.log('toggleFavorite id', `${id}`)
        toggleFavorite(id)
    }

    /* 
    
    onchangeSelected

    */
    onCheckboxSelect = () => {
        const { toggleSelected, message } = this.props
        const { id } = message
        toggleSelected(id)
    }

    /*

    onRead

    */
   onRead = () => {
       const { isExpanded } = this.state
       const { message } = this.props
       const { read } = message

       if(!isExpanded && !read) {
           const { readMessage, message } = this.props
           const { id } = message
           readMessage(id)
       } 
       this.setState({ isExpanded: !isExpanded })
   }


    render() {
        const { message, selected } = this.props
        const { id, body, labels, read, starred, subject} = message
        const { isExpanded } = this.state

        return (
            <div>
                <div className={`row message ${(read ? 'read' : 'unread')} ${(selected ? 'selected' : '')}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input type="checkbox" checked={selected} onChange={this.onCheckboxSelect} />
                            </div>
                            <div className="col-xs-2">
                                <i className={`star fa ${((starred) ? 'fa-star' : 'fa-star-o')}`} onClick={this.onStar} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <Labels labels={labels} />
                        <a href="!#" onClick={this.onRead}>{subject}</a>
                    </div>
                </div>
                {isExpanded ? (<MessageBody body={body} />) : ('')}
            </div>
        )
    }
}
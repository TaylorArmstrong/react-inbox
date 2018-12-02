import React from 'react'
import Labels from '../labels/labels'

export default class Message extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }

    /*

    onStar

    */
    onStar = () => {
        const { toggleFavorite, message } = this.props
        const { id } = message
        console.log('toggleFavorite id', `${id}`)
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

    render() {
        const { message, selected } = this.props
        const { body, id, labels, read, starred, subject} = message

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
                        <a href="!#">{subject}</a>
                    </div>
                </div>
            </div>
        )
    }
}
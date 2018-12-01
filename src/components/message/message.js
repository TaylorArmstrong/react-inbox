import React from 'react'
import Labels from '../labels/labels'


export default class Message extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false,
        }
    }

    onStar = (ev) => {
        this.props.toggleFavorite(ev.target.id)
    }
   

    render() {

        const { message } = this.props
        const { body, id, labels, read, starred, subject } = message
        const selected = false
        
        return (
            <div>
                <div className={`row message ${(read ? 'read' : 'unread')} ${(selected ? 'selected' : '')}`}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input type="checkbox" checked={selected}/>
                            </div>
                            <div className="col-xs-2">
                                <i className={`${((starred) ? 'fas fa-star' : 'far fa-star')}`} onClick={this.onStar} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <Labels labels={labels} />
                        <a href="!#">{subject} </a>
                    </div>
                </div>
            </div>
        )
    }
}

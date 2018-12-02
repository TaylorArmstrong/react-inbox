import React, { Component } from 'react'


class Toolbar extends Component {
    // constructor (props) {
    //     super(props)
    //     this.state ={
    //         ...this.state,
    //     }
    // } 
    openCompose = (ev) => {
        this.props.openComposeMessage()
    }

    // addLabelToSelected = (ev) => {
    //     let label = ev.target.value
    //     this.props.addLabel(label)
    // }

    // removeLabelFromSelected = (ev) => {
    //     let label = ev.target.value
    //     this.props.removeLabel(label)
    // }

    // selectAll = () => this.props.selectAllToolbar()
    // markAsRead = (ev) => this.props.allReadToolbar()
    // markAsUnread = (ev) => this.props.allUnreadToolbar()

    
    // selectedCount = this.props.messages.filter(message => message.selected).length

    render() {
        
        const { selectedMessages, unreadCounter, totalMessages } = this.props
        
        console.log('selecteMessages: toolbar', selectedMessages)
        let selectAllButtonDisplay = null
        if (!selectedMessages.size) { 
            selectAllButtonDisplay = 'far fa-square'
        } else if (selectedMessages.size === totalMessages) {
            selectAllButtonDisplay = 'far fa-check-square'
        } else {
            selectAllButtonDisplay = 'far fa-minus-square'

        }

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadCounter}</span>
                        unread message{(unreadCounter === 1) ? '' : 's'}
                    </p>
                    <button className="btn btn-danger" onClick={this.openCompose}>
                        <i className="fa fa-plus" />
                    </button>
                    <button className="btn btn-default" >
                        <i className={selectAllButtonDisplay}></i>
                    </button>
                    <button className="btn btn-default" >
                        Mark As Read
                    </button>
                    <button className="btn btn-default" >
                        Mark As Unread
                     </button>
                    <select className="form-control label-select" >
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>
                    <select className="form-control label-select" >
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>
                    <button className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar
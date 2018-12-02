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

    addLabelToSelected = (ev) => {
        const { addLabelToolbar } = this.props
        const idx = ev.target.selectedIndex
        
        if (idx === 0) return

        addLabelToolbar(ev.target.options[idx].text)
        ev.target.selectedIndex = 0
    }

    removeLabelFromSelected = (ev) => {
        const {removeLabelToolbar } = this.props
        const idx = ev.target.selectedIndex

        if (idx === 0) return
       
        removeLabelToolbar(ev.target.options[idx].text)
        ev.target.selectedIndex = 0
    }

    deleteMessages = (ev) => this.props.deleteMessagesToolbar()
    

    // selectAll = () => this.props.selectAllToolbar()
    markAsRead = () => this.props.allReadToolbar()
    markAsUnread = (ev) => this.props.allUnreadToolbar()

    
    // selectedCount = this.props.messages.filter(message => message.selected).length

    render() {
        
        const { selectedMessages, unreadCounter, messages } = this.props
        
        console.log('selecteMessages: toolbar', selectedMessages)
        console.log('selecteMessages size: toolbar', selectedMessages.size)
        console.log('messages', messages)
        let selectAllButtonDisplay = null
        if (selectedMessages.size === 0) { 
            selectAllButtonDisplay = 'far fa-square'
        } else if (selectedMessages.size === messages.length) {
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
                    <button className="btn btn-default" onClick={this.markAsRead}>
                        Mark As Read
                    </button>
                    <button className="btn btn-default" onClick={this.markAsUnread}>
                        Mark As Unread
                     </button>
                    <select className="form-control label-select" onChange={this.addLabelToSelected}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>
                    <select className="form-control label-select" onChange={this.removeLabelFromSelected}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>
                    <button className="btn btn-default" onClick={this.deleteMessages}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar
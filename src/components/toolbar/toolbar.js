import React, { Component } from 'react'


class Toolbar extends Component {

    openCompose = (ev) => {
        this.props.openComposeMessage()
    }

    selectAll = () => {
        this.props.toggleSelectAll()
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
    
    markAsRead = () => this.props.allReadToolbar()
    markAsUnread = (ev) => this.props.allUnreadToolbar()


    render() {
        
        const { selectedMessages, unreadCounter, messages } = this.props
        
        let selectAllButtonDisplay 
        if (selectedMessages.size === 0) { 
            selectAllButtonDisplay = 'fa fa-square-o'
        } else if (selectedMessages.size === messages.length) {
            selectAllButtonDisplay = 'fa fa-check-square-o'
        } else {
            selectAllButtonDisplay = 'fa fa-minus-square-o'
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
                    <button className="btn btn-default" onClick={this.selectAll}>
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
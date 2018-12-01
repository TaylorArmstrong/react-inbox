import React, { Component } from 'react'


class Toolbar extends Component {

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

    // totalUnread = this.props.messages.filter(message => !message.read).length
    // selectedCount = this.props.messages.filter(message => message.selected).length

    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge"></span>
                        unread messages
                    </p>
                    <button className="btn btn-danger" onClick={this.openCompose}>
                        <i className="fa fa-plus" />
                    </button>
                    <button className="btn btn-default" >
                        <i className="fa fa-check-square-o"></i>
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
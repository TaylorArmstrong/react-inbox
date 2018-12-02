
const API = `${process.env.REACT_APP_API_URL}/messages`
/*

API Call To Get Current Message State From Database

*/
async function asyncLoadMessages() {
    // console.log('Model::loadMessages()')
    const response = await fetch(API)
    const json = await response.json()
    return json
}

/*
*  Toggles the starred setting for a single messages
*  id - the message ID to toggle starred setting
*  returns - json of entire db
*/
async function asyncToggleFavorite(id) {
    // console.log(`Model::asyncToggleFavorite(${id}`)
    const body = {
        messageIds: [id],
        command: 'star',
    }
    const response = await fetch(API, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
    const json = await response.json()
    return json
}

/* 

Toggle Read/Unread on Selected Messages

*/
async function asyncToggleRead(selectedIDs, toggleRead) {
    const body = {
        messageIds: selectedIDs,
        command: 'read', 
        read: toggleRead
    }
    const response = await fetch(API, {
        method: 'PATCH', 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    const resJSON = await response.json()
    return resJSON
}

// Toggle Read
async function asyncMarkMessagesRead(selectedIDs) {
    return asyncToggleRead(selectedIDs, true)
}

// Toggle Unread
async function asyncMarkMessagesUnread(selectedIDs) {
    return asyncToggleRead(selectedIDs, false)
}

/*

Add Label To Selected Messages Toolbar-Button Handling

*/
async function asyncAddLabelToSelected(LabelID, selectedIDs) {
    const body = {
        messageIds: selectedIDs,
        command: 'addLabel',
        label: LabelID
    }
    const response = await fetch(API, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    const resJSON = await response.json()
    return resJSON
}

/*

Remove Label From Selected Messages Toolbar-Button Handling

*/
async function asyncRemoveLabelFromSelected(LabelID, selectedIDs) {
    const body = {
        messageIds: selectedIDs,
        command: 'removeLabel',
        label: LabelID
    }
    const response = await fetch(API, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    const resJSON = await response.json()
    return resJSON
}


/*

Delete Selected Messages Toolbar-Button Handling

*/
async function asyncDeleteSelectedMessages(selectedIDs) {
    const body = {
        messageIds: selectedIDs,
        command: 'delete'
    }
    const response = await fetch(API, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    const resJSON = await response.json()
    return resJSON
} 


export default {
    asyncLoadMessages,
    asyncToggleFavorite,
    API, 
    asyncMarkMessagesRead,
    asyncMarkMessagesUnread,
    asyncAddLabelToSelected,
    asyncRemoveLabelFromSelected,
    asyncDeleteSelectedMessages
}
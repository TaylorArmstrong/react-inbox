import React from 'react'

const Label = ({ label }) => {
    return (
        <span className="label label-warning">{label}</span>
    )
}

const Labels = ({ labels }) => {
    // console.log('** Labels::render()')
    return (
        <span>
            {labels.map(label => <Label label={label} />)}
        </span>
    )
}

export default Labels
import React from 'react'

const Label = ({ label }) => {
    return (
        <span className="label label-warning">{label}</span>
    )
}

const Labels = ({ labels }) => {
    return (
        <span>
            {labels.map(label => <Label key={label} label={label} />)}
        </span>
    )
}

export default Labels
import React from 'react'

const TextArea = ({ ...props }) => {
    return (
        <div>
            <textarea {...props}>
                {props.children}
            </textarea>
        </div>
    )
}

export default TextArea

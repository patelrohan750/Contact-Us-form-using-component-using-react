import React from 'react'
const InputField = ({...props}) => {
    // console.log({...props});
    return (
        <div>
            <input  {...props}/>
        </div>
    )
}

export default InputField

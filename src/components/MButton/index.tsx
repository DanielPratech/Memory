import * as React from 'react';

type Props = {
    mclick: () => void;
    text: string;
    disabled?: boolean;
};

const MButton = (props: Props) => {
    const { mclick, text, disabled } = props;
    return (
        <button
            disabled={disabled}
            onClick={mclick}
            className='btn btn-sm btn-outline-dark mb-3 me-3 rounded'>
            {text}
        </button>
    );
}

export default MButton;
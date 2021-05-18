import * as React from 'react';

type Props = {
    mclick?: () => void;
    text: string;
};

const MButton = (props: Props) => {
    const { mclick, text } = props;
    return (
        <button
            onClick={() => mclick && mclick()}
            disabled={mclick ? false : true}
            className='btn btn-sm btn-outline-dark mb-3 me-3 rounded'>
            {text}
        </button>
    );
}

export default MButton;
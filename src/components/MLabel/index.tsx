import * as React from 'react';

type Props = {
    text: string;
};

const MBLabel = (props: Props) => {
    const { text } = props;
    return (
        <label
            className='text-muted mb-2 me-3'>
            {text}
        </label>
    );
}

export default MBLabel;
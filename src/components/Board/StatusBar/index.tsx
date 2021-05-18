import * as React from 'react';
import MButton from '../../MButton';

type Props = {
    tries: number;
    onHome: () => void;
    onReset: () => void;
};

const StatusBar = (props: Props) => {
    const { onHome, tries, onReset } = props;
    return (
        <div className='text-start'>
            <div className='btn-group'>
                <MButton text='Regresar' mclick={onHome} />
                <MButton text={'Reiniciar'} mclick={onReset} />
                <MButton text={`Intentos: ${tries}`} />
            </div>
        </div>
    );
}

export default StatusBar;
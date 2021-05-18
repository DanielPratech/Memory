import * as React from 'react';
import MButton from '../../MButton';
import ILevel from '../../Levels/ILevel';
import { getLevelName } from '../../Levels/LevelUtils';

type Props = {
    tries: number;
    onHome: () => void;
    onReset: () => void;
    level: ILevel;
};

const StatusBar = (props: Props) => {
    const { onHome, tries, onReset, level } = props;
    return (
        <div className='text-start'>
            <div className='btn-group'>
                <MButton
                    text='Regresar'
                    mclick={() =>
                        window.confirm("¿Desea salir de la partida?") && onHome()
                    } />
                <MButton
                    text='Reiniciar'
                    mclick={() =>
                        window.confirm("¿Desea reiniciar la partida?") && onReset()
                    } />
                <MButton
                    text={`Intentos: ${tries}`} />

                <MButton
                    text={`Nivel: ${getLevelName(level.level)}`} />
            </div>
        </div>
    );
}

export default StatusBar;
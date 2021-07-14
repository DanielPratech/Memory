import * as React from 'react';
import MButton from '../../MButton';
import ILevel from '../../Levels/ILevel';
import { getLevelName } from '../../Levels/LevelUtils';
import MBLabel from '../../MLabel/index';

type Props = {
    loading: boolean;
    tries: number;
    onHome: () => void;
    onReset: () => void;
    level: ILevel;
};

const StatusBar = (props: Props) => {
    const { onHome, tries, onReset, level, loading } = props;
    return (
        <div className='text-start'>
            <div className='btn-group'>
                <MButton
                    disabled = {loading}
                    text='Regresar'
                    mclick={() =>
                        window.confirm("¿Desea salir de la partida?") && onHome()
                    } />
                <MButton
                    disabled = {loading}
                    text='Reiniciar'
                    mclick={() =>
                        window.confirm("¿Desea reiniciar la partida?") && onReset()
                    } />
                <MBLabel
                    text={`Intentos: ${tries}`} />

                <MBLabel
                    text={`Nivel: ${getLevelName(level.level)}`} />
            </div>
        </div>
    );
}

export default StatusBar;
import * as React from 'react';
import { Level } from './Level';
import ILevel from './ILevel';
import { getJSONByLevel, getLevelName } from './LevelUtils';

type Props = {
    onSelectLevel: (level: ILevel) => void;
};

const StatusBar = (props: Props) => {
    const {
        onSelectLevel
    } = props;
    return (
        <select
            defaultValue={Level.normal}
            className="form-select form-select-sm"
            onChange={(op) => {
                onSelectLevel({
                    cards: getJSONByLevel(Number(op.target.value)),
                    level: Number(op.target.value)
                });
            }}>
            <option value={Level.baby}>
                {getLevelName(Level.baby)}
            </option>
            <option value={Level.normal}>
                {getLevelName(Level.normal)}
            </option>
            <option value={Level.seriously}>
                {getLevelName(Level.seriously)}
            </option>
            <option value={Level.imposible}>
                {getLevelName(Level.imposible)}
            </option>
        </select>
    );
}

export default StatusBar;
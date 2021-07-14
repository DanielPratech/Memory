import Card from '../Board/Card/Card';
import { Level } from './enums/Level';
import baby from './LevelsJSON/baby.json';
import normal from './LevelsJSON/normal.json';
import seriously from './LevelsJSON/Seriously.json';
import imposible from './LevelsJSON/imposible.json';

export const switchLevelCard = {
    [Level.baby.toString()]: baby.Cards,
    [Level.normal.toString()]: normal.Cards,
    [Level.seriously.toString()]: seriously.Cards,
    [Level.imposible.toString()]: imposible.Cards
};

export const switchLevelName = {
    [Level.baby.toString()]: "Baby",
    [Level.normal.toString()]: "Normal",
    [Level.seriously.toString()]: "Seriously",
    [Level.imposible.toString()]: "Imposible"
};

export const getJSONByLevel = (level: number): Array<Card> => {
    return switchLevelCard[level.toString()];
};

export const getLevelName = (level: number): string => {
    return switchLevelName[level.toString()];
};

import Card from '../Board/Card/Card';
import { Level } from './Level';
import baby from './LevelsJSON/baby.json';
import normal from './LevelsJSON/normal.json';
import seriously from './LevelsJSON/Seriously.json';
import imposible from './LevelsJSON/imposible.json';

export const getJSONByLevel = (level: number): Array<Card> => {
    switch (level) {
        case Level.baby:
            return baby.Cards;
        case Level.normal:
            return normal.Cards;
        case Level.seriously:
            return seriously.Cards;
        case Level.imposible:
            return imposible.Cards;
        default:
            return [];
    }
};

export const getLevelName = (level: number): string => {
    switch (level) {
        case Level.baby:
            return "Baby"
        case Level.normal:
            return "Normal"
        case Level.seriously:
            return "Seriously?"
        case Level.imposible:
            return "Imposible"
        default:
            return "";
    }
};

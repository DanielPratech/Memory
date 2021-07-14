import { getJSONByLevel, getLevelName, switchLevelCard, switchLevelName } from '../LevelUtils';
import { Level } from '../enums/Level';
import Card from '../../Board/Card/Card';

const levelArray = [
    Level.baby,
    Level.normal,
    Level.seriously,
    Level.imposible
];

describe("Levels JSON level", () => {
    test("getJSONByLevel All levels", () => {
        levelArray.forEach(level => {
            expect(getJSONByLevel(level)).toBe(switchLevelCard[level]);
        });
    });

    test("getJSONByLevel undefined", () => {
        expect(getJSONByLevel(0)).toBeUndefined();
    });

});

describe("Levels name level", () => {
    test("getLevelName All levels", () => {
        levelArray.forEach(level => {
            expect(getLevelName(level)).toBe(switchLevelName[level]);
        });
    });

    test("getLevelName undefined", () => {
        expect(getLevelName(0)).toBeUndefined();
    });
});


import { CardStatus } from './enums/CardStatus';
export default class Card {
    constructor(
        public Id: number = 0,
        public Icon: string = "times",
        public Status: number = CardStatus.reverse,
    ) { }
}
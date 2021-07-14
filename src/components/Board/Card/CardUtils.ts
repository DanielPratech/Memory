import Card from './Card';

export const updateCardArray = (cardArray: Card[], cardItem: Card) => {
    return cardArray.map(card => {
        return cardItem.Id === card.Id ? cardItem : card;
    });
}

export const sortCards = (cards: Card[]) => {
    return JSON.parse(
        JSON.stringify(cards.sort(
            () => Math.random() - 0.5
        )))
}
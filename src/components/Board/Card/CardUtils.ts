import Card from "./Card";

export const updateCardArray = (cardArray: Card[], cardItem: Card) => {
    return cardArray.map(card => {
        return cardItem.Id === card.Id ? cardItem : card;
    });
}
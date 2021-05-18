import * as React from 'react';
import Card from './Card';
import { CardStatus } from './CardStatus';

type Props = {
    onCard: () => void;
    card: Card;
};

const MCard = (props: Props) => {
    const { card, onCard } = props;
    let icon = card.Icon;
    let color = ''
    switch (card.Status) {
        case CardStatus.reverse:
            icon = "times";
            break;
        case CardStatus.uncovered:
            color = card.Id === 9999 ? 'alert-danger' : 'alert-warning';
            break;
        case CardStatus.matched:
            color = 'alert-success';
            break;
    }
    //color = card.Id === 9999 ? 'alert-danger' : color;
    return (
        <div
            onClick={onCard}
            className={`card m-1 px-1 py-5 ${color}`}>
            <i
                className={`fa fa-${icon} fa-2x`}
                aria-hidden="true"
            />
        </div>
    );
}

export default MCard;
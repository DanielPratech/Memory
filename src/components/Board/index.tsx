import * as React from 'react';
import MCard from './Card';
import StatusBar from './StatusBar/index';
import Card from './Card/Card';
import { CardStatus } from './Card/enums/CardStatus';
import { sortCards, updateCardArray } from './Card/CardUtils';
import ILevel from '../Levels/ILevel';

type Props = {
    onHome: () => void;
    level: ILevel;
};
type State = {
    tries: number;
    cardArray: Card[],
    cardTemp: Card,
    loading: boolean
};

const initialState: State = {
    tries: 0,
    cardArray: [],
    cardTemp: new Card(),
    loading: false
}

export default class Board extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = initialState
    }

    public componentDidMount() {
        const { level } = this.props;
        this.setState({
            cardArray: sortCards(level.cards)
        });
    }

    public componentDidUpdate(prevProps: Props) {
        const { level } = this.props;
        if (prevProps.level !== level) {
            this.setState({
                cardArray: sortCards(level.cards)
            });
        }
    }

    public handleReset(isTrap?: boolean) {
        const { tries, cardArray } = this.state;
        const { level } = this.props;
        this.setState({
            tries: isTrap ? tries : 0,
            cardArray: isTrap
                ? sortCards(cardArray)
                : sortCards(level.cards),
            cardTemp: new Card(),
            loading: false
        });
    }

    private handleCard(cardItem: Card) {
        let { cardArray, cardTemp, loading, tries } = this.state;
        if (cardItem.Status !== CardStatus.matched && !loading && cardTemp.Id !== cardItem.Id) {
            if (cardTemp.Id === 0) {
                if (cardItem.Status === CardStatus.reverse) {
                    cardItem.Status = CardStatus.uncovered;
                    cardTemp = cardItem;
                    cardArray = updateCardArray(cardArray, cardItem);
                    this.setState({ cardArray, cardTemp });
                    if (cardItem.Id < 0) {
                        this.setState({ loading: true });
                        setTimeout(() => {
                            cardItem.Status = CardStatus.reverse;
                            this.setState({ cardArray });
                            this.handleReset(true);
                        }, 2000);
                    }
                };
            } else {
                if (cardTemp.Icon === cardItem.Icon) {
                    cardTemp.Status = CardStatus.matched;
                    cardArray = updateCardArray(cardArray, cardTemp);
                    cardItem.Status = CardStatus.matched;
                    cardArray = updateCardArray(cardArray, cardItem);
                    cardTemp = new Card();
                    this.setState({ cardArray, cardTemp });
                } else {
                    cardItem.Status = CardStatus.uncovered;
                    cardArray = updateCardArray(cardArray, cardItem);
                    this.setState({ cardArray, loading: true });
                    setTimeout(() => {
                        if (cardItem.Id < 0) {
                            this.handleReset(true);
                        }
                        if (cardTemp.Status !== CardStatus.matched) {
                            cardTemp.Status = CardStatus.reverse;
                            cardArray = updateCardArray(cardArray, cardTemp);
                        }
                        cardItem.Status = CardStatus.reverse;
                        cardArray = updateCardArray(cardArray, cardItem);
                        cardTemp = new Card();
                        this.setState({ cardArray, cardTemp, loading: false });
                    }, 2000);
                }
                this.validarVictoria();
                this.setState({ tries: tries + 1 });
            }
        }
    }

    public validarVictoria() {
        setTimeout(() => {
            const { cardArray, tries } = this.state;
            let aciertos = cardArray.filter(
                item => item.Id >= 0
                    && item.Status === CardStatus.matched
            ).length;
            let traps = cardArray.filter(
                item => item.Id < 0
            ).length;

            if (aciertos === cardArray.length - traps) {
                alert(`Felicidades, ha ganado el juego en ${tries} intentos`);
                this.handleReset();
            }
        }, 2000);
    }

    render() {
        const { tries, cardArray, loading } = this.state;
        const { level } = this.props;
        return (
            <div>
                <div className="container">
                    <StatusBar
                        loading={loading}
                        tries={tries}
                        onHome={() => {
                            this.handleReset();
                            this.props.onHome();
                        }}
                        level={level}
                        onReset={this.handleReset.bind(this)}
                    />
                    <div className='row'>
                        {

                            cardArray.map(
                                (cardItem: Card, index: number) =>
                                    <div key={index + 1} className="col-3">
                                        <MCard
                                            card={cardItem}
                                            onCard={() => this.handleCard(cardItem)}
                                        />
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    };
};
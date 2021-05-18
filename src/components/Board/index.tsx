import * as React from 'react';
import MCard from './Card';
import StatusBar from './StatusBar/index';
import data from './Card/Cards.json';
import Card from './Card/Card';
import { CardStatus } from './Card/CardStatus';
import { updateCardArray } from './Card/CardUtils';

type Props = {
    onHome: () => void;
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
        this.setState({
            cardArray: JSON.parse(JSON.stringify(data.Cards.sort(
                () => Math.random() - 0.5
            )))
        });
    }

    public handleReset(isTrap?: boolean) {
        const { tries, cardArray } = this.state;
        this.setState({
            tries: isTrap ? tries : 0,
            cardArray: isTrap
                ? cardArray.sort(() => Math.random() - 0.5)
                : JSON.parse(JSON.stringify(data.Cards.sort(
                    () => Math.random() - 0.5
                ))),
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
                    if (cardItem.Id == 9999) {
                        setTimeout(() => {
                            //alert("Has caido en una trampa :P");
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
                        if (cardItem.Id == 9999) {
                            //alert("Has caido en una trampa :P");
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
                item => item.Id !== 9999
                    && item.Status === CardStatus.matched
            ).length;
            if (aciertos == cardArray.length-1) {
                alert(`Felicidades, ha ganado el juego en ${tries} intentos`);
                this.handleReset();
            }
        }, 2000);
    }

    render() {
        const { tries, cardArray } = this.state;
        return (
            <div>
                <div className="container">
                    <StatusBar
                        tries={tries}
                        onHome={() => {
                            this.handleReset();
                            this.props.onHome();
                        }}
                        onReset={this.handleReset.bind(this)}
                    />
                    <div className='row'>
                        {

                            cardArray.map(
                                (cardItem: Card, index: number) =>
                                    <div key={index + 1} className="col-2">
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
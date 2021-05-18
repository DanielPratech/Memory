import * as React from 'react';
import { Screen } from './screen';
import Board from './Board/index';
import MButton from './MButton';

type Props = {

};
type State = {
    screen: number;
};

export default class Main extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            screen: Screen.main
        }

        this.changeScreen = this.changeScreen.bind(this);
    }

    private switchView() {
        const { screen } = this.state;
        switch (screen) {
            case Screen.main:
                return (this.getMainView());
            case Screen.configs:
                return (this.getMainView());
            case Screen.board:
                return <Board onHome={() => this.changeScreen(Screen.main)} />;
        }
    }

    private getMainView(): JSX.Element {
        return (
            <div className='btn-group-vertical'>
                <MButton text='Comenzar' mclick={() => this.changeScreen(Screen.board)} />
                <MButton text='Configuraciones' mclick={() => this.changeScreen(Screen.configs)} />
            </div>
        );
    }

    private changeScreen(screen: number) {
        this.setState({ screen });
    }

    render() {
        return (
            <div >
                <h1 className="text-danger">Memory</h1>
                {this.switchView()}
            </div>
        );
    };
};
import * as React from 'react';
import { Screen } from './enums/screen';
import Board from './Board/index';
import MButton from './MButton';
import { Level } from './Levels/enums/Level';
import Levels from './Levels';
import ILevel from './Levels/ILevel';
import { getJSONByLevel } from './Levels/LevelUtils';

type Props = {

};

type State = {
    screen: number;
    level: ILevel;
};

export default class Main extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            screen: Screen.main,
            level: {
                level: Level.normal,
                cards: getJSONByLevel(Level.normal)
            },
        }
        this.changeScreen = this.changeScreen.bind(this);
        this.handleSelectLevel = this.handleSelectLevel.bind(this);
    }

    private switchView() {
        const { screen, level } = this.state;
        switch (screen) {
            case Screen.main:
                return (this.getMainView());
            case Screen.board:
                return <Board level={level} onHome={
                    () => {
                        this.changeScreen(Screen.main);
                        this.setState({
                            level: {
                                level: Level.normal,
                                cards: getJSONByLevel(Level.normal)
                            }
                        });
                    }
                } />;
        }
    }

    private getMainView(): JSX.Element {
        return (
            <div className='btn-group-vertical'>
                <MButton text='Comenzar' mclick={() => this.changeScreen(Screen.board)} />
                <Levels 
                    onSelectLevel={this.handleSelectLevel}
                />
            </div>
        );
    }

    private changeScreen(screen: number) {
        this.setState({ screen });
    }

    private handleSelectLevel(level: ILevel) {
        this.setState({ level });
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
import React, { PureComponent } from 'react';

import Header from '../Header/Header';
import List from '../List/List';

import styles from './App.css';

class App extends PureComponent {
    state = {
      results: {}
    };

    constructor(props) {
        super(props);

        fetch('out.json')
            .then(payload => payload.json())
            .then(results => this.setState({ results }));
    }

    render() {
        const { results } = this.state;

        return <div className={styles.app}>
            <Header results={results} />
            <List testResults={results && results.testResults} />
        </div>;
    }

}
export default App;
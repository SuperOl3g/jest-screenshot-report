import React, { PureComponent } from 'react';

import Header from '../Header/Header';
import Container from '../Container/Container';
import Filter from '../Filter/Filter';
import List from '../List/List';

import 'normalize.css';
import styles from './App.css';

export const FILTERS = {
    PASSED: 'passed',
    FAILED: 'failed',
    ALL: 'all'
};

const getOpposite = val =>
    val === FILTERS.PASSED && FILTERS.FAILED ||
    val === FILTERS.FAILED && FILTERS.PASSED;

const getNewVal = (stateVal, val) => {
    const oppositeVal = getOpposite(val);

    return (stateVal === FILTERS.ALL || stateVal === oppositeVal ) && val ||
        stateVal === val && FILTERS.ALL;
};

class App extends PureComponent {
    state = {
        filter: FILTERS.ALL,
        results: {}
    };

    constructor(props) {
        super(props);

        fetch('out.json')
            .then(payload => payload.json())
            .then(results => this.setState({ results }));
    }

    onFilterChange = newValue => this.setState({
       filter: newValue
    });

    onPassedButtonClick = () => this.setState({
        filter: getNewVal(this.state.filter, FILTERS.PASSED)
    });

    onFailedButtonClick = () => this.setState({
        filter: getNewVal(this.state.filter, FILTERS.FAILED)
    });

    render() {
        const { results } = this.state;

        return <div className={styles.app}>
            <Header
                results={results}
                filter={this.state.filter}
                onPassedButtonClick={this.onPassedButtonClick}
                onFailedButtonClick={this.onFailedButtonClick}
            />
            <div style={{ marginBottom: 30 }}/>

            <Container>
                <Filter
                    value={this.state.filter}
                    options={[
                        FILTERS.ALL,
                        FILTERS.PASSED,
                        FILTERS.FAILED
                    ]}
                    onChange={this.onFilterChange}
                />
                <div style={{ marginBottom: 10 }}/>

                <List
                    filter={this.state.filter}
                    testResults={results && results.testResults}
                />
            </Container>
        </div>;
    }

}
export default App;
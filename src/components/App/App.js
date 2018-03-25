import React, { PureComponent } from 'react';

import Header from '../Header/Header';
import Container from '../Container/Container';
import Checkbox from '../Checkbox/Checkbox';
import Filter from '../Filter/Filter';
import List from '../List/List';

import 'normalize.css';
import styles from './App.css';

const REPORT_DATA_FILENAME = 'reportData.json';

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
        withPreview: true,
        results: null
    };

    constructor(props) {
        super(props);

        fetch(REPORT_DATA_FILENAME)
            .then(payload => payload.json())
            .then(results => this.setState({
                results,
                ...(results.numFailedTests ? { filter: FILTERS.FAILED } : {})
            }))
    }

    onFilterChange = e => this.setState({
       filter: e.target.value
    });

    onPassedButtonClick = () => this.setState({
        filter: getNewVal(this.state.filter, FILTERS.PASSED)
    });

    onFailedButtonClick = () => this.setState({
        filter: getNewVal(this.state.filter, FILTERS.FAILED)
    });

    onPreviewToggle = e => this.setState({
        withPreview: e.target.checked
    });

    render() {
        const { results } = this.state;

        return results && <div className={styles.app}>
            <Header
                results={results}
                filter={this.state.filter}
                onPassedButtonClick={this.onPassedButtonClick}
                onFailedButtonClick={this.onFailedButtonClick}
            />
            <Container>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 30, marginBottom: 10  }}>
                    <Filter
                        value={this.state.filter}
                        options={[
                            FILTERS.ALL,
                            FILTERS.PASSED,
                            FILTERS.FAILED
                        ]}
                        onChange={this.onFilterChange}
                    />
                    <div style={{ marginLeft: 40 }}/>
                    <Checkbox
                        label="With preview"
                        checked={this.state.withPreview}
                        onChange={this.onPreviewToggle}
                    />
                </div>

                <List
                    filter={this.state.filter}
                    testResults={results && results.testResults}
                />
            </Container>
        </div>;
    }

}
export default App;
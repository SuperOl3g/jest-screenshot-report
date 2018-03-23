import React, { PureComponent } from 'react';
import classNames from 'classnames';

import Container from '../Container/Container';

import styles from './Header.css';


const Header = ({
    numFailedTests,
    numPassedTests,
    testResults: {
        perfStats: {
            end: endTimestamp,
            start: startTimestamp
        } = {}
    } = {}
}) => {


    return <header className={styles.header}>
    <Container>
        <div className={styles.headerContent}>
            <h1>Report {new Date(startTimestamp).toString()} {new Date(endTimestamp).toString()}</h1>
            <div className={styles.rightPart}>
                <div className={styles.badgeBlock}>
                    Passed:
                    <div
                        className={classNames(
                            styles.badge,
                            styles.badge_passed
                        )}
                    >
                        {numPassedTests}
                    </div>
                </div>

                <div className={styles.badgeBlock}>
                    Failed:
                    <div
                        className={classNames(
                            styles.badge,
                            styles.badge_failed
                        )}
                    >
                        {numFailedTests}
                    </div>
                </div>
            </div>
        </div>
    </Container>
</header>};


export default Header;
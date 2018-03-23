import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { pathOr } from 'ramda';
import moment from 'moment';

import Container from '../Container/Container';

import styles from './Header.css';


const Header = ({ results }) => {
    if (!results) {
        return null;
    }

    const { numFailedTests, numPassedTests, startTime } = results;
    const formatedStarttime = moment(startTime ).format('YYYY-MM-DD HH:mm');
    const { start, end } = pathOr({}, ['testResults', 0, 'perfStats'], results);
    const timeSpent = start && end && (moment(end - start).utc().format('HH:mm:ss'));

    return <header className={styles.header}>
    <Container>
        <div className={styles.headerContent}>
            <h1>Report</h1>
            {startTime && <div className={styles.info}>Date: {formatedStarttime}</div>}
            {timeSpent && <div className={styles.info}>Time spent: {timeSpent}</div>}
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
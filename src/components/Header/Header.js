import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { pathOr, isNil } from 'ramda';
import moment from 'moment';

import Container from '../Container/Container';
import { FILTERS } from '../App/App';

import styles from './Header.css';

const noop = () => {};

const Header = ({ results, filter, onPassedButtonClick, onFailedButtonClick }) => {
    if (!results) {
        return null;
    }

    const { numFailedTests, numPassedTests, startTime, gitBranchName } = results;
    const formatedStarttime = moment(startTime ).format('DD-MM-YYYY HH:mm');
    const { start, end } = pathOr({}, ['testResults', 0, 'perfStats'], results);
    const timeSpent = start && end && (moment(end - start).utc().format('HH:mm:ss'));

    return <header className={styles.header}>
    <Container>
        <div className={styles.headerContent}>
            <h1 className={styles.title}>Test report</h1>

            {gitBranchName && <div className={styles.info}>
                <span className={styles.infoTitle}>Git branch:</span>
                {gitBranchName}
            </div>}

            {startTime && <div className={styles.info}>
                <span className={styles.infoTitle}>Date:</span>
                {formatedStarttime}
            </div>}

            {timeSpent && <div className={styles.info}>
                <span className={styles.infoTitle}>Time spent:</span>
                {timeSpent}
            </div>}

            <div className={styles.rightPart}>
                {!isNil(numPassedTests) && <div className={styles.badgeBlock}>
                    Passed:
                    <button
                        className={classNames({
                            [styles.badge]: true,
                            [styles.badge_passed]: true,
                            [styles.badge_disabled]: filter === FILTERS.FAILED || filter === FILTERS.NONE
                        })}
                        onClick={onPassedButtonClick}
                    >
                        {numPassedTests}
                    </button>
                </div>}

                {!isNil(numFailedTests) && <div className={styles.badgeBlock}>
                    Failed:
                    <button
                        className={classNames({
                            [styles.badge]: true,
                            [styles.badge_failed]: true,
                            [styles.badge_disabled]: filter === FILTERS.PASSED || filter === FILTERS.NONE
                        })}
                        onClick={onFailedButtonClick}
                    >
                        {numFailedTests}
                    </button>
                </div>}
            </div>
        </div>
    </Container>
</header>};


Header.defaultProps = {
    onPassedButtonClick: noop,
    onFailedButtonClick: noop
};

export default Header;
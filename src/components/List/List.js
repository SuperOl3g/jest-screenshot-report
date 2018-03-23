import React, { PureComponent } from 'react';
import cn from 'classnames';

import { FILTERS } from '../App/App';

import styles from './List.css';

const Result = ({ ancestorTitles, title, status, duration, filter }) => {
    const isPassed = status === 'passed';

    return (filter === FILTERS.ALL || filter === (isPassed ? FILTERS.PASSED : FILTERS.FAILED)) &&
        <tr className={styles.tr}>
            <td className={cn(styles.td, styles.td_status)}>{isPassed ? '✅' : '❌'}</td>
            <td className={styles.td}>{ancestorTitles.join(' / ') + ' / ' + title}</td>
            <td className={styles.td}>{duration}ms</td>
        </tr>;
};


const List = ({ testResults, filter }) => testResults ?
        <table className={styles.table}>
            <thead>
                <tr className={styles.tr}>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Time</th>
                </tr>
            </thead>
            <tbody>
                {testResults.map((result, i) =>
                    result.testResults.map((result, j) =>
                        <Result
                            {...result}
                            key={`${i}_${j}`}
                            filter={filter}
                        />
                    )
                )}
            </tbody>
        </table> :
    null;


export default List;
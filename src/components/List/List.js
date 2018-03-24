import React, { PureComponent } from 'react';
import { reduce, compose, filter } from 'ramda';
import cn from 'classnames';

import { FILTERS } from '../App/App';

import styles from './List.css';

const Result = ({ ancestorTitles, title, status, duration }) => {
    const isPassed = status === 'passed';

    return <tr className={cn({
        [styles.tr]: true,
        [styles.tr_failed]: !isPassed
    })}>
        <td className={cn(styles.td, styles.td_status)}>{isPassed ? '✅' : '❌'}</td>
        <td className={styles.td}>{ancestorTitles.join(' / ') + ' / ' + title}</td>
        <td className={cn(styles.td, styles.td_time)}>{duration}ms</td>
    </tr>;
};

const reGroup = (testResults, curFilter) =>
    compose(
        filter(cur => !curFilter || curFilter === FILTERS.ALL || curFilter === (cur.status === 'passed' ? FILTERS.PASSED : FILTERS.FAILED)),
        reduce((prev, cur) => [...prev, ...cur.testResults], [])
    )(testResults);


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
            {reGroup(testResults, filter).map((result, i) =>
                <Result {...result} key={i} />
            )}
        </tbody>
    </table> :
    null;


export default List;
import React, { PureComponent } from 'react';
import cn from 'classnames';

import Container from '../Container/Container';

import styles from './List.css';

const Result = ({ ancestorTitles, title, status, duration }) => <tr className={styles.tr}>
    <td className={cn(styles.td, styles.td_status)}>{status === 'passed' ? '✅' : '❌'}</td>
    <td className={styles.td}>{ancestorTitles.join(' / ') + ' / ' + title}</td>
    <td className={styles.td}>{duration}ms</td>
</tr>;


const List = ({ testResults }) => testResults ?
    <Container>
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
                        <Result {...result} key={`${i}_${j}`} />
                    )
                )}
            </tbody>
        </table>
    </Container> :
    null;


export default List;
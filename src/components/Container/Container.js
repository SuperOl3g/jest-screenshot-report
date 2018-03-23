import React, { PureComponent } from 'react';

import styles from './Container.css';

const Container = ({ children }) => <div className={styles.container}>
    {children}
</div>;


export default Container;
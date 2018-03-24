import React, { PureComponent } from 'react';

const Container = ({ onChange, checked, label }) => <label>
    <input
        checked={checked}
        type='checkbox'
        onChange={onChange}
    />
    <span style={{ marginLeft: 5 }}>{label}</span>
</label>;


export default Container;
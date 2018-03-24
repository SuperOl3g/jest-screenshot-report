import React, { PureComponent } from 'react';
import pt from 'prop-types';

class Filter extends PureComponent {
    static propTypes = {
        value: pt.oneOfType([pt.number, pt.string]),
        options: pt.arrayOf(pt.oneOfType([pt.number, pt.string])),
        onChange: pt.func
    };

    render() {
        const { value, options, onChange } = this.props;

        return <div>
            Filter:
            <select
                style={{ marginLeft: 4 }}
                value={value}
                onChange={onChange}
            >
                {options.map(val =>
                    <option value={val} key={val}>{val}</option>
                )}
            </select>
        </div>;
    }
}

export default Filter;
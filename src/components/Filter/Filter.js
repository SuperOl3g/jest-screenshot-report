import React, { PureComponent } from 'react';
import pt from 'prop-types';

const noop = () => {};

class Filter extends PureComponent {
    static propTypes = {
        value: pt.oneOfType([pt.number, pt.string]),
        options: pt.arrayOf(pt.oneOfType([pt.number, pt.string])),
        onChange: pt.func
    };

    static defaultProps = {
        onChange: noop
    };

    onChange = e => this.props.onChange(e.target.value);

    render() {
        const { value, options } = this.props;

        return <div>
            Filter:
            <select
                value={value}
                onChange={this.onChange}
            >
                {options.map(val =>
                    <option value={val} key={val}>{val}</option>
                )}
            </select>
        </div>;
    }
}

export default Filter;
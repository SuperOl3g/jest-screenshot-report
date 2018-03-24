import pt from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';

import s from './CollapseBlock.css';

class CollapseBlock extends PureComponent {
    static propTypes = {
        children: pt.node,
        collapsed: pt.bool,
        duration: pt.number,
        minHeight: pt.number,
        onTransitionEnd: pt.func,
        childrenAlign: pt.oneOf(['top', 'center', 'bottom'])
    };

    static defaultProps = {
        duration: 250,
        collapsed: false,
        minHeight: null,
        childrenAlign: 'top',
        onTransitionEnd: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            height: props.collapsed ? 0 : null
        };
    }

    // TODO: не перерисовывать, если компонент скрыт
    componentWillReceiveProps(nextProps) {
        if (nextProps.collapsed !== this.props.collapsed) {
            this.toggle(nextProps.collapsed);
        }
    }

    handleTransitionend = e => {
        if (e.target !== e.currentTarget) {
            return;
        }

        if (!this.props.collapsed) {
            this.setState({ height: null });
        }

        this.props.onTransitionEnd();
    };

    toggle = isCollapsed => {
        const childrenHeight = this.childrenBlock.offsetHeight;

        if (this.state.height === null) {
            this.setState({ height: this.props.collapsed ? 0 : childrenHeight });
            // костыль: чтобы отработала анимация, начальное значение должно успеть проставиться (т.к. react мержит вызовы setState)
            setTimeout(() => this.setState({ height: isCollapsed ? 0 : childrenHeight }), 100);
        } else {
            this.setState({ height: isCollapsed ? 0 : childrenHeight });
        }
    };

    setChildrenBlock = elem => { this.childrenBlock = elem; };

    render() {
        const {
            childrenAlign,
            children,
            minHeight
        } = this.props;

        const transition = `height ${this.props.duration}ms ease`;

        return <div
            onTransitionEnd={this.handleTransitionend}
            className={s.container}
            style={{
                minHeight,
                height: this.state.height,
                WebkitTransition: transition,
                transition
            }}
        >
            <div
                ref={this.setChildrenBlock}
                className={cn({
                    [s.childrenBlock_animating]: this.state.height !== null,
                    [s[`childrenBlock_align_${childrenAlign}`]]: childrenAlign
                })}
            >
                {children}
            </div>
        </div>;
    }
}

export default CollapseBlock;

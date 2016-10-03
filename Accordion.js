import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Animated,
	Easing,
} from 'react-native';

import styles from './Styles';

export default class Accordion extends Component {

	static defaultProps = {
		duration: 200,
		easing: Easing.cubic,
		collapsed: false,
		collapsedHeight: 0,
	};

	componentWillReceiveProps(nextProps) {
		if(nextProps.collapsed !== this.state.collapsed) {
			this._toggleState();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			collapsed: this.props.collapsed,
			animating: false,
			animatedViewHeight: new Animated.Value(0),
			contentHeight: 0,
		};
	}

	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this._renderAnchor()}
				{this._renderDetail()}
			</View>
		);
	}

	// Renders the Anchor View
	_renderAnchor() {
		return <TouchableOpacity
			onPress={this._toggleState.bind(this)}>
			{this.props.renderAnchor() || null}
		</TouchableOpacity>;
	}

	// Renders the Detail View
	_renderDetail() {
		const outerStyle = {
			height: this.state.animatedViewHeight || undefined,
			overflow: 'hidden',
		};
		return <Animated.View style={outerStyle}>
			<View onLayout={this._handleContentLayoutChange.bind(this)}>
				{this.props.renderDetail() || null}
			</View>
		</Animated.View>;
	}

	// Animate the detail region open/closed and update state
	_toggleState() {
		const collapsed = !this.state.collapsed;
		const toHeight = collapsed ? this.props.collapsedHeight : this.state.contentHeight;
		this.setState({
			animating: true,
			collapsed: collapsed,
		});
		if(this._animation) this._animation.stop();
		// Start changing the animatedViewHeight's value
		this._animation = Animated.timing(this.state.animatedViewHeight, {
			toValue: toHeight,
			duration: this.props.duration,
			easing: this.props.easing,
		})
		.start(() => {
			this.setState({
				animating: false,
			});
		});
	}

	// Get the height of the Content Region when layed out, so we know the size to animate
	_handleContentLayoutChange(e) {
		if(this.state.animating) return null; // Don't update dimensions if already animating, as that messes up the animation causing it to pop in and out.
		const height = e.nativeEvent.layout.height;
		this.setState({
			contentHeight: height,
			animatedViewHeight: new Animated.Value(this.state.collapsed ? this.props.collapsedHeight : height),
		});
	}

}

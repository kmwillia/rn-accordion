import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	ListView,
	Image,
	TouchableOpacity,
	Switch,
	StyleSheet,
} from 'react-native';

import Accordion from './Accordion';
import editIcon from './img/iconPencil2.png';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}).cloneWithRows([
				{title: 'Accordion #1', },
				{title: 'Accordion #2', },
				{title: 'Accordion #3', },
				{title: 'Accordion #4', editable: true, },
				{title: 'Accordion #5', },
				{title: 'Accordion #6', },
				{title: 'Accordion #7', },
				{title: 'Accordion #8', },
				{title: 'Accordion #9', },
				{title: 'Accordion #10', },
				{title: 'Accordion #11', },
				{title: 'Accordion #12', },
				{title: 'Accordion #13', },
				{title: 'Accordion #14', },
				{title: 'Accordion #15', },
				{title: 'Accordion #16', },
				{title: 'Accordion #17', },
				{title: 'Accordion #18', },
				{title: 'Accordion #19', },
				{title: 'Accordion #20', },
			]),
			switchState: false,
		}
	}

	render() {
		return <View style={styles.rootContainer}>
			{this._renderOptions()}
			{this._renderAccordions()}
		</View>;
	}

	_renderOptions() {
		return <View style={styles.optionsContainer}>
			<View style={styles.optionSet}>
				<Text>{'Toggle All'}</Text>
				<Switch
					value={this.state.switchState}
					onValueChange={(v)=>{this.setState({ switchState: v, })}}
					/>
			</View>
		</View>;
	}

	_renderAccordions() {
		return <ListView
			pageSize={10}
			initialListSize={20}
			dataSource={this.state.dataSource}
			renderRow={this._renderAccordion.bind(this)}
			/>;
	}

	_renderAccordion(data) {
		return <Accordion
			renderAnchor={()=>this._renderAnchor(data)}
			renderDetail={()=>this._renderDetail(data)}
			collapsed={!this.state.switchState}
			/>;
	}

	_renderAnchor(data) {
		return <View style={styles.anchorContainer}>
			<Text style={styles.anchorText}>
				{data.title}
			</Text>
			{data.editable && <TouchableOpacity onPress={(e)=>{
				alert('pressed');
			}}>
				<Image source={editIcon} />
			</TouchableOpacity>}
		</View>;
	}

	_renderDetail(data) {
		return <View style={{padding: 16}}>
			<Text style={{fontSize: 18}}>
				{'Detail'}
			</Text>
			<Text>{'Some more words'}</Text>
			<Image
				source={{uri: 'http://www.kmwillia.com/img/header.jpg'}}
				resizeMode={'cover'}
				style={{flex: 1, height: 300}}
				/>
			<Text>{'An image even'}</Text>
		</View>;
	}

}


const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
	optionsContainer: {
		flexDirection: 'row',
		padding: 16,
		backgroundColor: '#ff880042',
		flexWrap: 'wrap',
	},
	optionSet: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	anchorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#abcdef88',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#bdbdbd',
	},
	anchorText: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

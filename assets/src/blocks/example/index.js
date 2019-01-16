import './styles/editor.scss';
import './styles/style.scss';

export const name = 'hot-blocks/example';

export const options = {
	title: 'Hot Blocks - Example',
	description: 'A simple example block.',
	icon: 'image-filter',
	category: 'common',

	edit( props ) {
		const { className } = props;
		return (
			<div className={ className }>
				<h2>Example block - editor</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Example block - front end</h2>
			</div>
		);
	},
};

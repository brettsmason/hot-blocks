import './editor.scss';
import './style.scss';

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
				<h2>Example block - frontend</h2>
			</div>
		);
	},
};

import './styles/editor.scss';
import './styles/style.scss';

export const name = 'hot-blocks/example-two';

export const options = {
	title: 'Hot Blocks - Example Two',
	description: 'A second simple example block.',
	icon: 'admin-links',
	category: 'widgets',

	edit( props ) {
		const { className } = props;
		return (
			<div className={ className }>
				<h2>Example block two - editor</h2>
			</div>
		);
	},

	save() {
		return (
			<div>
				<h2>Example block two - front end</h2>
			</div>
		);
	},
};

// Block styles.
import './styles/editor.scss';
import './styles/style.scss';

// Editor components/external dependencies.
import { __ } from '@wordpress/i18n';

export const name = 'hot-blocks/example-two';

export const settings = {
	title: __( 'Hot Blocks - Example Two', 'hot-blocks' ),
	description: __( 'A second simple example block.', 'hot-blocks' ),
	icon: 'admin-links',
	category: 'widgets',
	keywords: [
		__( 'Example block two', 'hot-blocks' ),
	],

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

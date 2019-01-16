// Block styles.
import './styles/editor.scss';
import './styles/style.scss';

// Editor components/external dependencies.
import { __ } from '@wordpress/i18n';

export const name = 'hot-blocks/example';

export const settings = {
	title: __( 'Hot Blocks - Example', 'hot-blocks' ),
	description: __( 'A simple example block.', 'hot-blocks' ),
	icon: 'image-filter',
	category: 'common',
	keywords: [
		__( 'Example block', 'hot-blocks' ),
	],

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

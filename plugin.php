<?php
/**
 * Hot Blocks
 *
 * @author    Brett Mason
 * @license   GPL-2.0+
 * @copyright 2018 Brett Mason
 *
 * @wordpress-plugin
 * Plugin Name: Hot Blocks
 * Description: A custom Gutenberg block starter kit, complete with hot reloading for easier development.
 * Version:     0.1.0
 * Author:      Brett Mason
 * Author URI:  https://github.com/brettsmason
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Enqueue editor UI scripts & styles.
require_once( __DIR__ . '/inc/asset-loader.php' );
require_once( __DIR__ . '/inc/scripts.php' );
Hot_Blocks\Scripts\setup();

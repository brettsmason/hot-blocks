# Hot Blocks - A WordPress block scaffolding kit

A sane starter kit to get started building your own custom blocks.

## Features

- Webpack config and commands
- Hot reloading for easy development
- Translation ready
- Example block code

## Usage

You'll need to use the command line to start making edits so these intructions assume some basic command line knowledge.

### Setting up

1. `cd` to your plugins directory in your WordPress install
2. Run `git clone https://github.com/brettsmason/hot-blocks.git plugin-name`
3. `cd plugin-name`
4. `npm install`

### Developing

There are 2 commands to get you started:

1. `npm run build` - builds production ready files for your plugin.
2. `npm run dev` - runs Webpack dev server and allows hot reloading of blocks. Used for development.

## Block structure

Each block should be added in `assets/src/blocks` in its own folder.
All blocks are autoloaded, so any new block added in `assets/src/blocks` will be included automatically.

Each block should have the following structure as a bare minimum:

1. A `name` constant used to identify the block, eg `export const name = 'plugin-textdomain/block-name';`
1. A `settings` constant. This contains all of the block functionality including the `edit` and `save` fields.

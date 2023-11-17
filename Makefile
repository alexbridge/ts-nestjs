SHELL := /bin/bash

FZF_DEFAULT_OPTS ?='--height 50% --layout=reverse --border --exact'

.DEFAULT:
_recipe-list:
	@recipe=$$(grep -oE '^[a-z][a-zA-Z0-9-]+:' Makefile | tr -d ':' | \
	fzf --preview 'make --silent -n {} | head -n 5' --preview-window=50%:down); \
	[[ -n "$$recipe" ]] && make --silent $$recipe

# Interactive NPM
npmi:
	# Interactive npm scripts
	script=$$(jq -r '.scripts | to_entries[] | "\(.key) => \(.value)"' < package.json | sort | fzf | cut -d' ' -f1); \
	[ -n "$$script" ] && npm run $$script

# NESTJS Helpers
nest-add-module:
	@read -p "New module name: modules/" name; \
	[ -n "$${name}" ] && npx nest generate module "modules/$${name}"

nest-add-resource:
	@read -p "New resource name: modules/domain" name; \
	[ -n "$${name}" ] && npx nest generate resource "modules/domain/$${name}"

# Upgrade all dependencies
upgrade:
	npm update --save
	npm update --save-dev
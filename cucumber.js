/* eslint-disable camelcase */
const common = [
	'--require-module ts-node/register', // Load TypeScript module
  '--require-module tsconfig-paths/register'
];

const ci = [
	...common,
	'tests/features/**/*.feature',
	'--require tests/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	ci
}

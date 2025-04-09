import type { TestRunnerConfig } from '@storybook/test-runner';

/** Filter tests
 * Option Description
 * [exclude] Prevents stories if they match the provided tags from being tested.
 * [include] Defines a subset of stories only to be tested if they match the enabled tags.
 * [skip] Skips testing on stories if they match the provided tags.
 * learn more: [https://storybook.js.org/docs/writing-tests/test-runner#experimental-filter-tests]
 * */
const config: TestRunnerConfig = {
    tags: {
        // include: ['test-only', 'pages'],
        exclude: ['no-tests'],
        // skip: ['skip-test', 'layout'],
    },
};

export default config;
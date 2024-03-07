import {readFile, writeFile} from 'node:fs/promises';
import {minify} from '@minify-html/wasm';

let original = await readFile('src/index.html');

const minified = minify(original, {
  do_not_minify_doctype: true,
  ensure_spec_compliant_unquoted_attribute_values: true,
  keep_spaces_between_attributes: true,
  minify_css: true,
  minify_css_level_1: true,
  minify_css_level_2: true,
  minify_css_level_3: true,
});

await writeFile('dist/index.html', minified);

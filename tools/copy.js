
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import pkg from '../package.json';

async function copy() {
    await Promise.all([
        writeFile(
            'build/package.json',
            JSON.stringify(
                {
                    private: true,
                    engines: pkg.engines,
                    scripts: {
                        start: 'node server.js',
                    },
                },
                null,
                2
            )
        ),
        copyFile('LICENSE.txt', 'build/LICENSE.txt'),
        copyFile('yarn.lock', 'build/yarn.lock'),
    ])
}

export default copy;
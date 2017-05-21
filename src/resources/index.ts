import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        './attributes/valor',
        './attributes/enter-key-press'
    ]);
}

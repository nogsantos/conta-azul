import { Aurelia } from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('resources')    
        .plugin('aurelia-bootstrap', config => {
            config.options.paginationBoundaryLinks = false;
            config.options.paginationDirectionLinks = true;
            config.options.paginationHideSinglePage = true;
            config.options.paginationNextText = '&raquo;';
            config.options.paginationPreviousText = '&laquo;';
        })
        .feature('resources');

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}

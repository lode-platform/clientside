class WebsiteDisplaySettings {

    constructor(settings = null,options = null,defaults = null) {
        this.no_value = {'no_value': true};
        this.localStorageHandle = 'WebsiteDisplaySettings';
        this.settings = settings != null ? settings : {};
        this.setting_options = options != null ? options : {};
        this.setting_defaults = defaults != null ? defaults : {};
        this.setting_helpers = {};
    }
    init() {
        let autoload = localStorage.getItem(this.localStorageHandle+"-autoload");
        if (autoload !== null && autoload) {
            this.restore();
            this.write();
        }
    }
    reset() {
        this.settings = {};
        for (let setting in this.setting_defaults) {
            this.settings[setting] = this.setting_defaults[setting];
        }
    }

    set(setting,value) {
        if (setting in this.setting_options && this.setting_options[setting].includes(value)) {
            this.settings[setting] = value;
            return true;
        }
        return false;
    };
    get(setting) {
        if (setting in this.settings) {
            return this.settings[setting];
        }
        return false;
    }
    store() {
        //save settings to local storage
        let new_settings = {
            'settings' : this.settings,
            'options' : this.setting_options,
            'defaults' : this.setting_defaults
        };
        let new_json = JSON.stringify(new_settings);
        localStorage.setItem(this.localStorageHandle,new_json);
        return true;
    }
    clear() {
       localStorage.removeItem(this.localStorageHandle);
       return true;
    }
    autoload(on= null) {
        if (on === null) {
            return localStorage.getItem(this.localStorageHandle+'-autoload');
        } else if (on) {
            localStorage.setItem(this.localStorageHandle+'-autoload',true);
        } else {
            localStorage.removeItem(this.localStorageHandle+'-autoload');
        }
    }
    restore() {
        //load settings to local storage
        let saved_json = localStorage.getItem(this.localStorageHandle);
        let saved_settings = null;
        try {
            saved_settings = JSON.parse(saved_json);
            if (saved_settings['settings'] != null) {
                this.settings = saved_settings['settings'];
            }
            if (saved_settings['options'] != null) {
                this.setting_options = saved_settings['options'];
            }
            if (saved_settings['defaults'] != null) {
                this.setting_defaults = saved_settings['defaults'];
            }
            return true;
        } catch (e) {}
        return false;
    }
    write() {
        //update DOM to add/remove classes as needed to reflect current display settings
        let all_success = true;
        for (let setting in this.settings) {
            let value = this.settings[setting];
            if (setting in this.setting_helpers && this.setting_options[setting].includes(value)) {
                let result = this.setting_helpers[setting].call(this,value);
                if (all_success && !result) {
                    all_success = false;
                }
            }
        }
        //return all_success;
    }
    read(){
        //set settings selection based on current DOM classes
        for (let setting in this.settings) {
            if (setting in this.setting_helpers) {
                let new_value = this.setting_helpers[setting].call(this);
                if (new_value !== this.no_value) {
                    this.set(setting,new_value);
                }
            }
        }
    }
}



class AdminPanelSettings extends WebsiteDisplaySettings{
    constructor() {
        super();
        this.localStorageHandle = 'AdminPanelSettings';
        this.setting_options = {
            'bs-theme' : ['auto','light','dark'],
            'header-position' : ['sticky','relative'],

            'sidebar-position' : [
                'sticky','sticky-xs','sticky-sm','sticky-md','sticky-lg','sticky-xl','sticky-xxl',
                'relative','relative-xs','relative-sm','relative-md','relative-lg','relative-xl','relative-xxl',
                'overlay','overlay-xs','overlay-sm','overlay-md','overlay-lg','overlay-xl','overlay-xxl',
            ],
            'sidebar-style' : ['block','card'],
            'sidebar-size' : ['large','medium','small'],
            'sidebar-background' : ['inverted','color-scheme','transparent'],

            'sidebar-expander-graphic' : ['caret','chevron','plus','plus-square','none'],
            'sidebar-expander-position' : ['left','right','none'],

            'navigation-style' : ['paged', 'continuous'],
            'extra' : ['1', '2']
        };
        this.setting_defaults = {
            'bs-theme' : 'auto',
            'header-position' : 'sticky',
            'sidebar-position' : 'sticky',
            'sidebar-style' : 'block',
            'sidebar-size' : 'large',
            'sidebar-background' : 'inverted',

            'sidebar-expander-graphic' : 'caret',
            'sidebar-expander-position' : 'left',
            'navigation-style' : 'paged',
            'extra' : '1'
        };
        this.setting_helpers = {};
        this.setting_helpers['bs-theme'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if (document.documentElement.hasAttribute('data-bs-theme-default')) {
                    return document.documentElement.getAttribute('data-bs-theme-default');
                }
                if (document.documentElement.hasAttribute('data-bs-theme')) {
                    return document.documentElement.getAttribute('data-bs-theme');
                } else {
                    return this.no_value;
                }
            } else {
                //write helper
                if (this.setting_options['bs-theme'].includes(value)) {

                    if (value == 'auto') {
                        document.documentElement.setAttribute('data-bs-theme-default',value);
                        let current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                        document.documentElement.setAttribute('data-bs-theme',current);
                    } else {
                        document.documentElement.setAttribute('data-bs-theme-default',value);
                        document.documentElement.setAttribute('data-bs-theme',value);
                    }


                    return true;
                } else {
                    return false;
                }
            }
        };
        this.setting_helpers['header-position'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($("body").hasClass('sticky-header-nav')) {
                    return 'sticky';
                } else if ($("body").hasClass('inline-header-nav')) {
                    return 'relative';
                } else {
                    return this.no_value;
                }
            } else {
                //write helper
                if (this.setting_options['header-position'].includes(value)) {
                    if (value != 'sticky') {
                        $('body').removeClass('sticky-header-nav');
                    } else {
                        $("body").addClass('sticky-header-nav');
                    }
                    if (value != 'relative') {
                        $("body").removeClass('inline-header-nav');
                    } else {
                        $("body").addClass('inline-header-nav');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.setting_helpers['sidebar-position'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($(".left-menu-aside").hasClass('sidebar-sticky')) {
                    return 'sticky';
                } else if ($(".left-menu-aside").hasClass('sidebar-relative')) {
                    return 'relative';
                } else if ($(".left-menu-aside").hasClass('sidebar-fixed')) {
                    return 'overlay';
                } else {
                    return this.no_value;
                }
            } else {
                //write helper
                if (this.setting_options['sidebar-position'].includes(value)) {
                    if (value != 'sticky') {
                        $(".left-menu-aside").removeClass('sidebar-sticky');
                    } else {
                        $(".left-menu-aside").addClass('sidebar-sticky');
                    }
                    if (value != 'relative') {
                        $(".left-menu-aside").removeClass('sidebar-relative');
                    } else {
                        $(".left-menu-aside").addClass('sidebar-relative');
                    }
                    if (value != 'overlay') {
                        $(".left-menu-aside").removeClass('sidebar-fixed');
                    } else {
                        $(".left-menu-aside").addClass('sidebar-fixed');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.setting_helpers['sidebar-style'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($(".left-menu-aside .left-sidebar").hasClass('card')) {
                    return 'card';
                }
                return 'block';
            } else {
                //write helper
                if (this.setting_options['sidebar-style'].includes(value)) {
                    if (value != 'card') {
                        $(".left-menu-aside .left-sidebar").removeClass('card');
                    } else {
                        $(".left-menu-aside .left-sidebar").addClass('card');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };

        this.setting_helpers['sidebar-expander-graphic'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($(".left-menu-aside .left-sidebar").hasClass('expander-caret')) {
                    return 'caret';
                } else if ($(".left-menu-aside .left-sidebar").hasClass('expander-chevron')) {
                    return 'chevron';
                } else if ($(".left-menu-aside .left-sidebar").hasClass('expander-plus')) {
                    return 'plus';
                } else if ($(".left-menu-aside .left-sidebar").hasClass('expander-plus-square')) {
                    return 'plus-square';
                } else {
                    return 'none';
                }
            } else {
                //write helper
                if (this.setting_options['sidebar-expander-graphic'].includes(value)) {

                    if (value != 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-none');
                    }
                    if (value != 'caret' || value == 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-caret');
                    } else if (value == 'caret')  {
                        $(".left-menu-aside .left-sidebar").addClass('expander-caret');
                    }
                    if (value != 'chevron' || value == 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-chevron');
                    } else if (value == 'chevron')  {
                        $(".left-menu-aside .left-sidebar").addClass('expander-chevron');
                    }
                    if (value != 'plus' || value == 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-plus');
                    } else if (value == 'plus')  {
                        $(".left-menu-aside .left-sidebar").addClass('expander-plus');
                    }
                    if (value != 'plus-square' || value == 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-plus-square');
                    } else if (value == 'plus-square')  {
                        $(".left-menu-aside .left-sidebar").addClass('expander-plus-square');
                    }
                    if (value == 'none') {
                        $(".left-menu-aside .left-sidebar").addClass('expander-none');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };


        this.setting_helpers['sidebar-expander-position'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($(".left-menu-aside .left-sidebar").hasClass('expander-left')) {
                    return 'left';
                } else if ($(".left-menu-aside .left-sidebar").hasClass('expander-right')) {
                    return 'right';
                } else if ($(".left-menu-aside .left-sidebar").hasClass('expander-none')) {
                    return 'none';
                } else {
                    return 'none';
                }
            } else {
                //write helper
                if (this.setting_options['sidebar-expander-position'].includes(value)) {
                    if (value != 'left' || value == 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-left');
                    } else if (value == 'left')  {
                        $(".left-menu-aside .left-sidebar").addClass('expander-left');
                    }
                    if (value != 'right' || value == 'none') {
                        $(".left-menu-aside .left-sidebar").removeClass('expander-right');
                    } else if (value == 'right')  {
                        $(".left-menu-aside .left-sidebar").addClass('expander-right');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.setting_helpers['sidebar-size'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($(".left-menu-aside").hasClass('sidebar-lg')) {
                    return 'large';
                } else if ($(".left-menu-aside").hasClass('sidebar-md')) {
                    return 'medium';
                } else if ($(".left-menu-aside").hasClass('sidebar-sm')) {
                    return 'small';
                } else {
                    return this.no_value;
                }
            } else {
                //write helper
                if (this.setting_options['sidebar-size'].includes(value)) {
                    if (value != 'large') {
                        $(".left-menu-aside").removeClass('sidebar-lg');
                    } else {
                        $(".left-menu-aside").addClass('sidebar-lg');
                    }
                    if (value != 'medium') {
                        $(".left-menu-aside").removeClass('sidebar-md');
                    } else {
                        $(".left-menu-aside").addClass('sidebar-md');
                    }
                    if (value != 'small') {
                        $(".left-menu-aside").removeClass('sidebar-sm');
                    } else {
                        $(".left-menu-aside").addClass('sidebar-sm');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.setting_helpers['navigation-style'] = function(value = this.no_value) {
            if (value === this.no_value) {
                //read helper
                if ($("body").hasClass('nav-style-continuous')) {
                    return 'continuous';
                } else if ($("body").hasClass('nav-style-paged')) {
                    return 'paged';
                } else {
                    return this.no_value;
                }
            } else {
                //write helper
                if (this.setting_options['navigation-style'].includes(value)) {
                    if (value == 'paged') {
                        $("body").addClass('nav-style-paged');
                        $("body").removeClass('nav-style-continuous');
                    } else {
                        $("body").addClass('nav-style-continuous');
                        $("body").removeClass('nav-style-paged');
                    }
                    return true;
                } else {
                    return false;
                }
            }
        };



        this.reset();
    }

}
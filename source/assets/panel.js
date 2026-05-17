if (document.documentElement.hasAttribute('data-bs-theme') && !document.documentElement.hasAttribute('data-bs-theme-default')) {
    document.documentElement.setAttribute('data-bs-theme-default',document.documentElement.getAttribute('data-bs-theme'));
}



let panelSettings = new AdminPanelSettings();


$(function() {

    $("#color-scheme-light").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('bs-theme', 'light');
            panelSettings.write();
        }
    });
    $("#color-scheme-dark").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('bs-theme', 'dark');
            panelSettings.write();
        }
    });
    $("#color-scheme-auto").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('bs-theme', 'auto');
            panelSettings.write();
        }
    });
    $("#header-position-sticky").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('header-position', 'sticky');
            panelSettings.write();
        }
    });
    $("#header-position-relative").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('header-position', 'relative');
            panelSettings.write();
        }
    });
    $("#sidebar-position-sticky").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-position', 'sticky');
            panelSettings.write();
        }
    });
    $("#sidebar-position-relative").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-position', 'relative');
            panelSettings.write();
        }
    });
    $("#sidebar-position-overlay").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-position', 'overlay');
            panelSettings.write();
        }
    });

    $("#sidebar-expander-caret").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-graphic', 'caret');
            panelSettings.write();
        }
    });
    $("#sidebar-expander-chevron").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-graphic', 'chevron');
            panelSettings.write();
        }
    });

    $("#sidebar-expander-plus").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-graphic', 'plus');
            panelSettings.write();
        }
    });

    $("#sidebar-expander-plus-square").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-graphic', 'plus-square');
            panelSettings.write();
        }
    });
    $("#sidebar-expander-none").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-graphic', 'none');
            panelSettings.write();
        }
    });

    $("#sidebar-expander-left").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-position', 'left');
            panelSettings.write();
        }
    });

    $("#sidebar-expander-right").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-expander-position', 'right');
            panelSettings.write();
        }
    });

    $("#sidebar-size-large").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-size', 'large');
            panelSettings.write();
        }
    });
    $("#sidebar-size-medium").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-size', 'medium');
            panelSettings.write();
        }
    });
    $("#sidebar-size-small").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-size', 'small');
            panelSettings.write();
        }
    });
    $("#sidebar-responsive-position-sticky").on("input",function(event){
        let text_el = $('#sidebar-responsive-position-sticky-text');
        let val = $(this).val();
        if (val == 0) {
            text = ' None';
        } else if (val == 1) {
            text = 'sidebar-sticky';
        } else if (val == 2) {
            text = 'sidebar-sticky-xs (540px)';
        } else if (val == 3) {
            text = 'sidebar-sticky-md (720px)';
        } else if (val == 4) {
            text = 'sidebar-sticky-lg (960px)';
        } else if (val == 5) {
            text = 'sidebar-sticky-xl (1140px)';
        } else if (val == 6) {
            text = 'sidebar-sticky-xxl (1320px)';
        }
        text_el.html('  '+text);
    });
    $("#sidebar-responsive-position-relative").on("input",function(event){
        let text_el = $('#sidebar-responsive-position-relative-text');
        let val = $(this).val();
        if (val == 0) {
            text = ' None';
        } else if (val == 1) {
            text = 'sidebar-relative';
        } else if (val == 2) {
            text = 'sidebar-relative-xs (540px)';
        } else if (val == 3) {
            text = 'sidebar-relative-md (720px)';
        } else if (val == 4) {
            text = 'sidebar-relative-lg (960px)';
        } else if (val == 5) {
            text = 'sidebar-relative-xl (1140px)';
        } else if (val == 6) {
            text = 'sidebar-relative-xxl (1320px)';
        }
        text_el.html('  '+text);
    });
    $("#sidebar-responsive-position-overlay").on("input",function(event){
        let text_el = $('#sidebar-responsive-position-overlay-text');
        let val = $(this).val();
        if (val == 0) {
            text = ' None';
        } else if (val == 1) {
            text = 'sidebar-fixed';
        } else if (val == 2) {
            text = 'sidebar-fixed-xs (540px)';
        } else if (val == 3) {
            text = 'sidebar-fixed-md (720px)';
        } else if (val == 4) {
            text = 'sidebar-fixed-lg (960px)';
        } else if (val == 5) {
            text = 'sidebar-fixed-xl (1140px)';
        } else if (val == 6) {
            text = 'sidebar-fixed-xxl (1320px)';
        }
        text_el.html('  '+text);
    });



    $("#sidebar-style-block").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-style', 'block');
            panelSettings.write();
        }
    });


    $("#sidebar-style-card").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.set('sidebar-style', 'card');
            panelSettings.write();
        }
    });


    $("#localstorage-autoload").on("change",function(event){
        if ($(this).is(':checked')) {
            panelSettings.autoload(true);
        } else {
            panelSettings.autoload(false);
        }
    });


    $("#reset-theme-btn").on("click",function(event){
        event.preventDefault();
        panelSettings.reset();
        panelSettings.write();
        updateFormFields();

    });
    $("#store-theme-btn").on("click",function(event){
        event.preventDefault();
        panelSettings.store();
    });
    $("#clear-theme-btn").on("click",function(event){
        event.preventDefault();
        panelSettings.clear();
    });
    $("#restore-theme-btn").on("click",function(event){
        event.preventDefault();
        panelSettings.restore();
        panelSettings.write();
        updateFormFields();
    });






//window.getComputedStyle('body').getPropertyValue('--header-nav-height-offset');




    //setup navigation:
    if (panelSettings.get('navigation-style') == 'paged') {
        $(".sidebar-link").on("click",function(event){
            let target = $(this)[0].getAttribute('href');

            $(".nav-link.sidebar-link").removeClass("active");
            $(this).addClass("active");
            if ($(target+"-block").length > 0) {
                $("div.page").hide();
                $(target + "-block").show();
            }
        });
        let target = $(".nav-link.sidebar-link.active");
        if (target) {
            target = target[0].getAttribute('href');
        }
        if (target) {
            $("div.page").hide();
            $(target + "-block").show();
        }
    } else {
        //continueous
        // data-bs-spy="scroll" data-bs-target="#left-sidebar-nav" data-bs-offset="0"
        window.scrollSpy = new bootstrap.ScrollSpy($("#section-group-admin")[0], {
            target: '#left-sidebar-nav'
        })

    }


});
function updateFormFields() {

    let value = panelSettings.get('bs-theme');
    $("input:radio[name='color-scheme-radio']").prop('checked',false);
    $('#color-scheme-'+value).prop('checked',true);

    value = panelSettings.get('header-position');
    $("input:radio[name='header-position-radio']").prop('checked',false);
    $('#header-position-'+value).prop('checked',true);

    value = panelSettings.get('sidebar-position');
    $("input:radio[name='sidebar-position-radio']").prop('checked',false);
    $('#sidebar-position-'+value).prop('checked',true);

    value = panelSettings.get('sidebar-style-radio');
    $("input:radio[name='sidebar-style-radio']").prop('checked',false);
    $('#sidebar-style-'+value).prop('checked',true);

    value = panelSettings.get('sidebar-size-radio');
    $("input:radio[name='sidebar-size-radio']").prop('checked',false);
    $('#sidebar-size-'+value).prop('checked',true);

    value = panelSettings.get('sidebar-expander-graphic');
    $("input:radio[name='sidebar-expander-graphic-radio']").prop('checked',false);
    $('#sidebar-expander-'+value).prop('checked',true);

    value = panelSettings.get('sidebar-expander-position-radio');
    $("input:radio[name='sidebar-expander-position-radio']").prop('checked',false);
    $('#sidebar-expander-position-'+value).prop('checked',true);

    value = panelSettings.autoload();
    if (value !== null) {
        $("#localstorage-autoload").prop('checked',value);
    }
}


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.remove('hidden');
    } else if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.add('hidden');
    } else {
        sidebar.classList.add('collapsed');
    }
    //sidebar.classList.toggle('collapsed');
}


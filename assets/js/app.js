$(document).ready(function()
{

    const themes_color = {
        default: {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#3D0202",
            "theme-color-opacity": "rgba(61, 2, 2, 0.8)"
        },
        "dark-blue": {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#02133d",
            "theme-color-opacity": "rgba(2,7,61,0.8)"
        },
        "brown": {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#3d2302",
            "theme-color-opacity": "rgba(61,29,2,0.8)"
        },
        "orange": {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#b96900",
            "theme-color-opacity": "rgba(185,105,0,0.8)"
        }
    };
    let theme_settings = $(".theme-settings");
    Object.keys(themes_color).forEach(function(key)
    {
        theme_settings.html(`${theme_settings.html()} <div class="theme ${key}" style="background-color:${themes_color[key]["theme-color"]}"></div>`);
    });

    const set_theme = function(theme)
    {
        Object.keys(theme).forEach(function(key)
        {
            document.documentElement.style.setProperty(`--${key}`, theme[key]);
        });
    }
    set_theme(themes_color["default"])


    const ratio = .1;
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: ratio
    };

    const interaction_callback = (entries, observer) =>
    {
        entries.forEach((entry) =>
        {
            if (entry.intersectionRatio > ratio)
            {
                if (entry.target.classList.contains('score'))
                {
                    $(entry.target).find('.value').css('width', "80%");
                }


                if (!entry.target.classList.contains('score'))
                {
                    entry.target.classList.add("anim-show");
                    observer.unobserve(entry.target);
                }
            }
        });
    }

    const observer = new IntersectionObserver(interaction_callback, options);
    const anim_element = (selector) =>
    {
        document.querySelectorAll(selector).forEach((el) =>
        {
            observer.observe(el);
        });
    };

    anim_element(".anim-hidden");
    anim_element(".score");

    $(".theme-button").click(function ()
    {
        theme_settings.toggleClass("show");
    });

    $(".theme").each(function()
    {
        $(this).click(() =>
        {
            if (document.querySelector(".theme-settings").classList.contains("show"))
            {
                let t_name = $(this)[0].classList[1];
                set_theme(themes_color[$(this)[0].classList[1]]);
                theme_settings.toggleClass("show");
            }
        });
    });

    $(".w-content").hover(function ()
    {
        $(this).find(".w-caption").css("bottom", '0');
    }, function ()
    {
        $(this).find(".w-caption").css("bottom", "-60%");

    });
});


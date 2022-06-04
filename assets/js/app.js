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


    const theme_settings = $(".theme-settings");
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

    const skills = {
        frontend: {
            html5: 90,
            css3: 70,
            javascript: 40
        },
        backend: {
            php: 70,
            symfony: 30,
            django: 20
        },
        software: {
            git: 50,
            github: 60,
            figma: 30
        },
        os: {
            linux: 70,
            windows: 80,
            macos: 70
        }
    };

    const init_s_value = function(el, value, parent = null) {
        if (parent)
        {
            let i = 0;
            do {
                el = el.parent();
                i++;
            }while(i < parent);

            el = el.find(".value");
        }
        el.css("width", value);
    };


    const reset_s = function(name, el = null, parent = null)
    {
        let add = 0;
        let count = 0;
        Object.keys(skills[name]).forEach(function(key)
        {
            add += skills[name][key];
            count++;
        });
        add /= count;

        init_s_value((el) ? el : $(`.${name}`), `${add}%`, parent);

    }


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
                    reset_s("frontend", null, 1);
                    reset_s("backend", null, 1);
                    reset_s("software", null, 1);
                    reset_s("os", null, 1);
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

    $(".w-img").hover(function ()
    {
        $(this).find("img").css("transform", "scale(1.1)");
    }, function ()
    {
        $(this).find("img").css("transform", "scale(1)");
    });

    let type_writer = function(el, text, delay, text_position = 0)
    {
        el.text(text.substring(0 , text_position));
        if (text_position++ != text.length)
        {
            setInterval(type_writer(el, text, delay, text_position), delay);
        }
    };


    $(".s-icon").hover(function ()
    {
        let value = `${skills[$(this).parent().attr("class").split(' ')[1]][$(this).attr('id')]}%`;
        type_writer($(this), ` ${value}`, 1000);
        init_s_value($(this), value , 2);
        //$(this).parent().parent().find(".value").css("width", "30%");
    }, function()
    {
        reset_s($(this).parent().attr("class").split(' ')[1], $(this), 2);
        $(this).text("")

    });

});


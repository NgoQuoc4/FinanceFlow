// scroll change color header
function scrollChangeColorHeader() {
    const header = document.querySelector('header');
    let heightHeader = header.offsetHeight;
    window.addEventListener('scroll', () => {
        // get scroll window
        const scrolled = window.scrollY;
        if (scrolled + 1 > heightHeader) {
            header.classList.add('--active');
        }
        else {
            header.classList.remove('--active');
        }
    })
}
scrollChangeColorHeader();

// siler scwhat
function handleSlider() {
    let slider = document.querySelector('.scwhat__list');
    if (slider) {
        let flktySlider = new FlickityResponsive(slider, {
            // options
            cellAlign: 'center',
            contain: true,
            draggable: '>1',
            prevNextButtons: false,
            groupCells: 2,
            wrapAround: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        cellAlign: 'center',
                        groupCells: 1,
                    }
                }
            ],
            on: {
                ready: function () {
                    handleHeightSlider();
                },
            },
        },);
        // resize change height slider
        window.addEventListener('resize', () => {
            handleHeightSlider();
        });
        // what silder height
        function handleHeightSlider() {
            let slider = document.querySelectorAll('.scwhat__list-item');
            let maxHeight = 0;
            slider.forEach((item) => {
                let text = item.querySelector('.text');
                let height = text.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            slider.forEach((item) => {
                let text = item.querySelector('.text');
                let info = document.querySelector('.info');
                let heightinfo = info.offsetHeight;
                let heightDiv = maxHeight + heightinfo + 130;
                item.style.height = `${heightDiv}px`;
            })
        }
    }
}
window.addEventListener('load', function () {
    handleSlider();
});

// csroll propressbar
function handlePropressbar() {
    let propressbar = document.querySelector('.propressbarheader');
    if (propressbar) {
        window.addEventListener('scroll', () => {
            // get scroll window
            let scrolled = window.scrollY;
            // get scroll body
            let heightScroll = document.body.clientHeight - window.innerHeight;
            // percnet window/body
            let percent = scrolled / heightScroll * 100;
            propressbar.style.width = `${percent}%`;
        });
    }
}
// loading window
window.addEventListener('load', handlePropressbar());

//menu nav mobile
function menuNav() {
    const btnMenu = document.querySelector('.header__cta-mobile');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.menumobile');
    const body = document.querySelector('.body');
    const backToTop = document.querySelector('.footer__bottom-backtotop');
    btnMenu.addEventListener("click", () => {
        // add class active / removed
        btnMenu.classList.toggle("--active");
        nav.classList.toggle("--active");
        body.classList.toggle("--active");
        header.classList.add("--activeNav");
        backToTop.classList.toggle("--unactive");
    });
    // // thay doi width
    window.addEventListener("resize", () => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 992) {
            nav.classList.remove('--active');
            btnMenu.classList.remove('--active');
            body.classList.remove("--active");
            header.classList.remove("--activeNav");
            backToTop.classList.remove("--unactive");

        }
    })
}
menuNav();

// back to top
function backToTop() {
    const backToTop = document.querySelector('.footer__bottom-backtotop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            // get scroll window
            const scrolled = window.scrollY;
            // scroll 1000px
            if (scrolled > 1000) {
                backToTop.classList.add('--active');
            }
            else {
                backToTop.classList.remove('--active');
            }
        })
        backToTop.addEventListener('click', () => {
            // scroll top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }
}
backToTop();

// popup video
function handlePopupVideo() {
    let videos = document.querySelector('.scget__video'),
        popup = document.querySelector('.popupvideo'),
        iframevideo = document.querySelector('.popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe'),
        closeVideo = document.querySelector('.popupvideo .popupvideo__inner-close'),
        body = document.querySelector('.body');
    // kiem tra co video khong
    if (videos) {
        videos.addEventListener('click', () => {
            // show popup video
            popup.classList.add('--active');
            body.classList.add("--active");
            // get id src video
            let dataId = videos.getAttribute('data-video-src');
            // link to video
            iframevideo.setAttribute('src', `https://www.youtube.com/embed/${dataId}?autoplay=1&mute=0`);
        })

        // function close popup video
        function closeModal() {
            popup.classList.remove('--active');
            iframevideo.setAttribute('src', ``)
            body.classList.remove("--active");
        }
        // close popup video - icon close button
        closeVideo.addEventListener('click', () => {
            closeModal()
        });
        // close popup video outside
        popup.addEventListener('click', () => {
            closeModal()
        });
    }
}
handlePopupVideo();



// tabs news
function handleTabs() {
    let tabs = document.querySelectorAll('.tab'),
        content = document.querySelectorAll('.scbrowse__blogs-item');
    content = document.querySelectorAll('.scposts__list-content');

    tabs.forEach((item) => {
        item.addEventListener('click', () => {
            // remove class active tabs
            tabs.forEach((item) => {
                item.classList.remove('--active');
            });
            // add class active tab
            item.classList.add('--active');
            let dataTab = item.getAttribute('data-tab');
            console.log(dataTab);
            // remove class active contents
            content.forEach((item) => {
                item.classList.remove('--active');
            });
            // get id tab active content
            let id = item.getAttribute('data-tab');
            // add class active vao scnews__list- + id active
            document.querySelector('.scbrowse__blogs-' + id).classList.add('--active');
        });

    });
}
handleTabs();


// loading images 
function loadingImages() {
    let loading = 0;
    // all images page
    imgs = document.querySelectorAll('img').length,
        // get body
        container = document.querySelector('body');
    let imgLoaded = imagesLoaded(container);
    imgLoaded.on('progress', (instance) => {
        loading++;
        percent = Math.floor((loading / imgs) * 100);
        handleLoading();
    }).on('always', (instance) => {
        console.log('always');
        // handleSlider();
    }).on('fail', (instance) => {
        console.log('fail');
    }).on('done', (instance) => {
        console.log('done');
        hideLoading();
    });
}
// loadding... % and number
function handleLoading() {
    const propressbar = document.querySelector('.propressbar'),
        textPercent = document.querySelector('.loading__inner-percent');
    if (propressbar) {
        propressbar.style.width = `${percent}%`;
        textPercent.innerHTML = `${percent}%`;
    }

}
// ấn hiện loadding
function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('is__unloaded');
    }
}
loadingImages();

////////////////////////////////////////////////////////////////////////////////////////////////
// check
function isEmail(value) {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
    return regexEmail.test(value);
}

// handler errors
function handleError(input, textError = '') {
    let error = input.parentElement.querySelector('.error');
    if (textError != '') {
        // them loi
        error.innerText = textError;
        input.classList.add('--inputerror');
    } else {
        // xoa loi
        error.innerText = textError;
        input.classList.remove('--inputerror');
    }
}

// mail check
function validateEmail() {
    let form = document.querySelector(".scsubscribe__form"),
        email = document.querySelector('#email');
    if (form) {
        // check is email
        isEmail();
        handleError(form);
        function checkEmail() {
            // email check
            let arrData = [];
            const valueEmail = email.value.trim();
            if (valueEmail == '') {
                handleError(email, 'Please fill in this field!');
                return false;
            } else if (!isEmail(valueEmail)) {
                handleError(email, 'Please fill in email format!');
                return false;
            } else {
                arrData.push(valueEmail);
                handleError(email);
            }
            return arrData;
        }
        // form submit button
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isCheck = checkEmail();
            if (isCheck.length > 0) {
                // alert(isCheck);
                popupconform();

            } else {
                console.error('error');
            }
        });
    }
}
validateEmail();


// validate form
function validateForm() {
    const form = document.querySelector('.sccontact__form'),
        fullname = document.querySelector('#fullname'),
        email = document.querySelector('#email'),
        // company = document.querySelector('#company'),
        subject = document.querySelector('#subject'),
        message = document.querySelector('#message');
    if (form) {
        // handler errors
        handleError(form);
        // check is email
        isEmail();
        //handler check input
        function checkInputs() {
            let arrData = [];
            // fullname check
            const valueFullname = fullname.value.trim();
            if (valueFullname == '') {
                handleError(fullname, 'Please fill in this field!');
                return false;
            } else {
                arrData.push(valueFullname);
                handleError(fullname);
            }
            // email check
            const valueEmail = email.value.trim();
            if (valueEmail == '') {
                handleError(email, 'Please fill in this field!');
                return false;
            } else if (!isEmail(valueEmail)) {
                handleError(email, 'Please fill in email format!');
                return false;
            } else {
                arrData.push(valueEmail);
                handleError(email);
            }
            // Subject
            const valueSubject = subject.value.trim();
            if (valueSubject == '') {
                handleError(subject, 'Please fill in this field!');
                return false;
            } else {
                arrData.push(valueSubject);
                handleError(subject);
            }
            // Message
            const valueMessage = message.value.trim();
            if (valueMessage == '') {
                handleError(message, 'Please fill in this field!');
                return false;
            } else {
                arrData.push(valueMessage);
                handleError(message);
            }
            return arrData;
        }
        // form submit button
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isCheck = checkInputs();
            if (isCheck.length > 0) {
                // alert(isCheck);
                popupconform();
            } else {
                console.error('error');
            }
        });
    }
}
validateForm();

// popup conform
function popupconform() {
    let popup = document.querySelector('.popupconform'),
        close = document.querySelector('.popupconform .popupconform__inner .popupconform__inner-iframe .btn');
    popup.classList.add('--active');

    close.addEventListener('click', () => {
        popup.classList.remove('--active');
        window.location.reload();
    });
}


// accordion
function handlerAccordion() {
    let accordion = document.querySelectorAll(".accordion");
    if (accordion) {
        accordion.forEach(function (item) {
            item.addEventListener('click', function () {
                item.classList.toggle('--active');
                let panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            });
        });
    }
}
handlerAccordion();



// js
// closure
// vd2
// function closureF1() {
//     let n = 1;
//     // nơi tạo closure
//     function closureF2() {
//         // truy cập biến n được tạo bên ngoài function closureF2 và trả về n
//         // tham chiếu giá trị mới nhất của biến
//         return n++;
//     }
//     return closureF2;
// }

// // run closureF1 và gán giá trị cho closureF1 trả về
// let result = closureF1();
// console.log(result()); // 1
// console.log(result()); // 2
// console.log(result()); // 3
// // vd2
// function handlePrice(price) {
//     let price = 100;
//     return {
//         getPrice: function () {
//             return price;
//         },
//         setPrice: function (newPrice) {
//             return price += newPrice;
//         }
//     }
// }

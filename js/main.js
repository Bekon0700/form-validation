const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneMinMaxRegex = /^.{10}$/
const nameMinMaxRegex = /^.{8,15}$/
const ageRegex = /^(?:1[01][0-9]|110|1[7-9]|[2-9][0-9])$/
const imgRegex = /(\.jpg|\.jpeg|\.png)$/i

// checkSubmitBtn()

$('input').on('input', function () {
    const inputVal = $(this).val().trim()
    const inputId = $(this).attr('id')
    if (!inputVal) return
    switch (inputId) {
        case 'name':
            doAll(nameMinMaxRegex, inputVal, inputId, 'Min and max length should be between 8-15')
            break;
        case 'email':
            doAll(emailRegex, inputVal, inputId, 'Please enter an valid email')
            break;
        case 'phone':
            doAll(phoneMinMaxRegex, inputVal, inputId, 'Please enter 11 digit phone number')
            break;
        default:
            console.log('done')
    }
    checkSubmitBtn()
})

$('#picture').on('change', function () {
    if (!$('#picture').prop('files')[0]) return
    const { name, size } = $('#picture').prop('files')[0]
    imageChecker(name, size, 'picture')
    // console.log(name, size)
    checkSubmitBtn()
})
$('#dob').on('change', function () {
    const inputVal = $(this).val().trim()
    const inputId = $(this).attr('id')
    if (!inputVal) return
    const age = ageCalculator(inputVal)
    doAll(ageRegex, age, inputId, 'Age limit is minimum 18')

    checkSubmitBtn()
})


// submit btn
$('form').on('click', '#submitBtn', function () {
    console.log(41651562)
})

// get image Dimension
function getImgDimension() {
    const reader = new FileReader();
    const file = $('#picture').prop('files')[0]
    let w, h;
    reader.onload = function(e) {
        let img = new Image();      
        img.src = e.target.result;

        img.onload = function () {
            w = this.width;
            h = this.height;
            if(w == 200 || h == 150) {
                addClass('picture', 'hide')
            }else{
                addText('picture', 'Dimension should be 100*100')
                removeClass('picture', 'hide')
            }
        }
    }
    reader.readAsDataURL(file);
}


// calculate age
function ageCalculator(dateOfBirth) {
    const dob = new Date(dateOfBirth);

    //calculate month difference from current date in time  
    const month_diff = Date.now() - dob.getTime();


    //convert the calculated difference in date format  
    const age_dt = new Date(month_diff);


    //extract year from date      
    const year = age_dt.getUTCFullYear();

    //now calculate the age of the user  
    return Math.abs(year - 1970);
}

// check if submit btn is disabled or not
function checkSubmitBtn() {
    const inputFieldCount = $('input').length
    const errorElementCount = $('.hide').length
    // console.log(inputFieldCount, errorElementCount)
    if (inputFieldCount == errorElementCount) {
        // console.log(51512)
        $('#submitBtn').prop('disabled', false)
        $('#submitBtn').removeClass('btn-disable')
    } else {
        $('#submitBtn').prop('disabled', true)
        $('#submitBtn').addClass('btn-disable')
    }
}

// do check and add class, remove class, add text
function doAll(reg, inputValue, inputId, errorText) {
    if (!checker(reg, inputValue)) {
        addText(inputId, errorText)
        removeClass(inputId, 'hide')
        $(`#${inputId}`).css('border-bottom', '1px solid red')
        // console.log($(`#${inputId}`).data('valid'))
    } else {
        $(`#${inputId}`).css('border-bottom', '1px solid green')
        addClass(inputId, 'hide')
    }
}

// picture checker
function imageChecker(name, size, inputId) {
    if (!checker(imgRegex, name)) {
        addText(inputId, 'File format should be jpg, jpeg, png')
        removeClass(inputId, 'hide')
        // errStatus[inputId] =  false
        // errStatus.push(false)
        return false
    } else if (parseInt(size) > 50000 || size == 0) {
        addText(inputId, 'Max size shouldnt be more than 500kb')
        removeClass(inputId, 'hide')
        return false
    }
    getImgDimension()
    addClass(inputId, 'hide')
    $(`#${inputId}`).data('valid', true)
    return true
}


// regex checker
function checker(reg, value) {
    return reg.exec(value) ? true : false
}

// add text
function addText(inputId, text) {
    $(`#${inputId}~p`).text(text)
}

// add class
function addClass(inputId, className) {
    $(`#${inputId} ~ p`).addClass(className)
}

//remove class
function removeClass(inputId, className) {
    $(`#${inputId} ~ p`).removeClass(className)
}
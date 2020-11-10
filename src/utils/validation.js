export const validateInput = text => {
    return text.trim().length >= 1 ? true : false
}

export const validateEmail = mail => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) ? true : false
}

export const validatePassword = (password) => {
    return password.trim().length >= 6 ? true : false
}

export const validateConfirmPassword = (password, confirmPassword) => {
    return password.length >= 1 && password === confirmPassword ? true : false
}

export const validatePhoneNumber = (number) => {
    return (/\+\d{11,12}/.test(number)) ? true : false
}

export const validateLink = link => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
          '((\\d{1,3}\\.){3}\\d{1,3}))'+
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
          '(\\?[;&a-z\\d%_.~+=-]*)?'+
          '(\\#[-a-z\\d_]*)?$','i');
        return !!pattern.test(link);
}
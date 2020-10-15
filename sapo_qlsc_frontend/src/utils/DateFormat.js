export const formatDate = (date) => {
    let temp = new Date(date);
    let hours = temp.getHours();
    let minutes = temp.getMinutes();
    let day = temp.getDate();
    let month = temp.getMonth();
    let year = temp.getFullYear();
    let result = '';
    if (hours < 10) {
        result += "0" + hours + ":"
    }
    else {
        result += hours + ":"
    }
    if (minutes < 10) {
        result += "0" + minutes + " "
    }
    else {
        result += minutes + " "
    }
    if (day < 10) {
        result += "0" + day + "/"
    }
    else {
        result += day + "/"
    }
    if (month + 1 < 10) {
        result += "0" + (month + 1) + "/"
    }
    else {
        result += (month + 1) + "/"
    }
    result += year
    return result
}
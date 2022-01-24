function clearString(bad){
    const cleanString = bad.toString().replace(/[|&;?!$%@"<>()./+,]/g, "+")
    return cleanString
}

module.exports = {
    clearString
}
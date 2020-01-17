module.exports = function parseStringAsArray(arrayAsString){
    const techsArray = arrayAsString ? arrayAsString.split(',').map(tech => tech.trim()): [];
    return techsArray;

}
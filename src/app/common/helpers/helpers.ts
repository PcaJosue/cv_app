export const sortArray = (array, key) => {
    return array.sort((a, b) => {
        var d1 = new Date(a[key]);
        var d2 = new Date(b[key]);
        return +d2 - +d1;
    });
}
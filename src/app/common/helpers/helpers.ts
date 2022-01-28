export const sortArray = (array) => {
    return array.sort((a, b) => {
        var d1 = new Date(a.startDate);
        var d2 = new Date(b.startDate);
        return +d1 - +d2;
    });
}
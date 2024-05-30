// convertDates.js

/**
 * Convert date strings to Date objects.
 * @param {Array} data - Array of objects with date strings and amounts.
 * @param {String} dateColumn - The column name of the date strings.
 * @returns {Array} - Array of objects with Date objects and amounts.
 */
export function DateConverter(data, dateColumn) {
    return data.map(item => ({
        ...item,
        [dateColumn]: new Date(item[dateColumn])
    }));
}

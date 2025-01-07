// dateUtils.ts

export function convertTimestampToLocalDate(timestampString: string): { localDate: Date; formattedDate: string } {
    // Convert the string to a number
    const timestamp: number = Number(timestampString);

    // Create a Date object from the timestamp
    const localDate: Date = new Date(timestamp);

    // Format the date to a readable string
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    const formattedDate: string = localDate.toLocaleString(undefined, options);

    return { localDate, formattedDate };
}
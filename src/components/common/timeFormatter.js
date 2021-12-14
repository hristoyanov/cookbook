const timeFormatter = (time) => {
    const timeString = String(time);

    return timeString.padStart(2, '0');
}

export default timeFormatter;

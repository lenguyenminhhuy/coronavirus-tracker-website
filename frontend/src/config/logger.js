function logger(...message) {
    if (process.env.NODE_ENV === 'production') return;
    console.log(message);
}
export default logger;
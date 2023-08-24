module.exports = {

    resolve: {
        fallback: { "process": require.resolve("process/browser"), util: require.resolve("util/")}
    },

}
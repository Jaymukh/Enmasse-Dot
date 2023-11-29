import Rollbar from 'rollbar';
console.log(process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN)

const rollbar = new Rollbar({
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
});

export { rollbar };
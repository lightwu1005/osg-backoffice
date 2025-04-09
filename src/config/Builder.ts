export default {
    isProd: process.env.isGateway && process.env.isGateway === 'true',
    isMock: process.env.isMock && process.env.isMock === 'true'
}
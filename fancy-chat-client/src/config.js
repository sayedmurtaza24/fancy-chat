const isDev = process.env.NODE_ENV === 'development' || window.location.protocol === 'http:';

export const config = {
    isDev,
    port: isDev ? 3131 : 80,
    host: isDev ? '192.168.1.68' : window.location.hostname,
    protocol: isDev ? 'http://' : 'https://',
    fullAddress() {
        return `${this.protocol}${this.host}${isDev ? ':' + this.port : ''}`
    }
}
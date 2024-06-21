export class Cookie {
    private constructor () {}

    static getData () {
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 7);

        if (document.cookie === '') {
            document.cookie = 'path=/';
            document.cookie = 'data={};path=/';
            document.cookie = `expires=${expiration.toUTCString()};path=/`;
        } else
            document.cookie = `expires=${expiration.toUTCString()};path=/`;

        return JSON.parse(document.cookie.split('; ').filter(pair => pair.startsWith('data='))[0]?.split('=')[1])
    }

    static setData (key: string, value: string) {
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 7);
        document.cookie = `expires=${expiration.toUTCString()}`;
        const data = JSON.parse(document.cookie.split('; ').filter(pair => pair.startsWith('data='))[0]?.split('=')[1]);
        data[key] = value;
        document.cookie = `data=${JSON.stringify(data)}`;
    }

    static delete () {
        document.cookie = 'data={};path=/';
        document.cookie = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    }
}
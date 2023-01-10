export {};

declare global {
    interface Window {
        mysql: {
            db: {
                login: Function;
                logout: Function;
                getUsernames: Function;
            },
            table: {
                load: Function;
            };
        }
    }
}
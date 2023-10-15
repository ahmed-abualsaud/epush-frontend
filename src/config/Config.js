export class Config {

    static envs = process.env

    static get(key, defaultValue = null) {

        return this.envs[key] ?? defaultValue
    }
}
export class Config {

    static envs = process.env

    static get(key) {

        return this.envs[key]
    }
}
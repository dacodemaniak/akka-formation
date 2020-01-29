import { ItunesInterface } from './itunes-interface';

export class Itunes implements ItunesInterface {
    public trackName: string = null;
    public artistName: string = null;
    public trackViewUrl: string = null;
    public artistId: number = null;

    public deserialize(datas: any): Itunes {
        let me: Itunes = this;
        
        for(let property in me) {
            console.log(`Assign : ${datas[property]} for property ${property}`);
            if (datas.hasOwnProperty(property) && datas[property] !== undefined) {
                me[property] = datas[property];
            }
        }
        return this;
    }
}

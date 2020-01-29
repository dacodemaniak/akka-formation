import { Itunes } from '../interfaces/itunes';

export class ItunesFactory {

    public static getInstanceByTrackname(trackName: string): Itunes {
        const myNewITunes: Itunes = new Itunes();
        myNewITunes.trackName = trackName;

        return myNewITunes;
    }

    public static getFullInstance(datas: any): Itunes {
        const item: Itunes = new Itunes();
        return item.deserialize(datas);
    }
}

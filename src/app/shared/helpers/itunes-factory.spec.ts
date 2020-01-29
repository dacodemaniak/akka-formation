import { ItunesFactory } from './itunes-factory';

describe('ItunesFactory', () => {
  it('should create an instance', () => {
    expect(new ItunesFactory()).toBeTruthy();
  });
});

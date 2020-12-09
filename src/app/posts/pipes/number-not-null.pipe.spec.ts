import { NumberNotNullPipe } from './number-not-null.pipe';

describe('NumberNotNullPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberNotNullPipe();
    expect(pipe).toBeTruthy();
  });
});

import { ErrorExistsPipe } from './error-exists.pipe';

describe('ErrorExistsPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorExistsPipe();
    expect(pipe).toBeTruthy();
  });
});

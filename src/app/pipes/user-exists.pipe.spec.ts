import { UserExistsPipe } from './user-exists.pipe';

describe('UserExistsPipe', () => {
  it('create an instance', () => {
    const pipe = new UserExistsPipe();
    expect(pipe).toBeTruthy();
  });
});

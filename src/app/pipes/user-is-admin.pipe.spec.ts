import { UserIsAdminPipe } from './user-is-admin.pipe';

describe('UserIsAdminPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIsAdminPipe();
    expect(pipe).toBeTruthy();
  });
});

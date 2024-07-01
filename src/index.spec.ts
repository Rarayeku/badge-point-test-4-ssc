import { getUsersBadge } from './index';
import { Icon } from './types/icon.enum';
import { User } from './types/user.interface';

describe('getUsersBadge', () => {

  it(`get Gold`, function () {
    expect(getUsersBadge(getUserMock(100))).toEqual(Icon.BADGE_GOLD);
    expect(getUsersBadge(getUserMock(50))).toEqual(Icon.BADGE_GOLD);
    expect(getUsersBadge(getUserMock(1000000))).toEqual(Icon.BADGE_GOLD);
  });

  it(`get Silver`, function () {
    expect(getUsersBadge(getUserMock(25))).toEqual(Icon.BADGE_SILVER);
    expect(getUsersBadge(getUserMock(49))).toEqual(Icon.BADGE_SILVER);
    expect(getUsersBadge(getUserMock(30))).toEqual(Icon.BADGE_SILVER);
  });

  it(`get Bronze`, function () {
    expect(getUsersBadge(getUserMock(5))).toEqual(Icon.BADGE_BRONZE);
    expect(getUsersBadge(getUserMock(24))).toEqual(Icon.BADGE_BRONZE);
    expect(getUsersBadge(getUserMock(10))).toEqual(Icon.BADGE_BRONZE);
  });

  it(`get no Icon`, function () {
    expect(getUsersBadge(getUserMock(4))).toEqual(Icon.DEFAULT);
    expect(getUsersBadge(getUserMock(-100))).toEqual(Icon.DEFAULT);
    expect(getUsersBadge(getUserMock(0))).toEqual(Icon.DEFAULT);
  });

});

function getUserMock(count: number): User {
  return {
    id: '___',
    username: '___',
    solutionCount: count
  };
}

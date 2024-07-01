import { getUsersBadge } from './index';
import { Icon } from './types/icon.enum';
import { User } from './types/user.interface';

describe('getUsersBadge', () => {

  it(`get Godlike`, async () => {
    expect(await getUsersBadge(getUserMock(2000))).toEqual(Icon.BADGE_GODLIKE);
    expect(await getUsersBadge(getUserMock(2001))).toEqual(Icon.BADGE_GODLIKE);
    expect(await getUsersBadge(getUserMock(1000000))).toEqual(Icon.BADGE_GODLIKE);
  });

  it(`get Platinum`, async () => {
    expect(await getUsersBadge(getUserMock(100))).toEqual(Icon.BADGE_PLATINUM);
    expect(await getUsersBadge(getUserMock(1999))).toEqual(Icon.BADGE_PLATINUM);
    expect(await getUsersBadge(getUserMock(150))).toEqual(Icon.BADGE_PLATINUM);
  });

  it(`get Gold`, async () => {
    expect(await getUsersBadge(getUserMock(50))).toEqual(Icon.BADGE_GOLD);
    expect(await getUsersBadge(getUserMock(99))).toEqual(Icon.BADGE_GOLD);
    expect(await getUsersBadge(getUserMock(75))).toEqual(Icon.BADGE_GOLD);
  });

  it(`get Silver`, async () => {
    expect(await getUsersBadge(getUserMock(25))).toEqual(Icon.BADGE_SILVER);
    expect(await getUsersBadge(getUserMock(49))).toEqual(Icon.BADGE_SILVER);
    expect(await getUsersBadge(getUserMock(30))).toEqual(Icon.BADGE_SILVER);
  });

  it(`get Bronze`, async () => {
    expect(await getUsersBadge(getUserMock(5))).toEqual(Icon.BADGE_BRONZE);
    expect(await getUsersBadge(getUserMock(24))).toEqual(Icon.BADGE_BRONZE);
    expect(await getUsersBadge(getUserMock(10))).toEqual(Icon.BADGE_BRONZE);
  });

  it(`get Starter`, async () => {
    expect(await getUsersBadge(getUserMock(1))).toEqual(Icon.BADGE_STARTER);
    expect(await getUsersBadge(getUserMock(4))).toEqual(Icon.BADGE_STARTER);
    expect(await getUsersBadge(getUserMock(2))).toEqual(Icon.BADGE_STARTER);
  });

  it(`get no Icon`, async () => {
    expect(await getUsersBadge(getUserMock(0))).toEqual(Icon.DEFAULT);
    expect(await getUsersBadge(getUserMock(0))).toEqual(Icon.DEFAULT);
  });

  it(`handles negative solutionCount`, async () => {
    expect(await getUsersBadge(getUserMock(-1))).toEqual(Icon.BADGE_BADASS);
    expect(await getUsersBadge(getUserMock(-10))).toEqual(Icon.BADGE_BADASS);
  });

});

function getUserMock(count: number): User {
  return {
    id: '___',
    username: '___',
    solutionCount: count
  };
}
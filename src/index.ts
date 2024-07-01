import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';
import { getAllUser as getAllUsers } from './user-store';

const badges: { threshold: number; icon: Icon }[] = [
  { threshold: 2000, icon: Icon.BADGE_GODLIKE },
  { threshold: 100, icon: Icon.BADGE_PLATINUM },
  { threshold: 50, icon: Icon.BADGE_GOLD },
  { threshold: 25, icon: Icon.BADGE_SILVER },
  { threshold: 5, icon: Icon.BADGE_BRONZE },
  { threshold: 1, icon: Icon.BADGE_STARTER },
];


export const getUsersBadge = async (user: User): Promise<Icon> => {
  if (user.solutionCount < 0) {
    return Icon.BADGE_BADASS;
  }
  for (const { threshold, icon } of badges) {
    if (user.solutionCount >= threshold) {
      return icon;
    }
  }
  return Icon.DEFAULT;
};

async function calculateUsersStatistics() {
  const users = await getAllUsers();
  const badgeCounts: { [key in Icon]: number } = {
    [Icon.BADGE_GODLIKE]: 0,
    [Icon.BADGE_PLATINUM]: 0,
    [Icon.BADGE_GOLD]: 0,
    [Icon.BADGE_SILVER]: 0,
    [Icon.BADGE_BRONZE]: 0,
    [Icon.BADGE_STARTER]: 0,
    [Icon.BADGE_BADASS]: 0,
    [Icon.DEFAULT]: 0,
  };

  const getUserBadgePromises = users.map(async user => {
    const badge = await getUsersBadge(user);
    badgeCounts[badge]++;
    return { ...user, badge };
  });

  const usersWithBadge = await Promise.all(getUserBadgePromises);
  const usersTotal = users.length;
  const solutionsTotal = users.reduce((sum, user) => sum + user.solutionCount, 0);
  const averageSolutions = solutionsTotal / usersTotal;
  const usersTopFive = usersWithBadge.sort((a, b) => b.solutionCount - a.solutionCount).slice(0, 5);
  const badgeTopOne = Object.keys(badgeCounts).reduce((a, b) =>
    badgeCounts[a as Icon] > badgeCounts[b as Icon] ? a : b
  ) as Icon;

  console.log('Statistics:');
  console.log(`1. Total number of users: ${usersTotal}`);
  console.log(`2. Average solution count: ${averageSolutions.toFixed(2)}`);
  console.log('3. Top 5 users:');
  usersTopFive.forEach((user, index) => {
    console.log(`${index + 1}. ${user.username} with ${user.solutionCount} solutions`);
  });
  console.log(`4. Most given badge: ${badgeTopOne}`);
}

calculateUsersStatistics().catch(console.error);
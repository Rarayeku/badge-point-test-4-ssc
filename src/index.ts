import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';
import { getAllUser as getAllUsers } from './user-store';
import { emulateLongProcess } from './emulate-long-process';

const badges: { threshold: number; icon: Icon }[] = [
  { threshold: 2000, icon: Icon.BADGE_GODLIKE },
  { threshold: 100, icon: Icon.BADGE_PLATINUM },
  { threshold: 50, icon: Icon.BADGE_GOLD },
  { threshold: 25, icon: Icon.BADGE_SILVER },
  { threshold: 5, icon: Icon.BADGE_BRONZE },
  { threshold: 1, icon: Icon.BADGE_STARTER },
];


export const getUsersBadge = async (user: User): Promise<Icon> => {
  await emulateLongProcess();

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
  const getUserBadgePromises = users.map(user => getUsersBadge(user));
  const badges = await Promise.all(getUserBadgePromises);
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

  badges.forEach(badge => {
    badgeCounts[badge]++;
  });

  const usersTotal = users.length;
  const solutionsTotal = users.reduce((sum, user) => sum + user.solutionCount, 0);
  const averageSolutions = solutionsTotal / usersTotal;
  const usersWithBadge = users.map((user, index) => ({
    ...user,
    badge: badges[index],
  }));
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


//How does that impact the rest of the source code?
/*  Imho the biggest risk is stuffing the main thread excessively.
    This could lead to perfomance impacts or even break timeout threshholds.
    Refactored to a more batch processing-like approach.
    Promise.all should already parallelize the calls instead of sequentially for each user.
    I also thought of maybe tweaking badge calculation further 
    by returning a default badge early and calculate after fetching all users, but imo this is rather situational
*/
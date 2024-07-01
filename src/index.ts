import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';

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

//Original Code
// export const getUsersBadge = ( user: User ): Icon | null => {
//   let badge = null;
//   switch ( true ) {
//     case ( user.solutionCount >= 5 && user.solutionCount < 25 ):
//       badge = Icon.BADGE_BRONZE;
//       break;
//     case ( user.solutionCount >= 25 && user.solutionCount < 50 ):
//       badge = Icon.BADGE_SILVER;
//       break;
//     case ( user.solutionCount >= 50 ):
//       badge = Icon.BADGE_GOLD;
//       break;
//   }
//   return badge
// };
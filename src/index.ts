import { User } from './types/user.interface';
import { Icon } from './types/icon.enum';


const badges: { threshold: number; icon: Icon }[] = [
  { threshold: 50, icon: Icon.BADGE_GOLD },
  { threshold: 25, icon: Icon.BADGE_SILVER },
  { threshold: 5, icon: Icon.BADGE_BRONZE }
];

// I decided to ditch the null and facilitate all returns in the enum, also introduced a badges configuration for easy adding of future badges.
// Since null is not allowed in enums, this seemed smother.
// In a bigger application I would check if this causes any problems/goes against commited code conventions.
export const getUsersBadge = async (user: User): Promise<Icon> => {
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
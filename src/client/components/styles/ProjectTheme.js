/* @flow */
import color from 'color';
import * as colors from 'react-native-ios-kit';
import type { Theme } from 'react-native-ios-kit';

/**
 * Default Theme
 */
const ProjectTheme: Theme = {
  primaryColor: colors.orange,
  primaryLightColor: color(colors.orange).lighten(0.5).string(),
  disabledColor: color(colors.orange).lighten(0.8).string(),
  backgroundColor: colors.white,
  barColor: colors.greyL2,
  dividerColor: colors.grey,
  textColor: colors.black,
  placeholderColor: colors.greyD1,
  footnoteColor: colors.greyD1,
  footnoteBackgroundColor: colors.greyL1,
  positiveColor: colors.green,
};

export default ProjectTheme;

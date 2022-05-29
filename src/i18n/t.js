// this is for file that want to use the i18n module
// but it's outside of the component
import i18n from "./index";
// keep the naming convention
export const $t = (k) => i18n.t(k);

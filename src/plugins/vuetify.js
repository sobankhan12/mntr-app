import Vue from "vue";
// import Vuetify from "vuetify/lib/framework";
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors'

import TickIcon from '@/assets/icons/Tick.vue'
import TickIconWhite from '@/assets/icons/TickWhite.vue'
import TransactionIcon from '@/assets/icons/Transaction.vue'
import MintIcon from '@/assets/icons/Mint.vue'
import BurnIcon from '@/assets/icons/Burn.vue'
import SnapshotIcon from '@/assets/icons/Snapshot.vue'
import WhiteListIcon from '@/assets/icons/Whitelist.vue'
import GearsIcon from '@/assets/icons/Gears.vue'
import PauseIcon from '@/assets/icons/Pause.vue'
import ApproveIcon from '@/assets/icons/Approve.vue'
import LoadingDark from '@/assets/icons/LoadingDark.vue'
import LoadingLight from '@/assets/icons/LoadingLight.vue'

import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiWalletOutline,
  mdiUpload,
  mdiCampfire,
  mdiPlus,
  mdiMinus,
	mdiFileImageOutline,
	mdiCloseCircle
} from '@mdi/js';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
		values: {
			tickIcon: {
				component: TickIcon
			},
			tickIconWhite: {
				component: TickIconWhite
			},
			transactionIcon: {
				component: TransactionIcon
			},
			mintIcon: {
				component: MintIcon
			},
			burnIcon: {
				component: BurnIcon
			},
			snapshotIcon: {
				component: SnapshotIcon
			},
			whitelistIcon: {
				component: WhiteListIcon
			},
			gearsIcon: {
				component: GearsIcon
			},
			pauseIcon: {
				component: PauseIcon
			},
			approveIcon: {
				component: ApproveIcon
			},

			LoadingLight: {
				component: LoadingLight
			},
			LoadingDark: {
				component: LoadingDark
			},
			mdiArrowLeft,
			mdiArrowRight,
			mdiWalletOutline,
			mdiUpload,
			mdiCampfire,
			mdiPlus,
			mdiMinus,
			mdiFileImageOutline,
			mdiCloseCircle
		}
	},
	theme: {
		light: true,
		themes: {
			light: {
				primary: '#FE6F0A',
				secondary: colors.red.lighten4, // #FFCDD2
				accent: colors.indigo.base, // #3F51B5
				background: '#ffffff',
				alt: '#F8F8F8',
				border: '#D0D1D2',
				// text: '#5C6266',
				text: 'rgba(0, 0, 0, 0.87)',
				text_alt: '#5C6166',
				p_text: '#5C6166',
				card_background: '#ffffff',
				custom_sec_background: '#F8F8F8',
				subscribe_email_background: '#FF7A1D',
				subscribe_email_field: '#ffffff',
				subscribe_email_text: '#FF7A1D',
				testmonial_card_border: '1px solid #D0D1D2',
				footer_text: '#372F2F',
				view_all_tokens_background: '#FFF6F0',
				view_all_tokens_text: '#372F2F',
				hk_text: '#5C6266',
				hk_background: '#F8F8F8',
				cap_card: ' #F8F8F8',
				ether_btn: '#F2F2F2',
			},
			dark: {
				primary: '#FE6F0A',
				background: '#1F2326',
				alt: '#272B2E',
				// text: '#B2BEC8',
				text: 'rgba(255, 255, 255, 0.87)',
				border: '#414649',
				p_text: '#B2BEC8',
				card_background: '#252B2F',
				custom_sec_background: '#292D31',
				subscribe_email_background: '#252B2F',
				subscribe_email_field: '#FE6F0A',
				subscribe_email_text: '#ffffff',
				testmonial_card_border: '1px solid #414649',
				footer_text: '#B2BEC8',
				view_all_tokens_background: '#252B2F',
				view_all_tokens_text: '#B2BEC8',
				hk_text: '#ffffff',
				hk_background: '#252B2F',
				cap_card: '#2B3033',
				ether_btn: '#3F4548'
			},
		},
	},
});


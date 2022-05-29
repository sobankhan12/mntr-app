// this is where we define our routes

import { $t } from "@/i18n/t";
import Home from '@/views/Home/Home.vue';

export const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		text: $t("routes.home")
	},
	{
		path: "/mint-token",
		name: "Create",
		text: $t("routes.create"),
		component: () => import("../views/Create/Create.vue"),
		meta: {requiresAuth: true}
	},
	{
		path: "/view-all-tokens",
		name: "viewAllTokens",
		text: 'View All Tokens',
		component: () => import("../views/VıewAllTokens/ViewAllTokens.vue"),
	},
	{
		path: "/my-tokens",
		name: "myTokens",
		text: 'My Tokens',
		component: () => import("../views/MyToken/MyToken.vue"),
		meta: {requiresAuth: true}
	},
	{
		path: "/token-profile/:tokenAddress",
		name: "tokenProfile",
		text: 'Profile Token',
		component: () => import("../views/TokenProfile/TokenProfile.vue"),
	},
	{
		path: "/advance-features",
		name: "advanceFeatures",
		text: 'Advance Features',
		component: () => import("../views/Features/AdvanceFeatures.vue"),
	},
/* DO NOT MODIFY THIS LINE AND BELOW */
];

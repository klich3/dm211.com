//Layouts
//home es diferente sa todas las otras paginas
import homeLayout from "@/layout/homeLayout.vue";

//este tipo de pagina comparte todas en excepcion a home y error
import pagesLayout from "@/layout/pagesLayout.vue";

//error es una iamgen a pantalla completa indicando el error
import errorLayout from "@/layout/errorLayout.vue";

// pages
import TermsPage from "@/layout/pages/TermsPage.vue";
import WorksPage from "@/layout/pages/WorksPage.vue";
import WorksDetailsPage from "@/layout/pages/WorksDetailsPage.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: homeLayout,
		//children: []
	},

	//Works
	{
		path: "/works",
		component: pagesLayout,
		children: [
			{
				path: "/",
				name: "works",
				meta: {
					hash: "works",
					//locale: "navCookies",
					//status: "showStatic"
				},
				component: WorksPage,
			},
			{
				name: "worksDetails",
				path: ":hash?",
				meta: {
					hash: "works",
					//locale: "navCookies",
					//status: "showStatic"
				},
				component: WorksDetailsPage,
			},
		],
	},

	//Terms
	{
		path: "/terms",
		component: pagesLayout,
		redirect: "/terms/politica-de-privacidad",
		children: [
			//terms & conditions
			{
				path: "politica-de-cookies",
				alias: ["/cookie-privacy", "/cookie-policy"],
				name: "cookies",
				meta: {
					hash: "cookies",
					//locale: "navCookies",
					//status: "showStatic"
				},
				component: TermsPage,
			},
			{
				path: "politica-de-privacidad",
				name: "privacy",
				alias: ["/privacidad", "/privacy-policy"],
				meta: {
					hash: "privacy",
					//locale: "navPrivacy",
					//status: "showStatic"
				},
				component: TermsPage,
			},
			{
				path: "terminos-y-condiciones",
				name: "terms",
				alias: ["/terms-and-conditions"],
				meta: {
					hash: "terms",
					//locale: "navPrivacy",
					//status: "showStatic"
				},
				component: TermsPage,
			},
		],
	},

	//Error
	{
		path: "/error",
		name: "not-found",
		component: errorLayout,
		alias: ["/not-found", "/404", "/no-encontrado"],
		meta: {
			hash: "error",
			//locale: "notFound404",
			//status: "showStatic"
		},
	},

	{
		path: "*",
		redirect: "/error",
	},
];

export default routes;

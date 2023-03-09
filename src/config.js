/*
	configuracion basica de contenidos
*/

import { version } from "../package.json";

const common = {
	pageTitle: "Digital Media 211",
	pageTitleSeparator: "|",

	defaultLang: "es",
	languages: ["es"],

	buidVersion: version,

	analytics: "UA-10730278-1",
	tagManager: "GTM-NMZ6L4P",
	addThis: "",

	uid: "dm211.com",

	homeDescription: "",
	homeKeywords: "Anthony Sychev, dm211, digital media, 211, threejs, web pages",

	msgLog:
		"9986003294809480948094809480948094809480948094809480948094809480948094809480948094800010006801010118005800320065011001160104011101100121003200830121009901040101011800320091010401010108010801110032009701160032010001090050004900490032010001110116003200990111010900930010010401160116011201150058004700470100010900500049004900460099011101090010010401160116011201150058004700470116011901110111011001010111011001010046012001210122",

	socials: {},

	dir: [
		{
			placeTitle: "Digital Media 211",
			shortTitle: "Dm211",

			dir: "",
			shortDir: "",

			gmapUrl: "",
			gps: "",
			post: "",
			country: "Spain",
			city: "Barcelona",

			tel: "",

			email: "hello@dm211.com",
			cif: "B-0000000",
			sl: "S.L.",
			regmercantil: {
				tomo: "",
				folio: "",
				pagina: "",
				inscripcion: "",
			},
		},
	],

	dirDefault: 0,
};

const development = {
	debug: true,
	tagManagerEnable: false,
	analyticsEnable: false,
	devtools: true,
};

const produciton = {
	debug: false,
	tagManagerEnable: false,
	analyticsEnable: true,
	devtools: false,
};

export default /prod/.test(process.env.NODE_ENV)
	? { ...common, ...produciton }
	: { ...common, ...development };

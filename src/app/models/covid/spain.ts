import { Link } from "./link";
import { Region } from "./region";

export class Spain{

date: string;
id: string;
links: Link[];
name: string
name_es: string;
name_it: string;
regions: Region[];
source: string;
today_confirmed: number;
today_deaths: number;
today_intensive_care: number;
today_new_confirmed: number;
today_new_deaths: number;
today_new_intensive_care: number;
today_new_open_cases: number;
today_new_recovered: number;
today_new_total_hospitalised_patients: number;
today_open_cases: number;
today_recovered: number;
today_total_hospitalised_patients: number;
today_vs_yesterday_confirmed: number;
today_vs_yesterday_deaths: number;
today_vs_yesterday_intensive_care: Object;
today_vs_yesterday_open_cases: number;
today_vs_yesterday_recovered: Object;
today_vs_yesterday_total_hospitalised_patients: Object;
yesterday_confirmed: number;
yesterday_deaths: number;
yesterday_intensive_care: number;
yesterday_open_cases: number;
yesterday_recovered: Object;
yesterday_total_hospitalised_patients: number;

}
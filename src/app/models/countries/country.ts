export class Country {

    active_cases_text: string;
    country_text: string;
    last_update: string;
    new_cases_text: string;
    new_deaths_text: string;
    total_cases_text: string;
    total_deaths_text: string;
    total_recovered_text: string;

    constructor(active_cases_text: string, country_text: string, last_update: string, new_cases_text: string, new_deaths_text: string, total_cases_text: string,
        total_deaths_text: string, total_recovered_text: string) {
        this.active_cases_text = active_cases_text;
        this.country_text = country_text;
        this.last_update = last_update;
        this.new_cases_text = new_cases_text;
        this.new_deaths_text = new_deaths_text;
        this.total_cases_text = total_cases_text;
        this.total_deaths_text = total_deaths_text;
        this.total_recovered_text = total_recovered_text;
    }
    
}

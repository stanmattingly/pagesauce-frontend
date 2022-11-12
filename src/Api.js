import axios from 'axios'

export class Api {
    constructor() {
        this.url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'https://api.pagesauce.io/api';
        this.accessToken = localStorage.getItem("access-token");
        this.refreshToken = localStorage.getItem("refresh-token");
        this.user = [];
        this.stripe_accounts = []
    }

    async setup(username, password) {
        await this.setTokens(username, password);
        await this.setUser();
    }

    async getWebsites() {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/websites/`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data.results
    }

    async getWesbite(website_uuid) {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/websites/${website_uuid}/`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data
    }

    async verifyWebsite(website_uuid) {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/websites/${website_uuid}/verify/`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data
    }

    async getComponentTypes() {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/component-types/`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data.results
    }

    async getComponents(websiteId) {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/components/?website_uuid=${websiteId}`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data.results
    }

    async createConversion(componentId, event, value) {
        await this.refreshAccessToken();
        const response = await axios.post(
            `${this.url}/app/components/${componentId}/create_conversion/`, {
                event: event,
                value: value,
            },
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async getAnalytics() {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/analytics/`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data.results
    }

    async createComponent(type_uuid, name, selectedWebsite) {
        await this.refreshAccessToken();
        const response = await axios.post(
            `${this.url}/app/components/`, {
                'type_uuid': type_uuid,
                'name': name,
                'website_uuid': selectedWebsite,
            },
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async getContents(component_uuid='') {
        await this.refreshAccessToken();
        const response = await axios.get(`${this.url}/app/contents/?component_uuid=${component_uuid}`, {headers: { 'Authorization': `Bearer ${this.accessToken}` },});
        return response.data.results
    }

    async createContent(component_uuid, text) {
        await this.refreshAccessToken();
        const response = await axios.post(
            `${this.url}/app/contents/`, {
                'component_uuid': component_uuid,
                'text': text,
            },
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async deleteContent(content_uuid) {
        await this.refreshAccessToken();
        const response = await axios.delete(
            `${this.url}/app/contents/${content_uuid}/`,
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async setTokens(username, password) {
        const response = await fetch(`${this.url}/token/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        })
        const tokens = await response.json();
        this.accessToken = tokens.access;
        this.refreshToken = tokens.refresh;
        localStorage.setItem('access-token', tokens.access);
        localStorage.setItem('refresh-token', tokens.refresh);
    }

    async refreshAccessToken() {
        let response = await fetch(`${this.url}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "refresh": this.refreshToken,
            })
        });
        const data = await response.json();
        this.accessToken = data.access;
        localStorage.setItem('access-token', data.access);
    }

    async getSmartAddToken(website_uuid) {
        await this.refreshAccessToken();
        const response = await axios.post(
            process.env.NODE_ENV === 'development' ? 'http://localhost:8000/auth/smart-add-tokens/' : 'https://api.pagesauce.io/auth/smart-add-tokens/', {
                'website_uuid': website_uuid,
            },
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async setComponentLiveStatus(component_uuid, status) {
        await this.refreshAccessToken();
        const response = await axios.post(
            `${this.url}/app/components/set_live_status/`, {
                'component_uuid': component_uuid,
                'status': status,
            },
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async createWebsite(name, url) {
        await this.refreshAccessToken();
        const response = await axios.post(
            `${this.url}/app/websites/`, {
                'name': name,
                'url': url,
            },
            {
                headers: { 
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data
    }

    async setUser() {
        await this.refreshAccessToken();

        const response = await fetch(`${this.url}/users/get_current_user/`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
        });

        const user = await response.json();

        this.user = user;
        this.stripe_accounts = user.stripe_accounts;
    }

    getUser() {
        return this.user;
    }

    getAccounts() {
        return this.stripe_accounts;
    }
 
    async getActions(account_id) {
        await this.refreshAccessToken();

        const response = await fetch(`${this.url}/analytic-records/?account_id=${account_id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
        });

        const actions = await response.json();

        return actions.results
    }

    async getGroups(account_id) {
        await this.refreshAccessToken();

        const response = await fetch(`${this.url}/price-groups/?hottest_prices=true&account_id=${account_id}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            },
        });

        const groups = await response.json();

        return groups.results
    }

    async addAccount(code) {
        const response = await fetch(`${this.url}/stripe-accounts/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({
                "auth_code": code,
            })
        });

        const account = await response.json();
        return account
    }
}
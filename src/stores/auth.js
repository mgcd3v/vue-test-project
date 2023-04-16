import { defineStore } from 'pinia'

const defaultCredential = {
    email: '',
    password: ''
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    me: null,
    message: null,
    isLoggedIn: false,
    credential: {},
    item: {},
  }),
  getters: {

  },
  actions: {
    initializeMessage() {
        this.message = null
    },

    initializeCredential() {
        this.credential = {...defaultCredential}
    },

    setCredential(prop, value) {
        this.credential[prop] = value
    },

    async login() {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(this.credential),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        
        const response = await result.json();

        if(result.status === 200) {
            this.isLoggedIn = true
            this.message = null

            localStorage.setItem('token', response.token);
        } else {
            this.isLoggedIn = false
            this.message = {
                status: result.status,
                value: response.message
            }
        }
    },

    async logout() {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: 'POST',
            body: '',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        this.me = null
        this.isLoggedIn = false

        localStorage.removeItem('token');
    },

    async getMe() {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        });

        const response = await result.json();
        console.log(response)
        this.me = response.me
    },
  },
  persist: true,
})

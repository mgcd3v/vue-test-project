import { defineStore } from 'pinia'
import moment from 'moment';

const defaultItem = {
    email: '',
    name: '',
    surname: '',
    address: '',
    phonenumber: '',
    date: moment(new Date()).format('yyyy-MM-DD'),
    password: 'secret'
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    message: null,
    list: [],
    item: {},
    isLoading: false,
  }),
  getters: {
    orderedList: (state) => {
        return state.list.map(item => {
            return { 
                id: item.id,
                email: item.email,
                fullname: item.name + ' ' + item.surname,
                address: item.address,
                phonenumber: item.phonenumber,
                date: moment(item.date).format('dddd Do [of] MMMM yyyy hh:mm:ss a')
             }
        }).sort((a, b) => {
            return b.id - a.id;
        });
    },
    currentItem: (state) => {
        return {
            ...state.item,
            password: state.item.password !== defaultItem.password? '' : defaultItem.password,
            date: moment(state.item.date).format('yyyy-MM-DD'),
        }
    }
  },
  actions: {
    initializeMessage() {
        this.message = null
    },

    initializeItem() {
        this.item = {...defaultItem}
    },

    setItem(prop, value) {
        this.item[prop] = value
    },

    async get() {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        const response = await result.json();

        this.list = response;
    },

    async getSpecific(id) {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
        const response = await result.json();

        this.item = response? response[0] : {};
    },

    async insert(form) {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const response = await result.json();

        this.message = {
            status: result.status,
            value: response.message
        }
    },

    async update(id, form) {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const response = await result.json();

        this.message = {
            status: result.status,
            value: response.message
        }
    }
  },
  persist: true,
})

import axios from 'axios';
import { API_BASE_URL } from '../../src/config/api';

export class UserService {

    static async getUsers() {
        const url = `${API_BASE_URL}/user`;

        const r = await axios.get(url, {

        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XmlHttpRequest'
            }
        });
        return r.data;
    }

    static async createUser(form, birthday) {
        const url = `${API_BASE_URL}/user`;

        const r = await axios.post(url, {
            firstName: form.get('firstName'),
            lastName: form.get('lastName'),
            email: form.get('email'),
            birthday: birthday,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XmlHttpRequest'
            }
        });
        return r.data;
    }

    static async updateUser(id, form, birthday) {
        const url = `${API_BASE_URL}/user/${id}`;

        const r = await axios.put(url, {
            firstName: form.get('firstName'),
            lastName: form.get('lastName'),
            email: form.get('email'),
            birthday: birthday,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XmlHttpRequest'
            }
        });
        return r.data;
    }

    static deleteUser(id) {
        var url = `${API_BASE_URL}/user/${id}`;

        return axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XmlHttpRequest'
            },
            data: {}
        });
    }
}
import store from '@/store'

export default function (to, from, next) {
    if (!store.getters['user/getUser'].id) {
        next({ name: 'Login' });
    }
    next();
}
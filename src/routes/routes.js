import Login from "../components/Login.vue";
import Registration from "../components/Registration.vue";
import GiftCardOrder from "../components/GiftCardOrder.vue";
import GiftCardHistory from "../components/GiftCardHistory.vue";
import MonthlyReport from "../components/MonthlyReport.vue";

export default[
    {
        path: '/',
        component: Login
    },
    {
        path: '/Login',
        component: Login
    },
    {
        path: '/Registration',
        component: Registration
    },
    {
        path: '/NewOrder/:userId',
        component: GiftCardOrder
    },
    {
        path: '/OrderHistory/:userId',
        component: GiftCardHistory
    },
    {
        path: '/MonthlyReport',
        component: MonthlyReport
    },
]
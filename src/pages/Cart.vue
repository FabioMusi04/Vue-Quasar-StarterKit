<template>
    <q-page>
        <div class="q-pa-md">
            <q-table class="my-sticky-header-table" flat bordered title="Cart" :rows="cartItems" :columns="columns"
                row-key="id">
                <template v-slot:body-cell-thumbnail="props">
                    <q-td :props="props">
                        <img :src="props.row.thumbnail" alt="Thumbnail" style="width: 50px; height: auto;" />
                    </q-td>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">
                            <span v-if="col.name !== 'thumbnail' && col.name !== 'quantity'">{{ props.row[col.field] }}</span>
                            <img v-else-if="col.name === 'thumbnail'" :src="props.row.thumbnail" alt="Thumbnail" style="width: 50px; height: auto;" />
                            <div v-else>
                                <q-btn dense flat round icon="remove" @click="decreaseQuantity(props.row.id)" />
                                <span>{{ props.row.quantity }}</span>
                                <q-btn dense flat round icon="add" @click="increaseQuantity(props.row.id)" />
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
            <div class="q-mt-md">
                <q-btn label="Checkout" color="primary" @click="checkout" />
            </div>
        </div>
    </q-page>
</template>

<script>
import { useUserStore } from '../utils/store/userStore';

export default {
    data() {
        return {
            columns: [
                { name: 'title', label: 'Title', field: 'title', sortable: true },
                { name: 'price', label: 'Price', field: 'price', sortable: true },
                { name: 'quantity', label: 'Quantity', field: 'quantity', sortable: true },
                { name: 'thumbnail', label: 'Thumbnail', field: 'thumbnail', sortable: false }
            ],
            cartItems: []
        }
    },
    methods: {
        async fetchCartItems() {
            this.cartItems = [];
            const user = useUserStore();
            const cart = user.getCart();
            const cartIds = Object.keys(cart);
            for(const id of cartIds) {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                this.cartItems.push({
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    quantity: user.getCart()[id],
                    thumbnail: data.thumbnail,
                });
            }
        },
        checkout() {
            // Handle checkout process
            alert('Proceeding to checkout');
        },
        increaseQuantity(productId) {
            const user = useUserStore();
            user.increaseQuantity(productId);
            this.fetchCartItems();
        },
        decreaseQuantity(productId) {
            const user = useUserStore();
            user.decreaseQuantity(productId);
            this.fetchCartItems();
        }
    },
    created() {
        this.fetchCartItems();
    }
}
</script>

<style scoped>
.my-sticky-header-table {
    max-height: 400px;
    overflow-y: auto;
}
</style>
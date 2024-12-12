<template>
    <q-page>
        <div class="q-pa-md">
            <q-card>
                <q-img :src="product.thumbnail" alt="Product Image" class="q-mb-md" />
                <q-card-section>
                    <div class="text-h6">{{ product.title }}</div>
                    <div class="text-subtitle1">{{ product.category }}</div>
                    <div class="text-body1 q-mt-md">{{ product.description }}</div>
                    <div class="q-mt-md">
                        <q-badge color="primary">{{ product.price }} $</q-badge>
                        <q-badge color="secondary">{{ product.rating }} ★</q-badge>
                        <q-badge color="accent">{{ product.stock }} in stock</q-badge>
                    </div>
                    <q-btn @click="addToCart" color="primary" class="q-mt-md">Add to Cart</q-btn>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { useUserStore } from '../utils/store/userStore';

export default {
    data() {
        return {
            product: {}
        }
    },
    methods: {
        fetchProductDetails(productId) {
            fetch(`https://dummyjson.com/products/${productId}`)
                .then(res => res.json())
                .then(data => {
                    this.product = {
                        id: data.id,
                        title: data.title,
                        price: data.price,
                        category: data.category,
                        rating: data.rating,
                        stock: data.stock,
                        thumbnail: data.thumbnail,
                        description: data.description
                    };
                });
        },
        addToCart() {
            // Logic to add the product to the cart
            const userStore = useUserStore();
            userStore.addToCart(this.product.id);
        }
    },
    created() {
        const productId = this.$route.params.id;
        this.fetchProductDetails(productId);
    }
}
</script>
<template>
  <q-page>
    <div class="q-pa-md">
      <q-input v-model="search" placeholder="Search..." class="q-mb-md" />
      <q-table class="my-sticky-header-table" flat bordered title="Products" :rows="filteredRows" :columns="columns"
        row-key="id">
        <template v-slot:body-cell-thumbnail="props">
          <q-td :props="props">
            <img :src="props.row.thumbnail" alt="Thumbnail" style="width: 50px; height: auto;" />
          </q-td>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="redirectToDetailPage(props.row.id)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name !== 'thumbnail'">{{ props.row[col.field] }}</span>
              <img v-else :src="props.row.thumbnail" alt="Thumbnail" style="width: 50px; height: auto;" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      columns: [
        { name: 'title', label: 'Title', field: 'title', sortable: true },
        { name: 'price', label: 'Price', field: 'price', sortable: true },
        { name: 'category', label: 'Category', field: 'category', sortable: true },
        { name: 'rating', label: 'Rating', field: 'rating', sortable: true },
        { name: 'stock', label: 'Stock', field: 'stock', sortable: true },
        { name: 'thumbnail', label: 'Thumbnail', field: 'thumbnail', sortable: false }
      ],
      rows: []
    }
  },
  computed: {
    filteredRows() {
      return this.rows.filter(row => {
        return Object.values(row).some(val =>
          String(val).toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  },
  methods: {
    fetchProducts() {
      fetch(`https://dummyjson.com/products/search?q=${this.search}`)
        .then(res => res.json())
        .then(data => {
          this.rows = data.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            rating: product.rating,
            stock: product.stock,
            thumbnail: product.thumbnail
          }));
        });
    },
    fetchPaginatedProducts(limit, skip) {
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,category,rating,stock,thumbnail`)
        .then(res => res.json())
        .then(data => {
          this.rows = data.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            rating: product.rating,
            stock: product.stock,
            thumbnail: product.thumbnail
          }));
        });
    },
    redirectToDetailPage(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  watch: {
    search: 'fetchProducts'
  },
  created() {
    this.fetchPaginatedProducts(10, 0);
  }
}
</script>
app.component("product", {
    template: /* vue-html */ `
        <section class="product">
                <div class="product__thumbnails">
                    <div class="thumb" 
                        v-for="(image, index) in product.images"
                        :key="image.thumbnail" 
                        :class="{ active: activeImage === index }" 
                        :style="{ backgroundImage: 'url(' + image.thumbnail + ')' }"
                        @click="activeImage = index">
                    </div>
                       
                    </div>
                <div class="product__image">
                    <img :src="product.images[activeImage].image" :alt="product.name" />
                </div>
            </section>
            <section class="description">
                <h4>{{ product.name.toUpperCase() }} {{ product.stock === 0? "😢": "😃" }} </h4>
                <span class="badge new" v-if="product.new">Nuevo</span>
                <span class="badge offer" v-if="product.offer">Oferta</span>
                <p class="description__status" v-if="product.stock === 3 || product.stock === 2">Quedan pocas unidades</p>
                <p class="description__status" v-else-if="product.stock === 1">¡Solo queda una unidad!</p>
                <p class="description__status" v-else-if="product.stock === 0">Sin stock</p>
                <p class="description__status" v-else></p>
               
                <p class="description__price">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price) }}</p>
                <p class="description__content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta assumenda error quae totam corporis voluptatem sed veniam ipsa. Perferendis
                    fugiat ea repudiandae dolorum repellat et hic provident placeat, qui animi?
                </p>
                <div class="discount">
                    <span>Código de Descuento:</span>
                    <input type="text" placeholder="Ingresa tu código" @keyup.enter="applyDiscount($event)" />
                </div>
                <button :disabled="product.stock == 0" @click="addToCart()"> Agregar al carrito</button>
            </section>
    `,
    props: ["product"],
    
    data(props) {
        return {
            activeImage: 0,
            discountCodes: ["NEW20", "20OFF", "20DISCOUNT"]
        }
    },
    methods: {
        applyDiscount(event) {
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if (discountCodeIndex >= 0) {
                this.product.price *= 80/100
                this.discountCodes.splice(discountCodeIndex, 1);
            }
        },
        addToCart() {
            const prodIndex = this.cart.findIndex(prod => prod.name === this.product.name);
            if (prodIndex >= 0) {
                this.cart[prodIndex].quantity++;
            } else {
                this.cart.push(this.product);
            }
            this.product.stock--;
        }
    }
})
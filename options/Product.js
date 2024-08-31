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
                <badge :product="product"></badge>
                <p class="description__status" v-if="product.stock === 3 || product.stock === 2">Quedan pocas unidades</p>
                <p class="description__status" v-else-if="product.stock === 1">¡Solo queda una unidad!</p>
                <p class="description__status" v-else-if="product.stock === 0">Sin stock</p>
                <p class="description__status" v-else ></p>
               
                <p class="description__price" :style=" {color: price_color} ">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price) }}</p>
                <p class="description__content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta assumenda error quae totam corporis voluptatem sed veniam ipsa. Perferendis
                    fugiat ea repudiandae dolorum repellat et hic provident placeat, qui animi?
                </p>
                <div class="discount">
                    <span>Código de Descuento:</span>
                    <input type="text" placeholder="Ingresa tu código" @keyup.enter="applyDiscount($event)" />
                </div>
                <button :disabled="product.stock == 0" @click="sendToCart()"> Agregar al carrito</button>
            </section>
    `,
    props: ["product"],
    emits: ["sendtocart"],

    data(props) {
        return {
            activeImage: 0,
            discountCodes: ["NEW20", "20OFF", "20DISCOUNT"],
            price_color: "rgb(104, 104, 209)"
        }
    },
    methods: {
        applyDiscount(event) {
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if (discountCodeIndex >= 0) {
                this.product.price *= 80 / 100
                this.discountCodes.splice(discountCodeIndex, 1);
            }
        },
        sendToCart() {
            this.$emit("sendtocart", this.product);
        }
       
    },
    watch: {
        activeImage(value, oldValue) {
            console.log("activeImage. value: " + value + " oldValue: " + oldValue);
        },
        "product.stock"(stock) {
            if (stock == 3){
                this.price_color = "rgb(200, 100, 20)";
            } else if (stock == 2 || stock == 1) {
                this.price_color = "rgb(200, 30, 30)";
            } else if (stock == 0) {
                this.price_color = "rgb(129, 129, 129)";
            }
        }
    }
})
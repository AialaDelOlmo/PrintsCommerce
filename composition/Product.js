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
            <button :disabled="product.stock == 0" @click="sendToCart()"> Agregar al carrito</button>
        </section>
    `,
    props: ["product"],
    emits: ["sendtocart"],

    setup(props, context) {

        const productState = reactive({
            activeImage: 0
        });

        const discountCodes = ref(["NEW20", "20OFF", "20DISCOUNT"]);

        function sendToCart() {
            context.emit("sendtocart", props.product);
        }

        function addToCart() {
            const prodIndex = cartState.cart.findIndex(prod => prod.name === props.product.name);
            if (prodIndex >= 0) {
                cartState.cart[prodIndex].quantity++;
            } else {
                cartState.cart.push(props.product);
            }
            props.product.stock--;
        }
        
        function applyDiscount(event) {
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
            if (discountCodeIndex >= 0) {
                props.product.price *= 80/100;
                discountCodes.value.splice(discountCodeIndex, 1);
            }
        }

        setTimeout(() =>{
            props.activeImage = 1
        }, 2000);
         
        return {
           ...toRefs(productState),
                   
            applyDiscount,
            addToCart,
            sendToCart
        };
    }
})
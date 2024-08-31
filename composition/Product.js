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
            <p class="description__status" :style="{ color: description_color }" v-if="product.stock === 3 || product.stock === 2">Quedan pocas unidades</p>
            <p class="description__status" :style="{ color: description_color }" v-else-if="product.stock === 1">¡Solo queda una unidad!</p>
            <p class="description__status" :style="{ color: description_color }" v-else-if="product.stock === 0">Sin stock</p>
            <p class="description__status" :style="{ color: description_color }" v-else></p>
        
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
            activeImage: 0,
        //    description_color: "rgb(129, 129, 129)"
            description_color: computed(() => {
                if (props.product.stock == 3 || props.product.stock == 2 ){
                    return "rgb(200, 100, 20)";
                } else if (props.product.stock == 1) {
                    return "rgb(200, 30, 30)";
                } else if (props.product.stock == 0) {
                    return "rgb(129, 129, 129)";
                }
                return "rgb(129, 129, 129)";
            })
        });

        const discountCodes = ref(["NEW20", "20OFF", "20DISCOUNT"]);

       /* Se ha definido directamente en el reactive
       const description_color = computed(() => {
            if (props.product.stock == 3 || props.product.stock == 2 ){
                return "rgb(200, 100, 20)";
            } else if (props.product.stock == 1) {
                return "rgb(200, 30, 30)";
            } else if (props.product.stock == 0) {
                return "rgb(129, 129, 129)";
            }
            return "rgb(129, 129, 129)";
        }); */

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

        watch(() => productState.activeImage, (val, oldValue) =>{
            console.log(val, oldValue);
        })

     /*   watch(() => props.product.stock, (stock) => {
            if (stock == 3 || stock == 2 ){
                productState.description_color = "rgb(200, 100, 20)";
            } else if (stock == 1) {
                productState.description_color = "rgb(200, 30, 30)";
            } else if (stock == 0) {
                productState.description_color = "rgb(129, 129, 129)";
            }
        }) */

        

        setTimeout(() =>{
            props.activeImage = 1
        }, 2000);
         
        return {
           ...toRefs(productState),
                   
            applyDiscount,
            addToCart,
            sendToCart,
          //  description_color
        };
    }
})
app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="productContainer">
            <div class="productImage">
                <img v-bind:src='image'>
            </div>
            <div id="productInfo">
                <h1>{{ product }}</h1>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)" 
                class="colorCircle" 
                :style="{backgroundColor: variant.color}">{{}}</div>
                <p v-if="inStock">In Stock</p>
                <p v-else="outOfStock">Out Of Stock</p>
                <p>Shipping {{ shipping }}</p>
                <button class="button" @click="addToCart" :disabled="!inStock" :class="{disableButton: !inStock}">Add to Cart</button>
                <button class="button" @click="takeOfFromCart" :disabled="!inStock" >Take of from Cart</button>
            </div>
        </div>
        <div class="reviewContainer">
        <review-list :reviews="reviews">{{}}</review-list>
        <review-form @review-submitted="addReview"></review-form>
        </div>
    </div>`,
    data() {
        return {
            product: 'Czapka z daszkiem',
            selectedVariant: 0,
            details:['80% cotton', '10% polyester', '10% wool'],
            variants: [
                { id: 2234, color: 'red', image: 'pictures/redHat.jpg', quantity: 50 },
                { id: 2234, color: 'blue', image:'pictures/blueHat.jpg', quantity: 0 } 
            ],
            reviews:[],
        }
    }, 
    methods: {
        addToCart() {
            this.$emit('add-to-cart'), this.variants[this.selectedVariant].id
        },
        takeOfFromCart() {
            this.$emit('take-of-from-cart'), this.variants[this.selectedVariant].id
        },
        updateVariant(index){
            this.selectedVariant = index
            console.log(index)
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed:{
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if(this.premium){
                return 'Free'
            }
            return '2.99 zł'
        }
}
})
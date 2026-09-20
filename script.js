/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {

    mobileNav.classList.toggle("open");

});


document.querySelectorAll(".mobile-nav a").forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

    });

});



/* =====================================================
   CART
===================================================== */

const cartBtn =
    document.getElementById("cartBtn");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartClose =
    document.getElementById("cartClose");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


let cart = [];


/* Open Cart */

function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("show");

    document.body.classList.add("no-scroll");

}


/* Close Cart */

function closeCart() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


cartBtn.addEventListener(
    "click",
    openCart
);


cartClose.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);



/* =====================================================
   ADD TO CART
===================================================== */

document.querySelectorAll(".buy-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        cart.push({
            name: name,
            price: price
        });


        updateCart();

        openCart();

    });

});



/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <span>
                    ₹${item.price.toLocaleString("en-IN")}
                </span>

            </div>


            <button
                class="remove-item"
                data-index="${index}"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    cartCount.textContent =
        cart.length;


    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");


    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(
                        index,
                        1
                    );


                    updateCart();

                }
            );

        });

}



/* =====================================================
   PRODUCT MODAL
===================================================== */

const modal =
    document.getElementById("productModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalName =
    document.getElementById("modalName");

const modalPrice =
    document.getElementById("modalPrice");

const modalBuy =
    document.getElementById("modalBuy");


let selectedProduct = null;



/* Learn More */

document.querySelectorAll(".learn-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const image =
            button.dataset.image;

        const price =
            Number(button.dataset.price);


        selectedProduct = {

            name: name,

            image: image,

            price: price

        };


        modalName.textContent =
            name;


        modalImage.src =
            image;


        modalPrice.textContent =
            "₹" +
            price.toLocaleString("en-IN");


        modal.classList.add("show");

        document.body.classList.add(
            "no-scroll"
        );

    });

});



/* Close Modal */

function closeModal() {

    modal.classList.remove("show");

    document.body.classList.remove(
        "no-scroll"
    );

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);



/* =====================================================
   MODAL ADD TO CART
===================================================== */

modalBuy.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {
            return;
        }


        cart.push({

            name:
                selectedProduct.name,

            price:
                selectedProduct.price

        });


        updateCart();

        closeModal();

        openCart();

    }
);



/* =====================================================
   CHECKOUT
===================================================== */

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your bag is empty."
            );

            return;
        }


        alert(
            "Demo checkout — payment integration can be added later."
        );

    }
);



/* =====================================================
   COLOR SELECTOR
===================================================== */

const colors =
    document.querySelectorAll(
        ".color"
    );


colors.forEach(color => {

    color.addEventListener(
        "click",
        () => {

            colors.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            color.classList.add(
                "active"
            );

        }
    );

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".product-card, .accessory-card, .why-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        element.style.opacity =
            "0";


        element.style.transform =
            "translateY(30px)";


        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";


        observer.observe(
            element
        );

    }
);



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            closeCart();

            mobileNav.classList.remove(
                "open"
            );

        }

    }
);

import { r as registerInstance, c as createEvent, h, a as getElement } from './index-745b6bec.js';
import { p as pure } from './pure-963214cb.js';
import { s as state$2 } from './watchers-38693c1f.js';
import { o as onChange, s as state, u as updateFormState } from './mutations-6bbbe793.js';
import { o as onChange$1 } from './store-627acec4.js';
import './watchers-cee9e5e9.js';
import { s as state$1, g as getProcessorByType } from './getters-b5084f91.js';
import { c as currentFormState } from './getters-487612aa.js';
import { c as createErrorNotice } from './mutations-ed6d0770.js';
import { b as getCompleteAddress } from './getters-970cdda4.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import './index-06061d4e.js';
import './utils-cd1431df.js';
import './remove-query-args-938c53ea.js';
import './index-c5a96d53.js';
import './google-a86aa761.js';
import './currency-a0c9bff4.js';
import './price-af9f0dbf.js';
import './util-50af2a83.js';
import './address-b892540d.js';

const scStripePaymentElementCss = "sc-stripe-payment-element{display:block}sc-stripe-payment-element [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";
const ScStripePaymentElementStyle0 = scStripePaymentElementCss;

const ScStripePaymentElement = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.scPaid = createEvent(this, "scPaid", 7);
        this.scSetState = createEvent(this, "scSetState", 7);
        this.scPaymentInfoAdded = createEvent(this, "scPaymentInfoAdded", 7);
        this.error = undefined;
        this.confirming = false;
        this.isInitializingStripe = false;
        this.isCreatingUpdatingStripeElement = false;
        this.loaded = false;
        this.styles = undefined;
    }
    async componentWillLoad() {
        this.fetchStyles();
        this.syncCheckoutMode();
    }
    async handleStylesChange() {
        this.createOrUpdateElements();
    }
    async fetchStyles() {
        this.styles = (await this.getComputedStyles());
    }
    /**
     * We wait for our property value to resolve (styles have been loaded)
     * This prevents the element appearance api being set before the styles are loaded.
     */
    getComputedStyles() {
        return new Promise(resolve => {
            let checkInterval = setInterval(() => {
                const styles = window.getComputedStyle(document.body);
                const color = styles.getPropertyValue('--sc-color-primary-500');
                if (color) {
                    clearInterval(checkInterval);
                    resolve(styles);
                }
            }, 100);
        });
    }
    /** Sync the checkout mode */
    async syncCheckoutMode() {
        onChange('checkout', () => {
            this.initializeStripe();
        });
    }
    async componentDidLoad() {
        this.initializeStripe();
    }
    async initializeStripe() {
        var _a, _b;
        if (typeof ((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.live_mode) === 'undefined' || ((_b = state$1 === null || state$1 === void 0 ? void 0 : state$1.instances) === null || _b === void 0 ? void 0 : _b.stripe) || this.isInitializingStripe) {
            return;
        }
        this.isInitializingStripe = true;
        const { processor_data } = getProcessorByType('stripe') || {};
        try {
            state$1.instances.stripe = await pure.loadStripe(processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key, { stripeAccount: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id });
            this.error = '';
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
            this.isInitializingStripe = false;
            // don't continue.
            return;
        }
        // create or update elements.
        this.createOrUpdateElements();
        this.handleUpdateElement();
        this.unlistenToCheckout = onChange('checkout', () => {
            this.fetchStyles();
            this.createOrUpdateElements();
            this.handleUpdateElement();
        });
        // we need to listen to the form state and pay when the form state enters the paying state.
        this.unlistenToFormState = onChange$1('formState', () => {
            var _a;
            if (!((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
                return;
            if ('paying' === currentFormState()) {
                this.maybeConfirmOrder();
            }
        });
        this.isInitializingStripe = false;
    }
    clearStripeInstances() {
        var _a, _b, _c, _d;
        this.isInitializingStripe = false;
        this.isCreatingUpdatingStripeElement = false;
        if (this === null || this === void 0 ? void 0 : this.element) {
            try {
                (_b = (_a = this.element) === null || _a === void 0 ? void 0 : _a.unmount) === null || _b === void 0 ? void 0 : _b.call(_a); // If Stripe provides this method
            }
            catch (e) {
                console.warn('Could not unmount Stripe element:', e);
            }
            this.element = null;
        }
        if ((_c = state$1 === null || state$1 === void 0 ? void 0 : state$1.instances) === null || _c === void 0 ? void 0 : _c.stripeElements) {
            state$1.instances.stripeElements = null;
        }
        if ((_d = state$1 === null || state$1 === void 0 ? void 0 : state$1.instances) === null || _d === void 0 ? void 0 : _d.stripe) {
            state$1.instances.stripe = null;
        }
    }
    disconnectedCallback() {
        this.unlistenToFormState();
        this.unlistenToCheckout();
        this.clearStripeInstances();
    }
    getElementsConfig() {
        var _a, _b, _c, _d;
        const styles = getComputedStyle(this.el);
        return {
            mode: ((_a = state.checkout) === null || _a === void 0 ? void 0 : _a.remaining_amount_due) > 0 ? 'payment' : 'setup',
            amount: (_b = state.checkout) === null || _b === void 0 ? void 0 : _b.remaining_amount_due,
            currency: (_c = state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
            setupFutureUsage: ((_d = state.checkout) === null || _d === void 0 ? void 0 : _d.reusable_payment_method_required) ? 'off_session' : null,
            appearance: {
                variables: {
                    colorPrimary: styles.getPropertyValue('--sc-color-primary-500') || 'black',
                    colorText: styles.getPropertyValue('--sc-input-label-color') || 'black',
                    borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium') || '4px',
                    colorBackground: styles.getPropertyValue('--sc-input-background-color') || 'white',
                    fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium') || '16px',
                    colorLogo: styles.getPropertyValue('--sc-stripe-color-logo') || 'light',
                    colorLogoTab: styles.getPropertyValue('--sc-stripe-color-logo-tab') || 'light',
                    colorLogoTabSelected: styles.getPropertyValue('--sc-stripe-color-logo-tab-selected') || 'light',
                    colorTextPlaceholder: styles.getPropertyValue('--sc-input-placeholder-color') || 'black',
                },
                rules: {
                    '.Input': {
                        border: styles.getPropertyValue('--sc-input-border'),
                    },
                },
            },
        };
    }
    maybeApplyFilters(options) {
        var _a, _b, _c;
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.wp) === null || _a === void 0 ? void 0 : _a.hooks) === null || _b === void 0 ? void 0 : _b.applyFilters))
            return options;
        return {
            ...options,
            paymentMethodOrder: window.wp.hooks.applyFilters('surecart_stripe_payment_element_payment_method_order', [], state.checkout),
            wallets: window.wp.hooks.applyFilters('surecart_stripe_payment_element_wallets', {}, state.checkout),
            terms: window.wp.hooks.applyFilters('surecart_stripe_payment_element_terms', {}, state.checkout),
            fields: window.wp.hooks.applyFilters('surecart_stripe_payment_element_fields', (_c = options.fields) !== null && _c !== void 0 ? _c : {}),
        };
    }
    /** Update the payment element mode, amount and currency when it changes. */
    createOrUpdateElements() {
        var _a, _b, _c, _d, _e, _f;
        // need an order amount, etc.
        if (!((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
            return;
        if (!state$1.instances.stripe || this.isCreatingUpdatingStripeElement)
            return;
        if (((_b = state.checkout) === null || _b === void 0 ? void 0 : _b.status) && ['paid', 'processing'].includes((_c = state.checkout) === null || _c === void 0 ? void 0 : _c.status))
            return;
        this.isCreatingUpdatingStripeElement = true;
        // create the elements if they have not yet been created.
        if (!state$1.instances.stripeElements) {
            // we have what we need, load elements.
            state$1.instances.stripeElements = state$1.instances.stripe.elements(this.getElementsConfig());
            const { line1, line2, city, state: state$2, country, postal_code } = (_d = getCompleteAddress('shipping')) !== null && _d !== void 0 ? _d : {};
            const options = this.maybeApplyFilters({
                defaultValues: {
                    billingDetails: {
                        name: (_e = state.checkout) === null || _e === void 0 ? void 0 : _e.name,
                        email: (_f = state.checkout) === null || _f === void 0 ? void 0 : _f.email,
                        ...(line1 && { address: { line1, line2, city, state: state$2, country, postal_code } }),
                    },
                },
                fields: {
                    billingDetails: {
                        email: 'never',
                    },
                },
            });
            // create the payment element.
            state$1.instances.stripeElements.create('payment', options).mount(this.container);
            this.element = state$1.instances.stripeElements.getElement('payment');
            this.element.on('ready', () => (this.loaded = true));
            this.element.on('change', (event) => {
                var _a, _b, _c, _d, _e, _f, _g;
                const requiredShippingPaymentTypes = ['cashapp', 'klarna', 'clearpay'];
                state.paymentMethodRequiresShipping = requiredShippingPaymentTypes.includes((_a = event === null || event === void 0 ? void 0 : event.value) === null || _a === void 0 ? void 0 : _a.type);
                if (event.complete) {
                    this.scPaymentInfoAdded.emit({
                        checkout_id: (_b = state.checkout) === null || _b === void 0 ? void 0 : _b.id,
                        currency: (_c = state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
                        processor_type: 'stripe',
                        total_amount: (_d = state.checkout) === null || _d === void 0 ? void 0 : _d.total_amount,
                        line_items: (_e = state.checkout) === null || _e === void 0 ? void 0 : _e.line_items,
                        payment_method: {
                            billing_details: {
                                email: (_f = state.checkout) === null || _f === void 0 ? void 0 : _f.email,
                                name: (_g = state.checkout) === null || _g === void 0 ? void 0 : _g.name,
                            },
                        },
                    });
                }
            });
            this.isCreatingUpdatingStripeElement = false;
            return;
        }
        state$1.instances.stripeElements.update(this.getElementsConfig());
        this.isCreatingUpdatingStripeElement = false;
    }
    /** Update the default attributes of the element when they cahnge. */
    handleUpdateElement() {
        var _a, _b;
        if (!this.element)
            return;
        if (((_a = state.checkout) === null || _a === void 0 ? void 0 : _a.status) !== 'draft')
            return;
        const { name, email } = state.checkout;
        const { line_1: line1, line_2: line2, city, state: state$1, country, postal_code } = ((_b = state.checkout) === null || _b === void 0 ? void 0 : _b.shipping_address) || {};
        const options = this.maybeApplyFilters({
            defaultValues: {
                billingDetails: {
                    name,
                    email,
                    address: {
                        line1,
                        line2,
                        city,
                        state: state$1,
                        country,
                        postal_code,
                    },
                },
            },
            fields: {
                billingDetails: {
                    email: 'never',
                },
            },
        });
        this.element.update(options);
    }
    async submit() {
        // this processor is not selected.
        if ((state$2 === null || state$2 === void 0 ? void 0 : state$2.id) !== 'stripe')
            return;
        // submit the elements.
        const { error } = await state$1.instances.stripeElements.submit();
        if (error) {
            console.error({ error });
            updateFormState('REJECT');
            createErrorNotice(error);
            this.error = error.message;
            return;
        }
    }
    /**
     * Watch order status and maybe confirm the order.
     */
    async maybeConfirmOrder() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        // this processor is not selected.
        if ((state$2 === null || state$2 === void 0 ? void 0 : state$2.id) !== 'stripe')
            return;
        // must be a stripe session
        if (((_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_type) !== 'stripe')
            return;
        // need an external_type
        if (!((_f = (_e = (_d = (_c = state.checkout) === null || _c === void 0 ? void 0 : _c.payment_intent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.type))
            return;
        // we need a client secret.
        if (!((_k = (_j = (_h = (_g = state.checkout) === null || _g === void 0 ? void 0 : _g.payment_intent) === null || _h === void 0 ? void 0 : _h.processor_data) === null || _j === void 0 ? void 0 : _j.stripe) === null || _k === void 0 ? void 0 : _k.client_secret))
            return;
        // confirm the intent.
        return await this.confirm((_p = (_o = (_m = (_l = state.checkout) === null || _l === void 0 ? void 0 : _l.payment_intent) === null || _m === void 0 ? void 0 : _m.processor_data) === null || _o === void 0 ? void 0 : _o.stripe) === null || _p === void 0 ? void 0 : _p.type);
    }
    async confirm(type, args = {}) {
        var _a, _b, _c, _d;
        const confirmArgs = {
            elements: state$1.instances.stripeElements,
            clientSecret: (_d = (_c = (_b = (_a = state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.stripe) === null || _d === void 0 ? void 0 : _d.client_secret,
            confirmParams: {
                return_url: addQueryArgs(window.location.href, {
                    ...(state.checkout.id ? { checkout_id: state.checkout.id } : {}),
                }),
                payment_method_data: {
                    billing_details: {
                        email: state.checkout.email,
                    },
                },
            },
            redirect: 'if_required',
            ...args,
        };
        // prevent possible double-charges
        if (this.confirming)
            return;
        // stripe must be loaded.
        if (!state$1.instances.stripe)
            return;
        try {
            this.scSetState.emit('PAYING');
            const response = type === 'setup' ? await state$1.instances.stripe.confirmSetup(confirmArgs) : await state$1.instances.stripe.confirmPayment(confirmArgs);
            if (response === null || response === void 0 ? void 0 : response.error) {
                this.error = response.error.message;
                throw response.error;
            }
            else {
                this.scSetState.emit('PAID');
                // paid
                this.scPaid.emit();
            }
        }
        catch (e) {
            console.error(e);
            updateFormState('REJECT');
            createErrorNotice(e);
            if (e.message) {
                this.error = e.message;
            }
        }
        finally {
            this.confirming = false;
        }
    }
    render() {
        return (h("div", { key: '8404ee66b9443abaa5527663bb18b905f0e43dae', class: "sc-stripe-payment-element", "data-testid": "stripe-payment-element" }, !!this.error && (h("sc-text", { key: '89e4f59fc5b53fea2381a258031dfccb5157d502', style: {
                'color': 'var(--sc-color-danger-500)',
                '--font-size': 'var(--sc-font-size-small)',
                'marginBottom': '0.5em',
            } }, this.error)), h("div", { key: '13fbec6789477830a0997c36cd9d620b4f0a6e90', class: "loader", hidden: this.loaded }, h("div", { key: '898cf40ae4e7fce899eb34621f09866c8749da85', class: "loader__row" }, h("div", { key: '633fa1530745299de63f54bf090e2111c9f50547', style: { width: '50%' } }, h("sc-skeleton", { key: 'b050733a44c6d3f877fbec6dcc02888940e619ad', style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { key: 'da8922e14ae3f01b91c57ec64a6ef1240904a68a' })), h("div", { key: '8d902244c29a1306926d9440e9e74cdb174ac129', style: { flex: '1' } }, h("sc-skeleton", { key: 'c72ca453eaf5b17bab1832f276aeb85d4c9d859a', style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { key: 'fd02fcce1dbaa19958ebbdf974bd1fb3e2bcb0d5' })), h("div", { key: 'a9a15846f75735d859cb5d3b89e78d87d8746fb5', style: { flex: '1' } }, h("sc-skeleton", { key: '87397b171bc8ed93be88b01f1b498d946cd5a3df', style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", { key: '7a7bdbf2804a814ab616a60385b92a51503045d4' }))), h("div", { key: 'd0ed4d5f421a836dedb7925b35c9eb625bc90c33', class: "loader__details" }, h("sc-skeleton", { key: 'db805451d58ce348e956f4ecf842c93677aebcc6', style: { height: '1rem' } }), h("sc-skeleton", { key: '08c709d205ace3d89235f6391720e0973c200141', style: { height: '1rem', width: '30%' } }))), h("div", { key: 'fb97c5d48de67df77ba7c404734deb5c0c22c88c', hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "styles": ["handleStylesChange"]
    }; }
};
ScStripePaymentElement.style = ScStripePaymentElementStyle0;

export { ScStripePaymentElement as sc_stripe_payment_element };

//# sourceMappingURL=sc-stripe-payment-element.entry.js.map
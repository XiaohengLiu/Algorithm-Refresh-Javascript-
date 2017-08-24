var Backbone = require('backbone');
var $ = require('jquery');
require('backbone.paginator');
require('../lib/jquery-ui-datepicker.js');

// var PaymentsTableView = require('../views/payment-list-table');
var PaymentCreateView = require('../views/payment-create');
var LicensorsView = require('../views/payment-list-licensors');
var CurrencyView = require('../views/payment-list-currencies');
var PagenumView = require('../views/payment-list-pagenum');
var FilterView = require('../views/filter');
var SinglePaymentView = require('../views/single-payment');

var PaymentCollection = require('../collections/payment-records');
var LookUps = require('../collections/look-ups');
var PaymentListModel = require('../models/payment-list');
var FilterModel = require('../models/filter')

module.exports = Backbone.View.extend({
    el: $('#content-container'),
    template: require('../templates/payment/payments'),
    events: {
        'click #createPayment': 'create',
        'click #dropdownMenu1': 'dropLicensors',
        'click #dropdownMenu3': 'dropCurrencies',
        'click ul.licensorFilter': 'licensor',
        'click ul.currencyFilter': 'currency',
        'focusout .calendar': 'calendar',
        'input input.paymentId': 'paymentId',
        'click #btn_prev': 'prevPage',
        'click #btn_next': 'nextPage',
        // 'click .clickable-row': 'split'
    },
    initialize: function() {
        var self = this;
        var Router = require('../router');
        this.router = new Router();
        this.model = new PaymentListModel();
        this.filterModel = new FilterModel();
        this.lookUps = new LookUps();
        this.paymentCollection = new PaymentCollection();
        this.render();
        this.lookUps.fetch({
            success: function(response) {
                self.lookUpsResp = response;
                console.log('Successfully get payments');
            },
            error: function() {
                console.log('Failed to get payments!')
            }
        });
        // this.chipModel = new ChipModel();
        this.paymentCollection.fetch({
            success: function(response) {
                self.response = response;
                // console.log(response.toJSON());
                self.renderDefault();
                self.listenTo(self.model, 'change:current',  self.renderRest);
                _.each(response.toJSON(), function(item) {
                    // console.log('Successfully got payment with _id: ' + item.paymentId);
                });
            },
            error: function() {
                console.log('Failed to get payments!');
            }
        });
        this.arrayFilter = [];
        this.arraySplit = [];
        this.arrayFilterResult = [];
        this.currentPage = 1;
        require('./date-input').Apply(this);
        this.listenTo(this.filterModel, 'change', this.renderFilteredModel);
    },
    renderFilteredModel: function() {
        var self = this;
        var properties = ['licensor', 'currencyReceived', 'receivedDate']
        console.log("this is the response", this.response.toArray());
        console.log(this.arrayFilter);

        if (this.arrayFilter.length > 0) {
            //render when there are properties to render
            $('.payments-list').children().remove();
            _.each(self.arrayFilter, function(item) {
                // console.log(item);
                _.each(self.paymentCollection.toArray(), function(payment) {
                    for ( var i=0; i < properties.length; i++ ) {
                        var property = properties[i];
                        if (property == 'licensor') {
                            _.each(self.lookUps.toJSON()[0].societies, function(society){
                                if (society.soc_na === item) {
                                    var societyFull = society;
                                    if (societyFull.soc_cde === payment.get('licensor')){
                                        console.log("This is your payment!!!", payment);
                                        self.arrayFilterResult.push(payment);
                                    }
                                }
                            })
                        } else {
                            if ( payment.get(property) === item ){
                                self.arrayFilterResult.push(payment);

                            }
                        }
                        self.arrayFilterResult.push(payment);
                    }
                });
            })
            this.currentPage = 1;
            this.renderDefault();
            this.listenTo(self.model, 'change:current',  self.renderRest);
        } else {
            //no need to filter, render everything
            this.renderDefault();
            this.listenTo(this.model, 'change:current',  this.renderRest);
        }
    },

    render: function() {
        this.$el.html(this.template());
    },

    /* render the first page as default */
    renderDefault: function() {
        var self = this;
        this.result = this.paginate();
        $('.payments-list').children().remove();
        _.each(this.result[0], function(payment) {
            $('.payments-list').append((new SinglePaymentView({ model: payment, parent: this })).render().$el);
        });
        this.model.set('current', 1);
        this.renderPagenum();
    },

    /* render the chosen page */
    renderRest: function() {
        var self = this;
        console.log(this.result);
        var num = this.model.get('current')
        console.log(num);
        $('.payments-list').children().remove();
        _.each(this.result[num-1], function(payment) {
            $('.payments-list').append((new SinglePaymentView({ model: payment, parent: this })).render().$el);
        });
        return this;
    },

    renderPagenum: function() {
        this.pagenumView = new PagenumView({ el: '#pages', model: this.model});
    },

    // calendar: function(e) {
    //     var self = this;
    //     window.setTimeout(function() {
    //         var value = e.currentTarget.value;
    //         console.log(value);
    //      if (!$.fn.isEmptyOrNull(value)) {
    //         self.filterModel.set({'filtering': value}, {
    //             // silent: true
    //         });
    //         self.arrayFilter.push(value);
    //         self.listenTo(self.filterModel, 'change', self.renderFilteredModel);
    //         self.filterView = new FilterView({ model: self.filterModel, parent: self});
    //         }
    //     },200)
    // },

    /* create new paymenet */
    create: function() {
        console.log("create button has been clicked");
        this.router.navigate('payment/payment-create', {trigger: true});
    },

    currency: function() {
        var self = this;
        var value = event.target.innerText;
        var valuetoArray = value.split(' ');
        console.log('clicked: ', valuetoArray[0]);
        $(event.target).parents(".dropdown").find('.btn').children('.value').html(value);
        this.arrayFilter.push(valuetoArray[0]);
        console.log(this.arrayFilter);
        console.log("this is the array you tring to find", this.arrayFilterResult);
        if (this.arrayFilterResult.length) {
            filteredCollection = this.arrayFilterResult;
        } else {
            filteredCollection = this.paymentCollection.toArray();
        }
        _.each(filteredCollection, function(payment) {
            if(payment.get('currencyReceived') === valuetoArray[0]) {
                self.arrayFilterResult.push(payment);
            }
        });
        console.log(this.arrayFilterResult);
        this.filterModel.set('filtering', value);
        console.log(this.arrayFilterResult);
        this.filterView = new FilterView({ model: this.filterModel, parent: this});
    },

    dropCurrencies: function() {
        if ( this.currencyView && this.currencyView.remove ){}
        else {
            this.currencyView = new CurrencyView({ el: $('.currencyFilter'), model: this.lookUps });
        }
    },

    dropLicensors: function() {
        if ( this.licensorView && this.licensorView.remove ){}
        else {
            this.licensorView = new LicensorsView({ el: $('.licensorFilter'), model: this.lookUps });
        }
    },

    // triggered by licensor filter
    licensor: function(event) {
        var self = this;
        var value = event.target.innerText;
        var valuetoArray = value.split('-');
        var filteredCollection;
        if (this.arrayFilterResult.length) {
            filteredCollection = this.arrayFilterResult;
        } else {
            filteredCollection = this.paymentCollection.toArray();
        }
        this.arrayFilter.push(valuetoArray[0]);
        console.log("this is the array to be filtered", filteredCollection);
        $(event.target).parents(".dropdown").find('.btn').children('.value').html(value);
        _.each(filteredCollection, function(payment) {
            if(payment.get('licensor') === valuetoArray[0]) {
                self.arrayFilterResult.push(payment);
            }
        });
        console.log(this.arrayFilterResult);
        this.filterModel.set('filtering', value);
        // console.log(this.arrayFilterResult);
        this.filterView = new FilterView({ model: this.filterModel, parent: this});
    },

    //get the split result for every page
    paginate: function () {
        //pagination for all models
        if(this.arrayFilter.length < 1) {
            this.arraySplit = [];
            var array = this.paymentCollection.toArray();
            while(array.length) {
                var b = array.splice(0, 50);
                this.arraySplit.push(b);
            }
            var totalPage = this.arraySplit.length;
            // console.log(totalPage);
            this.model.set('totalPage', totalPage);
            return this.arraySplit;
        } else {
            //pagination for filtered models
            this.arraySplit = [];
            var array = this.arrayFilterResult;
            console.log(array);
            while(array.length) {
                var b = array.splice(0, 6);
                this.arraySplit.push(b);
            }
            //what is this? - Xiaoheng
            while(this.arrayFilterResult.length) {
                this.arrayFilterResult.shift()
            }
            console.log(this.arrayFilterResult);
            var totalPage = this.arraySplit.length;
            // console.log(totalPage);
            this.model.set('totalPage', totalPage);
            return this.arraySplit;
        }
    },

    //triggered when payment ID change
    paymentId: function(e) {
        var value = e.target.value;
        this.filterModel.set({'filtering': value}, {
            // silent: true
        });
        this.filterModel.set('paymentId', value);
        if( this.filterViewp && this.filterViewp.remove) {
            this.filterViewp.remove();
            this.filterViewp = new FilterView({ model: this.filterModel, parent: this });
        } else {
            this.filterViewp = new FilterView({ model: this.filterModel, parent: this });
        }
    },
    prevPage: function() {
        if (this.currentPage > 1)
            this.currentPage = this.currentPage - 1;
        // console.log(this.currentPage);
        this.model.set('current', this.currentPage);
        return this.currentPage;
    },
    nextPage: function() {
        var max = this.arraySplit.length;
        if (this.currentPage < max)
            this.currentPage = this.currentPage + 1;
        // console.log(this.currentPage);
        this.model.set('current', this.currentPage);
        return this.currentPage
    }
});
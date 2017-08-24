var Backbone = require('backbone');
var $ = require('jquery');
// var linkModel = require('../models/advice-letter');
var FilterModel = require('../models/filter');

module.exports = Backbone.View.extend({
    className: 'chip',
    template: require('../templates/filter-chip'),
    initialize: function(options) {
        this.parent = options.parent;
        console.log(this.model.toJSON());
        this.filterValue = this.parent.filterModel.get('filtering');
        console.log(this.filterValue);
        this.render();
    },
    events: {
        'click i.fa': 'removeChip'
    },
    render: function() {
        console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.appendTo('.applied-filters');
    },
    removeChip: function() {
        // console.log(this.splitedValue[0]);
        // console.log(this.parent.arrayFilter);
        // console.log(this.parent.arrayFilter.indexOf(this.filterValue));
        var index = this.parent.arrayFilter.indexOf(this.filterValue)
        this.parent.arrayFilter.splice(index, 1);
        // console.log(this.parent.arrayFilter);
        this.parent.filterModel.set('filtering', '');
        // console.log(this.parent.filterModel.get('filtering'));
        if(this.parent.filterModel.hasChanged("filtering")) {
            console.log("parent model changed");
        }
        this.remove();
        if (this.parent.arrayFilter.length) {
            this.parent.listenTo(this.parent.filterModel, 'change', this.parent.renderFilteredModel);
            this.parent.model.set('current', this.parent.currentPage);
        } else {
            // console.log(this.parent.arrayFilter.length);
            this.parent.renderDefault();
            this.parent.listenTo(this.parent.model, 'change:current',  this.parent.renderRest);
            this.parent.model.set('current', this.parent.currentPage);

        }

    }
});